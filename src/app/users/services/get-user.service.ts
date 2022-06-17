import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  readonly lnkGetUsers: string = 'https://lofty-test.herokuapp.com/api/user/list'
  readonly lnkGetFullUser: string = 'https://lofty-test.herokuapp.com/api/user/'
  readonly token: string = ''

  constructor(private http: HttpClient) {
    if (window.localStorage.getItem('auth')) {
      this.token = window.localStorage.getItem('auth')!
    } else {
      this.token = window.sessionStorage.getItem('auth')!
    }
  }

  getUsers(page: number, size: number, sort: string): Observable<any> {
    return this.http.get(this.lnkGetUsers+'?page='+page+'&size='+size+'&sort='+sort)
  }

  getFullInfoUser(id: number): Observable<any> {
    return this.http.get(this.lnkGetFullUser+id)
  }
}
