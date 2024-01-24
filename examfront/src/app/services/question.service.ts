import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }

  //get Question
  public getQuestionsofQuiz(qid:any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }


  //get Question
  public getQuestionsofQuizForTest(qid:any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //addQuestion
 public addQuestion(question:any) {
   return this._http.post(`${baseUrl}/question/`,question)


  }



 //update Question
 public updateQuestion(question:any) {
   return this._http.put(`${baseUrl}/question/`,question);
 }


 //get single Question
 public getSingleQuestion(qid:any) {
    return this._http.get(`${baseUrl}/question/${qid}`);
 }




 //delete question

  public deleteQuestion(questionId:any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`)
  }

  public evalQuize(questions:any) {
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
  }
}
