import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnClickOutside } from './on-click-outside';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';

@Component({
  imports: [OnClickOutside],
  template: `
    <div id="inside" appOnClickOutside (clickOutside)="onOutside()"></div>
    <div id="outside"></div>
  `,
})
class TestHostComponent {
  outsideCount = 0;
  onOutside() {
    this.outsideCount++;
  }
}

describe('OnClickOutside - Unit Tests', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let insideEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, OnClickOutside],
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    insideEl = getHTMLElement<HTMLElement>(fixture, '#inside')!;
  });

  it('U-Test-1: Directive emits when clicking outside', () => {
    document.dispatchEvent(new MouseEvent('click'));
    expect(host.outsideCount).toBe(1);
  });

  it('U-Test-2: Directive does not emit when clicking inside', () => {
    insideEl.dispatchEvent(new MouseEvent('click'));
    expect(host.outsideCount).toBe(0);
  });
});
