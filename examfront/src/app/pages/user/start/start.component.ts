import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qId:any;
  questions:any;

  marksGot:any=0;
  currectAnswers=0;
  attempted=0;

  isSubmit = false;
  timer:any;


  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _Question:QuestionService,
    ) { }


  ngOnInit(): void {
    this.preventBackButton();
     this.qId = this._route.snapshot.params['qid'];
     console.log(this.qId);
     this.loadQuestions();
     console.log(this.questions)

  }
  public loadQuestions() {
    this._Question.getQuestionsofQuizForTest(this.qId).subscribe(
      (data:any) =>{
        this.questions=data;
        this.timer=this.questions.length*2*60;
        this.startTimer();
      },
      (error) =>{
        console.log(error);
        Swal.fire("Error!","Error on loading questions of quiz","error");
      }
    )
  }

  // Define a function to handle back button and use anywhere
  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    })
  }



  public submitQuiz() {

    Swal.fire({
      title:'Do You want to submit the quiz',
      showCancelButton:true,
      confirmButtonText:'Submit',
      denyButtonText:'Cancle',
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed) {
        //calculation
        this.evalQuiz()

      }
    })

  }


  //start timer
    public startTimer() {
      let t:any =  window.setInterval(()=>{
        //code
        if(this.timer <=0 ) {
          this.evalQuiz();
          clearInterval(t);
        }else {
          this.timer--;
        }
      },1000)
    }


    public getformattedTime() {
      let mm=Math.floor(this.timer/60)
      let ss=this.timer-mm*60;
      return `${mm} min : ${ss} sec`;
    }

   public evalQuiz() {

    //calculation
    //call the server for evaluation answer in the serversid
    this._Question.evalQuize(this.questions).subscribe(
      (data:any) =>{
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.currectAnswers = data.currectAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true
        console.log(this.questions)
      },
      (error)=>{
        console.log(error);
      }
    );

  //   this.isSubmit = true

  //       this.questions.forEach((q:any )=>{
  //         if(q.givenAnswer==q.answer) {
  //           this.currectAnswers++;
  //           let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
  //           this.marksGot += marksSingle;
  //         }

  //         if(q.givenAnswer.trim() != '') {
  //             this.attempted++;

  //         }
  //       });
  //       console.log('currect answers : ' +this.currectAnswers);
  //       console.log('marks Got : ' +this.marksGot);
  //       console.log("attempted : "+this.attempted);
  //       console.log(this.questions);


  }


  public printPage() {
    window.print();
  }

}




