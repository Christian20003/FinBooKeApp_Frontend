import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BarChartData, BarGroup, DiagramService } from 'src/app/core';
import * as d3 from 'd3';

/**
 * This component adds a bar chart.
 */
@Component({
  selector: 'app-bar-diagram',
  templateUrl: './bar-diagram.html',
  styleUrl: './bar-diagram.scss',
  imports: [],
  encapsulation: ViewEncapsulation.None,
})
export class BarDiagram implements OnInit {
  private readonly service = inject(DiagramService);
  private readonly margins = { top: 20, right: 20, bottom: 40, left: 70 };
  private readonly dimensions = { width: 800, height: 400 };
  private readonly animationDuration = 500;

  private xScale!: d3.ScaleBand<string>;
  private yScale!: d3.ScaleLinear<number, number, never>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private svg!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private xAxis!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private yAxis!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  readonly data = input.required<BarChartData>();

  private readonly groupColors = computed(() => {
    const colors = [...this.data().colors];
    while (this.groupSize > colors.length) {
      colors.push(this.service.getColor());
    }
    return colors;
  });

  private readonly maxY = computed(() =>
    Math.max(...this.groups.flatMap(group => group.yValues))
  );

  constructor() {
    effect(() => {
      this.updateX();
      this.updateY();
      this.drawBars();
    });
  }

  ngOnInit(): void {
    this.initSvg();
    this.drawX();
    this.drawY();
    this.drawBars();
  }

  /**
   * This method initializes the SVG element which includes the
   * bar chart.
   */
  private initSvg(): void {
    // Init SVG element
    this.svg = d3
      .select('#bar-chart')
      .append('svg')
      .attr('viewBox', `0 0 ${this.dimensions.width} ${this.dimensions.height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${this.margins.left},${this.margins.top})`);

    // Init tooltip element
    this.tooltip = d3
      .select('#bar-chart')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', '0');
  }

  /**
   * This method initializes the x-axis of the bar chart.
   */
  private drawX(): void {
    this.xScale = d3.scaleBand().range([0, this.width]).padding(0.2);
    this.xAxis = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`);
    this.updateX();
  }

  /**
   * This method initializes the y-axis of the bar chart.
   */
  private drawY(): void {
    this.yScale = d3.scaleLinear().range([this.height, 0]);
    this.yAxis = this.svg.append('g');
    this.updateY();
  }

  /**
   * This method draws all bars based on the provided data.
   * It further updates all bars if any data has been
   * changed.
   */
  private drawBars(): void {
    const width = this.xScale.bandwidth() / this.groupSize;
    // Get current bars and match them with provided data
    const groups = this.svg
      .selectAll<SVGGElement, BarGroup>('.group')
      .data(this.groups);

    // Delete g element that are not assigned to any data item
    groups.exit().remove();

    // Create new g element to data item which has not been assigned.
    const mergedGroups = groups
      .enter()
      .append('g')
      .attr('class', 'group')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .merge(groups as any)
      .attr('transform', group => `translate(${this.xScale(group.xValue)}, 0)`);

    // Create, update or delete rect element (actual bar)
    mergedGroups
      .selectAll('rect')
      .data(group => group.yValues.map((yValue, index) => ({ yValue, index })))
      .join(
        enter =>
          enter
            .append('rect')
            .attr('x', bar => width * bar.index)
            .attr('width', width)
            .attr('fill', bar => this.colors[bar.index])
            .attr('y', bar => this.yScale(bar.yValue) - 1)
            .on('mouseover', event => {
              this.tooltip.style('opacity', '1');
              d3.select(event.target).style('opacity', '0.7');
            })
            .on('mousemove', (event, bar) => {
              this.tooltip.text(bar.yValue);
              this.tooltip
                .style('top', `${event.y - 85}px`)
                .style('left', `${event.x + 10}px`);
            })
            .on('mouseout', event => {
              this.tooltip.style('opacity', '0');
              d3.select(event.target).style('opacity', '1');
            }),
        update => update,
        exit => exit.remove()
      )
      .transition()
      .duration(this.animationDuration)
      .attr('y', d => this.yScale(d.yValue) - 1)
      .attr('height', d => this.height - this.yScale(d.yValue))
      .attr('fill', d => this.colors[d.index]);
  }

  /**
   * This method updates the y-axis if any data has been changed.
   */
  private updateY(): void {
    // Adjust y-axis
    this.yScale.domain([0, this.maxY()]);
    this.yAxis
      .transition()
      .duration(this.animationDuration)
      .call(
        d3
          .axisLeft(this.yScale)
          .tickFormat(value => this.service.adjustLabel()(value.valueOf()))
      )
      .attr('class', 'axis');

    this.yAxis.selectAll('text').attr('class', 'axis-text');
    this.yAxis.selectAll('line').attr('class', 'axis-line');

    // Adjust grid line
    this.svg
      .selectAll('line.grid-line')
      .data(this.yScale.ticks(7))
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .transition()
      .duration(this.animationDuration)
      .attr('x1', this.margins.right)
      .attr('x2', this.width)
      .attr('y1', d => this.yScale(d))
      .attr('y2', d => this.yScale(d));
  }

  /**
   * This method updates the x-axis if any data has been changed.
   */
  private updateX(): void {
    this.xScale.domain(this.groups.map(group => group.xValue));
    this.xAxis
      .transition()
      .duration(this.animationDuration)
      .call(d3.axisBottom(this.xScale).tickFormat(this.service.adjustLabel()))
      .attr('class', 'axis');

    this.xAxis.selectAll('text').attr('class', 'axis-text');
    this.xAxis.selectAll('line').attr('class', 'axis-line');
  }

  /**
   * This method returns the actual width of the bar chart.
   */
  private get width(): number {
    return this.dimensions.width - this.margins.left - this.margins.right;
  }

  /**
   * This method returns the actual height of the bar chart.
   */
  private get height(): number {
    return this.dimensions.height - this.margins.bottom - this.margins.top;
  }

  /**
   * This method returns the data which should be displayed.
   */
  private get groups(): BarGroup[] {
    return this.data().groups;
  }

  /**
   * This method returns all available colors.
   */
  private get colors(): string[] {
    return this.groupColors();
  }

  /**
   * This method returns the number of elements for each
   * x-value.
   */
  private get groupSize(): number {
    return Math.max(...this.groups.map(group => group.yValues.length));
  }
}
