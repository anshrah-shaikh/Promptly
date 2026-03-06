import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private BASE = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  login(data: any) {
    return this.http.post(`${this.BASE}/auth/login`, data);
  }

  getPosts() {
    return this.http.get(`${this.BASE}/posts`);
  }

  deletePost(id: string) {
    return this.http.delete(
      `${this.BASE}/posts/${id}`,
      this.getAuthHeaders()
    );
  }

  getUsers() {
    return this.http.get(`${this.BASE}/users`);
  }

  deleteUser(id: string) {
    return this.http.delete(
      `${this.BASE}/users/${id}`,
      this.getAuthHeaders()
    );
  }

  getComments(postId: string) {
    return this.http.get(`${this.BASE}/comments/${postId}`);
  }

  deleteComment(id: string) {
    return this.http.delete(
      `${this.BASE}/comments/delete/${id}`,
      this.getAuthHeaders()
    );
  }
}