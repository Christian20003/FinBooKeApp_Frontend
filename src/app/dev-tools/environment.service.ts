import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  get production() {
    return environment.production;
  }

  get apiUrl() {
    return environment.apiUrl;
  }

  get enableLogging() {
    return environment.enableLogging;
  }
}
