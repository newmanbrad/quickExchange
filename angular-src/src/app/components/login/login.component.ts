import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveUser } from '../../models/active-user';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  constructor( private _authService: AuthService, private router: Router ) { }

  model = new User("","","", "");
  username: string = "";
  submitting: boolean = false;
  loginStatus: boolean = false;
  loggedInUser: ActiveUser;

  login(loginData){

    const user = {
      username: loginData.value.username.toLowerCase(),
      password: loginData.value.password
    };

    this._authService.login(user).subscribe((data: any) => {
      if (data.success) {
        this._authService.storeUserData(data.token, data.user);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.errSwitch = true;
        this.errMsg = 'Invalid username/password';
      }
    });

  }

  onSubmit(userData) {
    this.submitting = true;
    this.login(userData);
  }

}
