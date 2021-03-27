import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  constructor(private router:Router) { }

  navigateToSignUp(){
    this.router.navigate(['/sign-up'])
  }

  navToHome(){
    this.router.navigate(['/home'])
  }

}
