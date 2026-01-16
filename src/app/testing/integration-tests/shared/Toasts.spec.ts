import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Toast } from 'src/app/shared/components/toasts/toast/toast';
import { Toasts } from 'src/app/shared/components/toasts/toasts';
import {
  IconService,
  TestToast,
  ToastLifeTime,
  ToastService,
} from 'src/app/core';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { getComponents } from 'src/app/testing/helper/get-component';

describe('Toasts - Integration Tests', () => {
  let fixture: ComponentFixture<Toasts>;
  let toastService: ToastService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Toasts, Toast],
      providers: [
        ToastService,
        IconService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });

    fixture = TestBed.createComponent(Toasts);
    toastService = TestBed.inject(ToastService);
    controller = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    jasmine.clock().install();
    controller.match(() => true);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('I-Test-1: Add new toast through the ToastService', () => {
    toastService.addToast(
      TestToast.message,
      TestToast.type,
      TestToast.lifetime
    );
    fixture.detectChanges();

    const toasts = getComponents<Toast>(fixture, Toast);
    const toast = toasts[0];

    expect(toasts).toHaveSize(1);
    expect(toast.toast()).toEqual(TestToast);
  });

  it('I-Test-2: Add new toast that should remove itself automatically', () => {
    toastService.addToast(
      TestToast.message,
      TestToast.type,
      ToastLifeTime.SHORT
    );
    fixture.detectChanges();

    jasmine.clock().tick(10000);
    fixture.detectChanges();
    const toasts = getComponents<Toast>(fixture, Toast);

    expect(toasts).toHaveSize(0);
  });

  it('I-Test-4: Add new toast that should be removed manually', () => {
    toastService.addToast(
      TestToast.message,
      TestToast.type,
      ToastLifeTime.NONE
    );
    fixture.detectChanges();

    const button = getHTMLElement<HTMLButtonElement>(fixture, 'button');
    button!.click();
    fixture.detectChanges();
    const toasts = getComponents<Toast>(fixture, Toast);

    expect(toasts).toHaveSize(0);
  });
});
