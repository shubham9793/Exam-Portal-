import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _cat:CategoryService,private _snack:MatSnackBar) { }

  categories:any;

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any) =>{
        this.categories=data;
      },
      (error) =>{
        this._snack.open("Error in loading categories from server !",'Okey!' , {
          duration:3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        } )
      }
    )
  }

}
