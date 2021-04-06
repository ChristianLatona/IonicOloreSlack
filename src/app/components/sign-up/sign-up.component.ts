import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  message:string;
  showMessage:boolean = false;
  showSuccess:boolean = false;
  constructor(private router:Router, private auth:AuthService) { }

  private navigate(path:string){
    this.router.navigate([`/${path}`])
  }

  async register(){
    this.showMessage = true;
    if(this.password===this.confirmPassword ){
      const data = await this.auth.register(this.username,this.email,this.password)
      if(typeof data != 'string'){
        this.showSuccess = true;
        this.message = "Succesfull registration, You will be redirected to the login."
        setTimeout(() => {
          this.navigate("sign-in")
        }, 3000)
      }else{
        this.message = data as string 
      }
    }else{
      this.message = "Password do not match!"
    }
  }
}
