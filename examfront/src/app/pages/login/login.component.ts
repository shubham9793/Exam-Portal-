import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {




  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


 public loginData={
  username:'',
  password:''
 }
  constructor(private snack :MatSnackBar , private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }


  formsubmit() {
    console.log("form submited")
    if(this.loginData.username.trim() == '' || this.loginData.username==null) {
      this.snack.open("Username Is Required! ","OKEY",{
        duration:3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }


    if(this.loginData.password.trim() == '' || this.loginData.password==null) {
      this.snack.open("Password Is Required! ","OKEY",{
        duration:3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }

    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any) =>{
        console.log("success");
        console.log(data)

        //login...
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any) =>{
            this.login.setuser(user);
            console.log(user);
            //redirect .... ADMIN || admin-dashboard
            //redirect .....Normal || normal-dashboard
            if(this.login.getuserrole()=="ADMIN") {
              //admin dashboard
              //window.location.href='/admin'
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getuserrole()=="NORMAL") {
              //normal user dashboard
              //window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }else {
              this.login.logout();
            }
          })
      },
      (error)=>{
        console.log("error !");
        console.log(error);
        this.snack.open("Invailid Details! ","Try again",{
          duration:3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    )
  }
}


