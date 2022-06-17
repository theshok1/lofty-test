import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChangePostComponent } from './components/change-post/change-post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { GetPostsService } from './srevices/get-posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {

  page: number = 1
  colPost: number = 10
  sortfield: string = 'id'
  sortDirection: string = 'asc'

  totalPages!: number

  posts: any[] = []
  displayedColumns: string[] = ['id', 'title', 'createDate', 'updateDate', 'buttons']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private gp: GetPostsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts()
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(res => {
      this.sortfield = res.active
      this.sortDirection = res.direction
      this.getPosts()
    })
    this.paginator.page.subscribe(res => {
      this.page = res.pageIndex+1
      this.getPosts()
    })
  }

  getPosts(): void {
    this.gp.getPosts(this.page, this.colPost, this.sortfield+','+this.sortDirection).subscribe(res => {
      this.posts = res.content;
      this.totalPages = res.totalPages
    })
  }

  openInfo(id: number) {
    this.gp.InfoPost(id).subscribe(res => {
      if (res) {
        this.dialog.open(FullPostComponent, {
          data: res
        })
      }
    })
  }

  changePost(id: number) {

    let dataPost: any

    this.gp.InfoPost(id).subscribe(res => {
      this.dialog.open(ChangePostComponent, {
        data: res
      }).afterClosed().subscribe(res => {
        dataPost = res
        dataPost['id'] = id
        this.gp.changePost(dataPost).subscribe(() => {
          this.getPosts()
        })
      })
    })
  }

  createPost() {
    this.dialog.open(CreatePostComponent).afterClosed().subscribe(res => {
      this.gp.createPost(res).subscribe(() => {
        this.getPosts()
      })
    })
  }

  deletePost(id: number) {
    this.gp.deletePost(id).subscribe(() => {
      this.getPosts()
    })
  }

}
