import { User } from './../models/user';
import { UserService } from './../user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() selected !: User;
  @Output() userModified:EventEmitter<User> = new EventEmitter();

  user: User;
  formulaire: FormGroup;
  showEdit !: Boolean;

  newName !:string;

  constructor( private service: UserService, private location: Location) {
    this.user = { id: "", name: "" }
    this.formulaire = new FormGroup({
      name: new FormControl(this.user.name)
    })
  }

  ngOnInit(): void {

    this.service.getById(this.user.id!).subscribe({
      next: data => this.user = data,
      error: err => console.log(err)
    });
  }

  update(): void {
    let modifiedUser = { ...this.formulaire.value, id: this.selected.id }
    console.log(modifiedUser);
    
    this.service.put(modifiedUser).subscribe({
      next:()=>null,
      error:err =>console.error(err),
      complete:()=>console.log("modification reussit"),
      
    })
  
  }
  
  saveUser(){
    let newDataUser : User={id:this.user.id, name:this.user.name}
    console.log(newDataUser);
    
    this.userModified.emit(newDataUser);
  }

}
