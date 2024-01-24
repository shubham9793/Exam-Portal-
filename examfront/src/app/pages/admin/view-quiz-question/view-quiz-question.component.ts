import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {
  qId:any;
  qTitle:any;

  questions :any=[]

  constructor(
    private _rout: ActivatedRoute,
    private _question:QuestionService,
    private _snak:MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.qId = this._rout.snapshot.params['qid'];
    this.qTitle=this._rout.snapshot.params['title'];

    this._question.getQuestionsofQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
       this.questions=data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteQuestion(qid:any) {
    Swal.fire({
        icon:'info',
        showCancelButton:true,
        confirmButtonText:'Delete',
        title:'Are you sure, want to delete this question'
    }).then((result)=>{
      if(result.isConfirmed) {
        // conform
        this._question.deleteQuestion(qid).subscribe(
          (data:any) =>{
            this._snak.open("Question deleted Successfully",'OKEY' ,{
              duration:3000,
            });
            this.questions=this.questions.filter((q: { queid: any; })=>q.queid != qid);
          },
          (error) =>{
            this._snak.open("Error in deleting questions",'OKEY',{
              duration:3000,
            });
            console.log(error)
          }
          )
      }
    });
  }


}
