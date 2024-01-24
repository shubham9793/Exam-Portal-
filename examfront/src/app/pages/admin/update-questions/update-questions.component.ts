import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-questions',
  templateUrl: './update-questions.component.html',
  styleUrls: ['./update-questions.component.css']
})
export class UpdateQuestionsComponent implements OnInit {

  constructor(private _rout:ActivatedRoute,
    private _questionService:QuestionService,
    private _router:Router
    ) { }

  questionId = 0;
  question:any;


  ngOnInit(): void {
    this.questionId = this._rout.snapshot.params['queid']
    this._questionService
    this._questionService.getSingleQuestion(this.questionId).subscribe(
      (data:any) =>{
        this.question=data;
        console.log(this.question);
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  //update form submit

  public updateData() {

    this._questionService.updateQuestion(this.question).subscribe(
      (data:any) =>{
        Swal.fire("Success !","Question updated Successfully",'success').then((e)=>{
          this._router.navigate(['/admin/view-questions/category/'])
        })
      },
      (error)=>{
        Swal.fire("Error","error in updateing",'error');
        console.log(error);
      }
    )
  }

}
