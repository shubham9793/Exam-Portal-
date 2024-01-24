import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId:any;
  quiz:any;


  constructor(private _router:ActivatedRoute,
    private _quiz:QuizService,
    private _rout:Router,
    ) { }

  ngOnInit(): void {
    this.qId = this._router.snapshot.params['qid'];
    //console.log(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        //console.log(data);
        this.quiz = data;

      },
      (error) =>{
        console.log(error);
        console.log("")
      }
    );
  }

  public startQuiz() {
    Swal.fire({
      title: 'Do you want start quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `cancle`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {


        this._rout.navigate(['/start/'+this.qId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
