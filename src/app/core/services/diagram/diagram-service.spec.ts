import { TestBed } from '@angular/core/testing';

import { DiagramService } from './diagram-service';

xdescribe('DiagramService', () => {
  let service: DiagramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
