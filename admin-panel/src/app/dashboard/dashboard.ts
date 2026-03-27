import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  posts: any[] = [];
  users: any[] = [];
  comments: any = {};

  // ✅ NEW (for tabs)
  activeTab: 'posts' | 'users' = 'posts';

  // ✅ NEW (editing states)
  editingPost: string | null = null;
  editingUser: string | null = null;

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    // POSTS
    this.api.getPosts().subscribe((data: any) => {
      this.posts = data;

      this.posts.forEach((post: any) => {
        this.api.getComments(post._id).subscribe((comments: any) => {
          this.comments[post._id] = comments;
          this.cdr.detectChanges();
        });
      });

      this.cdr.detectChanges();
    });

    // USERS
    this.api.getUsers().subscribe((data: any) => {
      this.users = data;
      this.cdr.detectChanges();
    });
  }

  // =========================
  // DELETE
  // =========================

  deletePost(id: string): void {
    this.api.deletePost(id).subscribe(() => this.loadData());
  }

  deleteUser(id: string): void {
    this.api.deleteUser(id).subscribe(() => this.loadData());
  }

  deleteComment(id: string): void {
    this.api.deleteComment(id).subscribe(() => this.loadData());
  }

  // =========================
  // EDIT TOGGLE
  // =========================

  startEditPost(id: string) {
    this.editingPost = id;
  }

  startEditUser(id: string) {
    this.editingUser = id;
  }

  cancelEdit() {
    this.editingPost = null;
    this.editingUser = null;
  }

  // =========================
  // SAVE (CRUD COMPLETE 🔥)
  // =========================

  savePost(post: any) {
    this.api.updatePost(post._id, { text: post.text })
      .subscribe(() => {
        this.editingPost = null;
        this.loadData();
      });
  }

  saveUser(user: any) {
    this.api.updateUser(user._id, {
      username: user.username,
      bio: user.bio
    }).subscribe(() => {
      this.editingUser = null;
      this.loadData();
    });
  }

  // =========================
  // TRACK BY (performance)
  // =========================

  trackByPostId(index: number, post: any) {
    return post._id;
  }

  trackByCommentId(index: number, comment: any) {
    return comment._id;
  }

  trackByUserId(index: number, user: any) {
    return user._id;
  }

  // =========================

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}