import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  email: string
  password: string

  constructor(private router:Router,private auth:AuthService) { }

  navigateToSignUp(){
    this.router.navigate(['/sign-up'])
  }

  signIn = async () => {
    if(this.email != "" && this.password != ""){
      try{
        const {token} = await this.auth.signIn(this.email, this.password)
        console.log("Riga 24 signin",token)
        /* if(token){//il token e sotto await, non e immediato
          this.router.navigate(["home"]);
        } */
        /*this.tkn=token
        this.username=username
        this.dataService.setTkn(this.tkn);
        this.dataService.setUserName(this.username);
        sessionStorage.setItem("tkn", this.tkn);
        sessionStorage.setItem("username", this.username); */
      }catch(e){
        //this.failedAuth=true
        console.log(e)
      }
    }
  }

}
