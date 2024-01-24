import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private userService : UserService, private snack : MatSnackBar) { }
  ngOnInit(): void {}

  public user =  {
    username :'',
    password : '',
    firstname : '',
    lastname : '',
    email : '',
    phone :'',
  }


  formSubmit() {

    console.log(this.user);
    if(this.user.username=='' || this.user.username == null) {
      //alert("user is required!" );
      this.snack.open('Username is required !', 'OKAY', {
        duration:3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return ;
    }

    // validation



    //calling addUser function form user Service
    //addUser
    this.userService.addUser(this.user).subscribe(
      (data:any) =>{
        //success
        console.log(data);
       Swal.fire('Successfully done','User id is '+data.id,'success' );


      },
      (error) =>{
        console.log(error)
        //alert('some thing went wrong')

        this.snack.open("User name is already persent ",'OKEY',{
          duration:3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition : this.verticalPosition
        })
      }
    )

  }


}
