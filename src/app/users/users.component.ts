import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FullUserComponent } from './components/full-user/full-user.component';
import { GetUserService } from './services/get-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  page: number = 1
  colPost: number = 10
  sortfield: string = 'id'
  sortDirection: string = 'asc'

  totalPages!: number

  users: any[] = []
  displayedColumns: string[] = ['id', 'active', 'createDate', 'updateDate', 'login', 'buttons']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gu: GetUserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsers()
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(res => {
      this.page = res.pageIndex+1
      this.getUsers()
    })
  }

  getUsers(): void {
    this.gu.getUsers(this.page, this.colPost, this.sortfield+','+this.sortDirection).subscribe(res => {
      this.users = res.content;
      this.totalPages = res.totalPages
    })
  }

  openInfo(id: number) {
    this.gu.getFullInfoUser(id).subscribe(res => {
      this.dialog.open(FullUserComponent, {
        data: res
      })
    })
  }

  changeUser(id: number) {
    setTimeout(() => {
      this._snackBar.open('В доступе отказано', 'ok', {duration: 3000})
    }, 1000);
  }

}
