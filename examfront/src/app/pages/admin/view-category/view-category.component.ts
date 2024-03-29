import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories:any = [];

  constructor(private _category:CategoryService) { }

  ngOnInit(): void {

    this._category.categories().subscribe((data:any)=>{
      //success
      this.categories = data;
      console.log(this.categories);
    },
    (error) =>{
      console.log(error)
      Swal.fire("Error !!","Error in loading data","error");
    }
    )
  }

}
