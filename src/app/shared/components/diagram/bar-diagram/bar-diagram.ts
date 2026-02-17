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
  private xAxis!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private yAxis!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  readonly data = input.required<BarChartData>();
  private readonly groupColors = computed<string[]>(() => {
    const colors = [...this.data().colors];
    while (this.groupSize > colors.length) {
      colors.push(this.service.getColor());
    }
    return colors;
  });
  private readonly maxY = computed<number>(() => {
    const values = this.groups.map(group => group.yValues);
    return Math.max(...values.flat());
  });

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

  private initSvg(): void {
    this.svg = d3
      .select('#chart')
      .append('svg')
      .attr('viewBox', `0 0 ${this.dimensions.width} ${this.dimensions.height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${this.margins.left},${this.margins.top})`);
  }

  private drawX(): void {
    this.xScale = d3
      .scaleBand()
      .range([0, this.width])
      .domain(this.groups.map(group => group.xValue))
      .padding(0.2);

    this.xAxis = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.xScale).tickFormat(this.service.adjustLabel()))
      .attr('class', 'x-axis');

    this.xAxis.selectAll('text').attr('class', 'x-text');
    this.xAxis.selectAll('line').attr('class', 'line');
  }

  private drawY(): void {
    this.yScale = d3
      .scaleLinear()
      .domain([0, this.maxY()])
      .range([this.height, 0]);

    this.yAxis = this.svg
      .append('g')
      .call(
        d3
          .axisLeft(this.yScale)
          .tickFormat(value => this.service.adjustLabel()(value.valueOf()))
      )
      .attr('class', 'y-axis');

    this.yAxis.selectAll('text').attr('class', 'y-text');
    this.yAxis.selectAll('line').attr('class', 'line');
  }

  private drawBars(): void {
    const width = this.xScale.bandwidth() / this.groupSize;
    const groups = this.svg.selectAll('.group').data(this.groups);

    // Remove old groups
    groups.exit().remove();

    // Update existing ones or add new ones.
    groups
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', d => `translate(${this.xScale(d.xValue)}, 0)`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .merge(groups as any)
      .attr('transform', d => `translate(${this.xScale(d.xValue)}, 0)`)
      .selectAll('rect')
      .data(d => d.yValues.map((yValue, index) => ({ yValue, index })))
      .join(
        enter =>
          enter
            .append('rect')
            .attr('x', d => width * d.index)
            .attr('width', width)
            .attr('fill', d => this.colors[d.index])
            .attr('y', d => this.yScale(d.yValue) - 1)
            .attr('height', 0),
        update => update,
        exit => exit.remove()
      )
      .transition()
      .duration(this.animationDuration)
      .attr('y', d => this.yScale(d.yValue) - 1)
      .attr('height', d => this.height - this.yScale(d.yValue))
      .attr('fill', d => this.colors[d.index]);
  }

  private updateY(): void {
    this.yScale.domain([0, this.maxY()]);
    this.yAxis
      .transition()
      .duration(this.animationDuration)
      .call(
        d3
          .axisLeft(this.yScale)
          .tickFormat(value => this.service.adjustLabel()(value.valueOf()))
      );
  }

  private updateX(): void {
    this.xScale.domain(this.groups.map(group => group.xValue));
    this.xAxis
      .transition()
      .duration(this.animationDuration)
      .call(d3.axisBottom(this.xScale).tickFormat(this.service.adjustLabel()));
  }

  private get width(): number {
    return this.dimensions.width - this.margins.left - this.margins.right;
  }

  private get height(): number {
    return this.dimensions.height - this.margins.bottom - this.margins.top;
  }

  private get groups(): BarGroup[] {
    return this.data().groups;
  }

  private get colors(): string[] {
    return this.groupColors();
  }

  private get groupSize(): number {
    return Math.max(...this.groups.map(group => group.yValues.length));
  }
}
