import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  categories:any=[]

  quizeData = {
    title:'',
    description:'',
    maxMarks:'',
    numberofquestions:'',
    active:true,
    category:{
      cid: '',
    },
  };

  constructor(private _cat:CategoryService,
    private _snack:MatSnackBar,
    private _quiz:QuizService,
    ) { }


  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories = data;
       // console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !","Error in loding data","error");
      }
    )
  }

  public addQuiz() {
    if(this.quizeData.title =='' || this.quizeData.title==null) {
      this._snack.open("Title Required !","OKEY",{
        duration:3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return ;
    }

    //calling server

    this._quiz.addQuiz(this.quizeData).subscribe(
      (data:any) =>{
        Swal.fire('Success !',"Quiz Successfully Added",'success')
        this.quizeData = {
          title:'',
          description:'',
          maxMarks:'',
          numberofquestions:'',
          active:true,
          category:{
            cid: '',
          },
        };
      },
      (error)=>{
        Swal.fire("Error","Error while Adding Quize","error");
        console.log(error);
      }
    )
  }

}
