import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any=[];

  constructor(private _quiz:QuizService) { }


  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{

        this.quizzes=data;
        
      },
      (error) =>{
        console.log(error);
        Swal.fire("Error !","Error in loading data !","error");
      }
    )
  }

  public deleteQuize(qid:any) {
    Swal.fire({
      icon:'info',
      title:'Are you sure?',
      confirmButtonText:'Delete',
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed) {
        //delete function
        this._quiz.deleteQuize(qid).subscribe(
          (data)=>{
            this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qid!=qid)
            Swal.fire("Success !","Quiz Successfully Deleted",'success');
          },
          (error) =>{
            Swal.fire("Error !","Error in finding Quiz id",'error')
          });
      }
    })
  }


}
