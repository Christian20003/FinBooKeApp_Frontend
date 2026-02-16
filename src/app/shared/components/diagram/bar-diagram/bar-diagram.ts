import {
  Component,
  inject,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BarChartData, BarGroup } from 'src/app/core/models';
import { TranslocoService } from '@jsverse/transloco';
import { TRANSLATION_KEYS } from 'src/app/shared/localization/translation-keys';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-diagram',
  imports: [],
  templateUrl: './bar-diagram.html',
  styleUrl: './bar-diagram.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BarDiagram implements OnInit {
  private readonly transloco = inject(TranslocoService);

  private readonly margins = { top: 20, right: 20, bottom: 40, left: 70 };
  private readonly dimensions = { width: 800, height: 400 };
  private readonly animationDuration = 500;
  private readonly maxStringLength = 3;

  private x = d3.scaleBand();
  private y = d3.scaleLinear();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  readonly data = input.required<BarChartData>();

  private readonly labelFormat = (value: number | string): string => {
    if (typeof value === 'number') {
      let label = value.toString();
      let shortcut = '';
      if (value >= 1e6) {
        label = (value / 1e6).toFixed(2);
        shortcut = this.transloco.translate(TRANSLATION_KEYS.diagram.million);
      } else if (value >= 1e3) {
        label = (value / 1e3).toFixed(2);
        shortcut = this.transloco.translate(TRANSLATION_KEYS.diagram.thousand);
      }
      return `${label}${shortcut}`;
    }
    if (value.length > this.maxStringLength) {
      return value.substring(0, this.maxStringLength);
    }
    return value;
  };

  constructor() {
    // Required to initialize svg
    this.svg = d3.select('#chart-container');
  }

  ngOnInit(): void {
    this.initSvg();
    this.drawX();
    this.drawY();
    this.drawBars();
  }

  private initSvg(): void {
    this.svg = d3
      .select('#chart-container')
      .append('svg')
      .attr('viewBox', `0 0 ${this.dimensions.width} ${this.dimensions.height}`)
      .attr('width', this.dimensions.width)
      .attr('height', this.dimensions.height)
      .append('g')
      .attr('transform', `translate(${this.margins.left},${this.margins.top})`);
  }

  private drawX(): void {
    // Remove old x-axis
    this.svg.select('.x-axis').remove();

    this.x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(this.bars.map(value => value.xValue))
      .padding(0.2);

    const xAxis = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.x).tickFormat(this.labelFormat))
      .attr('class', 'x-axis');

    xAxis.selectAll('text').attr('class', 'x-text');
    xAxis.selectAll('line').attr('class', 'line');
  }

  private drawY(): void {
    // Remove old y-axis
    this.svg.select('.y-axis').remove();

    const values = this.bars.map(value => Math.max(...value.yValues));
    const max = Math.max(...values);
    this.y = d3.scaleLinear().domain([0, max]).range([this.height, 0]);

    const yAxis = this.svg
      .append('g')
      .call(
        d3
          .axisLeft(this.y)
          .tickFormat(value => this.labelFormat(value.valueOf()))
      )
      .attr('class', 'y-axis');

    yAxis.selectAll('text').attr('class', 'y-text');
    yAxis.selectAll('line').attr('class', 'line');
  }

  private drawBars(): void {
    const countBars = Math.max(
      ...this.bars.map(element => element.yValues.length)
    );
    const width = this.x.bandwidth() / countBars;
    const groups = this.svg
      .selectAll('.group')
      .data(this.bars, (item: unknown) => (item as BarGroup).xValue);

    // Remove old groups
    groups.exit().remove();

    // Update existing ones or add new ones.
    groups
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', d => `translate(${this.x(d.xValue)}, 0)`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .merge(groups as any)
      .attr('transform', d => `translate(${this.x(d.xValue)}, 0)`)
      .selectAll('rect')
      .data(d => d.yValues.map((yValue, index) => ({ yValue, index })))
      .join(
        enter =>
          enter
            .append('rect')
            .attr('x', d => width * d.index)
            .attr('width', width)
            .attr('fill', d => this.colors[d.index])
            .attr('y', d => this.y(d.yValue) - 1)
            .attr('height', 0),
        update => update,
        exit => exit.remove()
      )
      .transition()
      .duration(this.animationDuration)
      .attr('y', d => this.y(d.yValue) - 1)
      .attr('height', d => this.height - this.y(d.yValue));
  }

  private get width(): number {
    return this.dimensions.width - this.margins.left - this.margins.right;
  }

  private get height(): number {
    return this.dimensions.height - this.margins.bottom - this.margins.top;
  }

  private get bars(): BarGroup[] {
    return this.data().groups;
  }

  private get colors(): string[] {
    return this.data().colors;
  }
}
