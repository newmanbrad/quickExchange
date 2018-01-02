import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  onReginsterSubmit() {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username
    }

  }

}
