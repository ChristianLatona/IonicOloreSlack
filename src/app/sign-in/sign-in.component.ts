import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  username: string
  password: string

  constructor(private router:Router,private auth:AuthService) { }

  navigateToSignUp(){
    this.router.navigate(['/sign-up'])
  }

  navToHome(){
    this.router.navigate(['/home'])
  }

  signIn(){
    this.auth.signIn("","")//fixare il backend prima
  }

}
