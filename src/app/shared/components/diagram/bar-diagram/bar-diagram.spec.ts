import {
  inputBinding,
  provideZonelessChangeDetection,
  signal,
  WritableSignal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarDiagram } from './bar-diagram';
import { MockService } from 'ng-mocks';
import { BarChartData, DiagramService } from 'src/app/core';
import {
  getHTMLElement,
  getHTMLElements,
} from 'src/app/testing/helper/get-html-element';

describe('BarDiagram - Unit Tests', () => {
  let service: DiagramService;
  let fixture: ComponentFixture<BarDiagram>;
  let input: WritableSignal<BarChartData>;

  const addedItem = {
    xValue: 'Group-4',
    yValues: [1000, 1000],
  };

  beforeEach(async () => {
    service = MockService(DiagramService, {
      getColor: () => 'rgb(125, 125, 125)',
      adjustLabel: () => (value: number | string) => {
        return value.toString();
      },
    });
    input = signal({
      groups: [
        { xValue: 'Group-1', yValues: [500, 500] },
        { xValue: 'Group-2', yValues: [500, 500] },
        { xValue: 'Group-3', yValues: [500, 500] },
      ],
      colors: ['red', 'green'],
    });

    await TestBed.configureTestingModule({
      imports: [BarDiagram],
      providers: [
        { provide: DiagramService, useValue: service },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BarDiagram, {
      bindings: [inputBinding('data', input)],
    });
    fixture.detectChanges();
  });

  it('U-Test-1: Component should display defined number of groups', () => {
    const groups = getHTMLElements<SVGGElement>(fixture, '.group');

    expect(groups).toHaveSize(input().groups.length);
  });

  it('U-Test-2: Component should display correct number of bars in each group', () => {
    const groups = getHTMLElements<SVGGElement>(fixture, '.group');

    groups.forEach((group, index) => {
      expect(group.children).toHaveSize(input().groups[index].yValues.length);
    });
  });

  it('U-Test-3: Component should display a x-axis with correct ticks', async () => {
    const axis = getHTMLElement<SVGGElement>(fixture, '.x-axis');
    const labels = getHTMLElements<SVGGElement>(fixture, '.x-axis-text');

    expect(axis).toBeTruthy();
    expect(labels).toHaveSize(input().groups.length);
  });

  it('U-Test-4: Component should display a y-axis with multiple ticks', async () => {
    const axis = getHTMLElement<SVGGElement>(fixture, '.y-axis');
    const labels = getHTMLElements<SVGGElement>(fixture, '.y-axis-text');

    expect(axis).toBeTruthy();
    expect(labels.length).toBeGreaterThan(0);
  });

  it('U-Test-5: Component should update x-axis when data is modified', async () => {
    input.set({
      ...input(),
      groups: [...input().groups, addedItem],
    });
    await fixture.whenStable();
    const labels = getHTMLElements<SVGGElement>(fixture, '.x-axis-text');

    expect(labels).toHaveSize(input().groups.length);
  });

  it('U-Test-6: Component should update y-axis when data is modified', async () => {
    const oldLabels = getHTMLElements<SVGGElement>(fixture, '.y-axis-text');
    input.set({
      ...input(),
      groups: [...input().groups, addedItem],
    });
    await fixture.whenStable();
    const newLabels = getHTMLElements<SVGGElement>(fixture, '.y-axis-text');

    expect(oldLabels.length).toBeLessThanOrEqual(newLabels.length);
  });

  it('U-Test-7: Component should add new bar when new group has been added', async () => {
    input.set({
      ...input(),
      groups: [...input().groups, addedItem],
    });
    await fixture.whenStable();
    const groups = getHTMLElements<SVGGElement>(fixture, '.group');

    expect(groups).toHaveSize(input().groups.length);
  });

  it('U-Test-8: Component should delete bar when corresponding group has been deleted', async () => {
    input.set({
      ...input(),
      groups: [...input().groups.slice(0, 2)],
    });
    await fixture.whenStable();
    const groups = getHTMLElements<SVGGElement>(fixture, '.group');

    expect(groups).toHaveSize(input().groups.length);
  });

  it('U-Test-9: Component should display a tooltip when the user hovers over a bar', async () => {
    const group = getHTMLElement<SVGGElement>(fixture, '.group')!;
    const bar = group.children[0];
    bar.dispatchEvent(new MouseEvent('mouseover'));
    await fixture.whenStable();

    const tooltip = getHTMLElement<HTMLDivElement>(fixture, '#tooltip')!;
    const style = tooltip.style.getPropertyValue('opacity');

    expect(style).toBe('1');
  });

  it('U-Test-10: Component should display tooltip near the mouse', async () => {
    const x = 100;
    const y = 100;
    const group = getHTMLElement<SVGGElement>(fixture, '.group')!;
    const bar = group.children[0];
    bar.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }));
    await fixture.whenStable();

    const tooltip = getHTMLElement<HTMLDivElement>(fixture, '#tooltip')!;
    const top = tooltip.style.getPropertyValue('top');
    const left = tooltip.style.getPropertyValue('left');

    expect(top).toBe(`${x - 85}px`);
    expect(left).toBe(`${y + 10}px`);
  });

  it('U-Test-11: Component should not display a tooltip when the user does not hover over a bar', async () => {
    const group = getHTMLElement<SVGGElement>(fixture, '.group')!;
    const bar = group.children[0];

    bar.dispatchEvent(new MouseEvent('mouseover'));
    await fixture.whenStable();
    bar.dispatchEvent(new MouseEvent('mouseout'));
    await fixture.whenStable();

    const tooltip = getHTMLElement<HTMLDivElement>(fixture, '#tooltip')!;
    const style = tooltip.style.getPropertyValue('opacity');

    expect(style).toBe('0');
  });

  it('U-Test-12: Component should use random colors when too few are provided', async () => {
    const spy = spyOn(service, 'getColor');
    input.set({
      ...input(),
      colors: [...input().colors.slice(0, 1)],
    });
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
