import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _category:CategoryService,private _snack:MatSnackBar) { }

  category={
    title:'',
    description:''
  };

  ngOnInit(): void {
  }


  fromSubmit() {
    if(this.category.title.trim()=='' || this.category.title==null) {
      this._snack.open("Title Required !",'ok',{
        duration:3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,

      })
      return;
    }

    this._category.addCategory(this.category).subscribe(
      (data:any) =>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !",'Successfully added' ,'success');

      },
      (error) =>{
        console.log(error);
        Swal.fire("Error !",'Server Error ' ,'error')
      }
    )

  }
}
