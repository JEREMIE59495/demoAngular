import { User } from './../models/user';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  username: string = "";
  id: string = "";
  selectedUser?: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log("création");
    this.getAll();
  }

  ngOnDestroy(): void {
    console.log("destruction");
  }

  private getAll() {
    this.userService.getAll().subscribe({
      next: data => this.userList = data,
      error: err => console.error(err),
      complete: () => console.log("user service fini")
    });
  }

  save(): void {
    this.userService.create({ name: this.username}).subscribe(() => this.getAll())
    console.log(this.username);
  }

  modifyUser(modifiedUser:User){
    this.userService.put(modifiedUser).subscribe({
      next: () => null,
      error: err => console.error(err),
      complete: () => {
        console.log(`modification utilisateur id ${this.selectedUser!.id}ok`);
        
      }
    })
  }

  del(id: string) {
    this.userService.delete(id).subscribe(() => this.getAll())
  }

  selectUser(user: User){
    this.selectedUser = user;
  }
}

