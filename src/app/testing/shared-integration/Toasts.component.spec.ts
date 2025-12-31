/* import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ToastService } from 'src/app/shared/components/toasts/toast.service';
import { ToastComponent } from 'src/app/shared/components/toasts/toast/toast.component';
import { ToastsComponent } from 'src/app/shared/components/toasts/toasts.component';
import { getComponent, getComponents } from '../testing-support';
import { TestToast } from 'src/app/shared';

xdescribe('ToastsComponent - Integration Tests', () => {
  let component: ToastsComponent;
  let fixture: ComponentFixture<ToastsComponent>;
  let service: ToastService;
  let controller: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ToastsComponent, ToastComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ToastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastsComponent);
    controller = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    service = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('I-Test-1: Empty intialization state', () => {
    const toastComponents = getComponents<ToastsComponent, ToastComponent>(
      fixture,
      ToastComponent
    );
    expect(toastComponents)
      .withContext(
        'ToastComponents should not appear in the template after initialization'
      )
      .toHaveSize(0);
    expect(component.toasts)
      .withContext('List of toast objects should be empty')
      .toHaveSize(0);
    service.toastStore$.subscribe(data => {
      expect(data)
        .withContext('List of toast objects in ToastService should be empty')
        .toHaveSize(0);
    });
  });

  it('I-Test-2: Add new toast through the ToastService', () => {
    service.addToast(TestToast.message, TestToast.type, TestToast.autoRemove);
    fixture.detectChanges();
    const toastComponents = getComponents<ToastsComponent, ToastComponent>(
      fixture,
      ToastComponent
    );
    const toast = toastComponents[0].componentInstance;
    expect(toastComponents)
      .withContext('Single ToastComponent should appear in the template')
      .toHaveSize(1);
    expect(toast.toast())
      .withContext(
        'Toast instance in the ToastComponent should have the following structure'
      )
      .toEqual(TestToast);
    expect(component.toasts)
      .withContext('List of toast objects should contain single element')
      .toHaveSize(1);
    expect(component.toasts[0])
      .withContext(
        'Toast instance in the ToastsComponent should have the following structure'
      )
      .toEqual(TestToast);
    service.toastStore$.subscribe(data => {
      expect(data)
        .withContext(
          'List of toast objects in ToastService contains single element'
        )
        .toHaveSize(1);
      expect(data[0])
        .withContext(
          'Toast instance in the ToastService should have the following structure'
        )
        .toEqual(TestToast);
    });
  });

  it('I-Test-3: After adding a new toast, it should automatically remove itself', fakeAsync(() => {
    service.addToast(TestToast.message, TestToast.type, TestToast.autoRemove);
    fixture.detectChanges();
    // Mocking request otherwise not working in fakeAsync
    const req = controller.expectOne('../../../../../assets/icons/error.svg');
    req.flush('<svg></svg>');
    tick(15000);
    fixture.detectChanges();
    const toastComponents = getComponents<ToastsComponent, ToastComponent>(
      fixture,
      ToastComponent
    );
    expect(toastComponents)
      .withContext(
        'ToastComponents should not appear in the template after automatic remove'
      )
      .toHaveSize(0);
    expect(component.toasts)
      .withContext(
        'List of toast objects should be empty after automatic remove'
      )
      .toHaveSize(0);
    service.toastStore$.subscribe(data => {
      expect(data)
        .withContext(
          'List of toast objects in ToastService should be empty after automatic remove'
        )
        .toHaveSize(0);
    });
  }));

  it('I-Test-4: Remove an existing toast from the list through the ToastComponent', () => {
    service.addToast(TestToast.message, TestToast.type, TestToast.autoRemove);
    fixture.detectChanges();
    const toast = getComponent<ToastsComponent, ToastComponent>(
      fixture,
      ToastComponent
    );
    toast.componentInstance.onRemove();
    fixture.detectChanges();
    const toastComponents = getComponents<ToastsComponent, ToastComponent>(
      fixture,
      ToastComponent
    );
    expect(toastComponents)
      .withContext(
        'ToastComponents should not appear in the template after manual remove'
      )
      .toHaveSize(0);
    expect(component.toasts)
      .withContext('List of toast objects should be empty after manual remove')
      .toHaveSize(0);
    service.toastStore$.subscribe(data => {
      expect(data)
        .withContext(
          'List of toast objects in ToastService should be empty after manual remove'
        )
        .toHaveSize(0);
    });
  });
});
 */
