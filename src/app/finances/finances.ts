import { Component, signal } from '@angular/core';
import { BarDiagram } from '../shared/components/diagram/bar-diagram/bar-diagram';
import { BarChartData } from '../core/models';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.html',
  styleUrl: './finances.scss',
  imports: [BarDiagram],
})
export class Finances {
  readonly data = signal<BarChartData>({
    groups: [
      {
        xValue: 'January',
        yValues: [500, 500],
      },
      {
        xValue: 'February',
        yValues: [500, 1000],
      },
      {
        xValue: 'March',
        yValues: [500, 1205],
      },
      {
        xValue: 'April',
        yValues: [500, 186],
      },
      {
        xValue: 'May',
        yValues: [644, 3548],
      },
      {
        xValue: 'June',
        yValues: [355, 821],
      },
      {
        xValue: 'July',
        yValues: [3874, 38],
      },
      {
        xValue: 'August',
        yValues: [3874, 38],
      },
      {
        xValue: 'September',
        yValues: [3874, 38],
      },
      {
        xValue: 'October',
        yValues: [3874, 38],
      },
      {
        xValue: 'November',
        yValues: [3874, 38],
      },
      {
        xValue: 'December',
        yValues: [3874, 38],
      },
    ],
    colors: ['green'],
  });

  test(): void {
    this.data.set({
      ...this.data(),
      groups: [
        ...this.data().groups,
        {
          xValue: 'Funny',
          yValues: [500, 500],
        },
      ],
    });
  }
}
