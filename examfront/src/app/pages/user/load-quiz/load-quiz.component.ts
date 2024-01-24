import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;


  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,

  ) { }

  ngOnInit(): void {


    this._route.params.subscribe((params)=>{
      this.catId= params['catId'];

      if(this.catId==0) {

        this._quiz.getActiveQuizess().subscribe(
          (data:any) =>{
            this.quizzes = data;
            console.log(this.quizzes);
          },
          error=>{
            console.log(error);
            Swal.fire("Error in loading category !",'Okye')
          }
        )

      }else {
        console.log("specific quiz")
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any) =>{
            this.quizzes = data;
          },
          (error) =>{
            alert("Error in loding in data ");
          }
        )
      }
    })

  }

}
