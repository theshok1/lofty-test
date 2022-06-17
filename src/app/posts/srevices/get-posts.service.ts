import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {

  readonly lnkGetPosts: string = 'https://lofty-test.herokuapp.com/api/posts/list'
  readonly lnkGetFullPost: string = 'https://lofty-test.herokuapp.com/api/posts/'
  readonly lnkChangePost: string = 'https://lofty-test.herokuapp.com/api/posts/edit'
  readonly lnkCreatePost: string = 'https://lofty-test.herokuapp.com/api/posts/create'
  readonly lnkDeletePost: string = 'https://lofty-test.herokuapp.com/api/posts/'
  readonly token: string = ''

  constructor(private http: HttpClient) {
    if (window.localStorage.getItem('auth')) {
      this.token = window.localStorage.getItem('auth')!
    } else {
      this.token = window.sessionStorage.getItem('auth')!
    }
  }

  getPosts(page: number, size: number, sort: string): Observable<any> {
    return this.http.get(this.lnkGetPosts+'?page='+page+'&size='+size+'&sort='+sort)
  }

  InfoPost(id: number): Observable<any> {
    return this.http.get(this.lnkGetFullPost+id)
  }

  changePost(data: any): Observable<any> {
    return this.http.post(this.lnkChangePost, data)
  }

  createPost(data: any): Observable<any> {
    return this.http.post(this.lnkCreatePost, data)
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.lnkDeletePost+id)
  }
}
