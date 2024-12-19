import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { getComponents } from 'src/app/testing/testing-support';
import { ToastsComponent } from './toasts.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast.service';
import { TestToast, Toast } from '../../models/Toast';

describe('ToastsComponent - Unit Tests', () => {
  let component: ToastsComponent;
  let fixture: ComponentFixture<ToastsComponent>;
  const mockService = jasmine.createSpyObj('ToastService', ['removeToast'], {
    toastStore$: of(),
  });

  const setValue = (toasts: Toast[]) => {
    component.toasts = toasts;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, BrowserAnimationsModule, ToastsComponent],
      providers: [
        provideHttpClient(),
        { provide: ToastService, useValue: mockService },
      ],
    }).compileComponents();

    // Currently MockComponent() not directly usable in imports field
    TestBed.overrideComponent(ToastComponent, {
      remove: { imports: [ToastComponent] },
      add: { imports: [MockComponent(ToastComponent)] },
    });

    fixture = TestBed.createComponent(ToastsComponent);
    component = fixture.componentInstance;
    setValue([TestToast]);
    fixture.detectChanges();
  });

  it('U-Test-1: ToastsComponent should create', () => {
    expect(component).withContext('ToastsComponent should exist').toBeTruthy();
  });

  it('U-Test-2: Correct amount of toasts should appear according to the toast service', () => {
    const element = getComponents<ToastsComponent, ToastComponent>(
      fixture,
      ToastComponent
    );
    expect(element)
      .withContext('A list of toast objects should exist in the template')
      .toBeTruthy();
    expect(element)
      .withContext(
        'The list should contain a single toast element in the template'
      )
      .toHaveSize(1);
    expect(component.toasts)
      .withContext('The list variable should contain a single toast element')
      .toHaveSize(1);
  });

  it('U-Test-3: Calling the onRemoveToast function', () => {
    mockService.removeToast.and.callFake(() => {
      setValue([]);
    });
    component.onRemoveToast(TestToast);
    fixture.detectChanges();
    const element = getComponents<ToastsComponent, ToastComponent>(
      fixture,
      ToastComponent
    );
    expect(element)
      .withContext('The list should be empty in the template')
      .toHaveSize(0);
    expect(component.toasts)
      .withContext('The list variable should be empty')
      .toHaveSize(0);
  });
});
