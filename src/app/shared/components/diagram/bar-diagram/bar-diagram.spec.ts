import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDiagram } from './bar-diagram';

xdescribe('BarDiagram', () => {
  let component: BarDiagram;
  let fixture: ComponentFixture<BarDiagram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarDiagram],
    }).compileComponents();

    fixture = TestBed.createComponent(BarDiagram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
