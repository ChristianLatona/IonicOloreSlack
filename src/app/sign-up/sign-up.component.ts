import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent{
  purpleColor="rgb(156,3,177)"
  username:string
  email:string
  password:string
  confirmPassword:string
  message:string="Passwords does not match!"
  gotError:boolean=false
  constructor(private router:Router, private auth:AuthService) { }

  private navigate(path:string){
    this.router.navigate([`/${path}`])
  }

  async register(){
    if(this.password==this.confirmPassword ){
      const {status,body}= await this.auth.register(this.username,this.email,this.password)
      let {message} = body as {message:string}
      if(status==200){
        this.navigate("home")
      }else{
        this.message= message
        this.gotError=true
      }
    }
  }
}
