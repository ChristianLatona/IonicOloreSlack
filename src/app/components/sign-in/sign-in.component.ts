import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  email: string
  password: string
  gotError: boolean
  message: string=""

  constructor(private router: Router, private auth: AuthService) { }

  navigate(path: string) {
    this.router.navigate([`/${path}`])
  }

  signIn = async () => {
    this.message=""
    if (this.email != "" && this.password != "") {
      const data = await this.auth.signIn(this.email, this.password);
      if(typeof data === "string"){
        this.gotError = true
        this.message = data;
      }else{
        let { body } = data
        let { token, username } = body as { token: string, username: string }
        sessionStorage.setItem("userTkn", token);
        sessionStorage.setItem("username", username);
        this.email = '';
        this.password = '';
        this.message = '';
        this.navigate("home");
      }
    }
  }
}
