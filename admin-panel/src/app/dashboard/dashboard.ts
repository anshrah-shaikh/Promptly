import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  posts: any[] = [];
  users: any[] = [];
  comments: any = {};

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Load posts
    this.api.getPosts().subscribe((data: any) => {
      this.posts = data;

      // For each post, load its comments
      this.posts.forEach((post: any) => {
        this.api.getComments(post._id).subscribe((comments: any) => {
          this.comments[post._id] = comments;
          this.cdr.detectChanges();
        });
      });

      this.cdr.detectChanges();
    });

    // Load users
    this.api.getUsers().subscribe((data: any) => {
      this.users = data;
      this.cdr.detectChanges();
    });
  }

  deletePost(id: string): void {
    this.api.deletePost(id).subscribe(() => this.loadData());
  }

  deleteUser(id: string): void {
    this.api.deleteUser(id).subscribe(() => this.loadData());
  }

  deleteComment(id: string): void {
    this.api.deleteComment(id).subscribe(() => this.loadData());
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  // ✅ TrackBy functions to fix TS errors
  trackByPostId(index: number, post: any) {
    return post._id;
  }

  trackByCommentId(index: number, comment: any) {
    return comment._id;
  }

  trackByUserId(index: number, user: any) {
    return user._id;
  }
}