import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  linkBack: string = 'https://lofty-test.herokuapp.com/api/authenticate'

  constructor(private http: HttpClient) { }

  login(data: string): Observable<any> {
    return this.http.post(this.linkBack, data, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
  }
}
