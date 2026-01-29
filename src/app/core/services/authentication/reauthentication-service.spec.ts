import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReauthenticationService } from './reauthentication-service';
import { selectSession, setUserSession } from 'src/app/shared';
import { AuthenticationService } from './authentication-service';
import { of, throwError } from 'rxjs';
import { wait } from 'src/app/core/helper/wait';
import { TestSession } from 'src/app/core/index.spec';
import { IUserUnauthenticated } from 'src/app/core/models';
import { ToastService } from 'src/app/core/services/toast/toast-service';

describe('ReauthenticationService - Unit Tests', () => {
  let service: ReauthenticationService;
  let authentication: jasmine.SpyObj<AuthenticationService>;
  let toast: jasmine.SpyObj<ToastService>;
  let store: MockStore;

  const simulateIteration = async function (): Promise<void> {
    const time = TestSession.jwtExpire - new Date().getTime();
    // Skip time when access token has expired.
    jasmine.clock().tick(time);
    // Necessary, so that process continues correctly
    const sleep = wait(1);
    jasmine.clock().tick(1);
    await sleep;
    // Skip expired time again (Break second iteration)
    jasmine.clock().tick(time);
    service.stop();
  };

  beforeEach(() => {
    authentication = jasmine.createSpyObj('AuthenticationService', [
      'postRefreshToken',
    ]);
    toast = jasmine.createSpyObj('ToastService', ['addToast']);
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authentication },
        { provide: ToastService, useValue: toast },
        provideMockStore({
          initialState: IUserUnauthenticated,
          selectors: [{ selector: selectSession, value: TestSession }],
        }),
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(ReauthenticationService);
    store = TestBed.inject(MockStore);
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('U-Test-1: Service should start process only onces', async () => {
    authentication.postRefreshToken.and.returnValue(of(TestSession));
    service.start();
    service.start();

    await simulateIteration();

    expect(authentication.postRefreshToken).toHaveBeenCalledTimes(1);
  });

  it('U-Test-2: Service should stop the process if user is unauthenticated', async () => {
    store.overrideSelector(selectSession, IUserUnauthenticated.session);
    service.start();

    await simulateIteration();

    expect(authentication.postRefreshToken).not.toHaveBeenCalled();
  });

  it('U-Test-3: Service should stop the process when client wants to stop it', async () => {
    service.start();
    service.stop();

    await simulateIteration();

    expect(authentication.postRefreshToken).not.toHaveBeenCalled();
  });

  it('U-Test-4: Service should update session object in the store after a successful API request', async () => {
    const spy = spyOn(store, 'dispatch');
    authentication.postRefreshToken.and.returnValue(of(TestSession));
    service.start();

    await simulateIteration();

    expect(spy).toHaveBeenCalledWith(setUserSession({ session: TestSession }));
  });

  it('U-Test-5: Service should add an error message to the toast service if the API request was unsuccessful', async () => {
    authentication.postRefreshToken.and.returnValue(
      throwError(() => new Error())
    );
    service.start();

    await simulateIteration();

    expect(toast.addToast).toHaveBeenCalled();
  });
});
