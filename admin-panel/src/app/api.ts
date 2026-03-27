import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private BASE = 'https://promptly-backend-wssr.onrender.com/api';

  constructor(private http: HttpClient) {}

  // ======================
  // AUTH HEADERS
  // ======================
  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token ?? ''}`
      })
    };
  }

  // ======================
  // AUTH
  // ======================
  login(data: any) {
    return this.http.post(`${this.BASE}/auth/login`, data);
  }

  // ======================
  // POSTS
  // ======================
  getPosts() {
    return this.http.get(`${this.BASE}/posts`);
  }

  deletePost(id: string) {
    return this.http.delete(
      `${this.BASE}/posts/${id}`,
      this.getAuthHeaders()
    );
  }

  updatePost(id: string, data: any) {
    return this.http.put(
      `${this.BASE}/posts/${id}`,
      data,
      this.getAuthHeaders()
    );
  }

  // ======================
  // USERS
  // ======================
  getUsers() {
    return this.http.get(`${this.BASE}/users`);
  }

  deleteUser(id: string) {
    return this.http.delete(
      `${this.BASE}/users/${id}`,
      this.getAuthHeaders()
    );
  }

  updateUser(id: string, data: any) {
    return this.http.put(
      `${this.BASE}/users/${id}`,
      data,
      this.getAuthHeaders()
    );
  }

  // ======================
  // COMMENTS
  // ======================
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