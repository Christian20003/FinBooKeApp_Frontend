import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { IconDictionary } from 'src/app/core/models/Icon';
import { IconService } from './icon-service';

describe('IconService - Unit Tests', () => {
  let service: IconService;
  let iconRegistrySpy: jasmine.SpyObj<MatIconRegistry>;
  let domSanitizerSpy: jasmine.SpyObj<DomSanitizer>;
  const icons: IconDictionary = {
    icon1: {
      name: 'icon1',
      path: 'assets/icons/icon1.svg',
    },
    icon2: {
      name: 'icon2',
      path: 'assets/icons/icon2.svg',
    },
  };

  beforeEach(() => {
    iconRegistrySpy = jasmine.createSpyObj('MatIconRegistry', ['addSvgIcon']);
    domSanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    TestBed.overrideProvider(MatIconRegistry, { useValue: iconRegistrySpy });
    TestBed.overrideProvider(DomSanitizer, { useValue: domSanitizerSpy });
    service = TestBed.inject(IconService);
    domSanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue('url');
    // @ts-expect-error Setting icons for testing
    service.icons = icons;
  });

  it('U-Test-1: Should return all available icons', () => {
    const icons = service.getAvailableIcons();
    expect(icons.length).toBe(2);
  });

  it('U-Test-2: Should register defined icon', () => {
    const icon = icons['icon1'];
    service.registerIcon(icon.name);
    expect(
      domSanitizerSpy.bypassSecurityTrustResourceUrl
    ).toHaveBeenCalledOnceWith(icon.path);
    expect(iconRegistrySpy.addSvgIcon).toHaveBeenCalled();
  });

  it('U-Test-3: Should do nothing if icon is not available', () => {
    service.registerIcon('icon33');
    expect(
      domSanitizerSpy.bypassSecurityTrustResourceUrl
    ).not.toHaveBeenCalled();
    expect(iconRegistrySpy.addSvgIcon).not.toHaveBeenCalled();
  });

  it('U-Test-3: Should register multiple icons', () => {
    service.registerIcons(['icon1', 'icon2']);
    expect(iconRegistrySpy.addSvgIcon).toHaveBeenCalledTimes(2);
  });
});
