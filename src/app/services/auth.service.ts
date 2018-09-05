import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from '../models/login.model';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(req: LoginModel): Observable<any> {
    return this.http.post('/api/auth/login', req).pipe(map((res: any) => {
      return res;
    }));
  }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
