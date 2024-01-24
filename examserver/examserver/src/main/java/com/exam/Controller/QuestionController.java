package com.exam.Controller;

import com.exam.Exam.Question;
import com.exam.Exam.Quiz;
import com.exam.Services.QuestionService;
import com.exam.Services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;


    // Add QUestion
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update Question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    // Get Question of any Quiz
    @GetMapping("/quiz/{qid}")
     public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
//         Quiz quiz = new Quiz();
//         quiz.setQid(qid);
//        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);

        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions= quiz.getQuestions();

        List<Question> list = new ArrayList<>(questions);
        if(list.size()>Integer.parseInt(quiz.getNumberofquestions())) {
            list=list.subList(0,Integer.parseInt(quiz.getNumberofquestions()+1));
        }
        list.forEach((q)->{
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
     }


    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
         Quiz quiz = new Quiz();
         quiz.setQid(qid);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);

    }

     // get Single Question
    @GetMapping("/{quesid}")
    public Question get(@PathVariable("quesid") Long quesid) {
        return this.questionService.getQuestion(quesid);
    }

    //delete Question
    @DeleteMapping("/{quesId}")
    public void deleteQuestion(@PathVariable("quesId") Long quesId) {
        this.questionService.deleteQuestion(quesId);
    }


    // evaluate quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
        System.out.println(questions);

        double marksGot=0;
        int currectAnswers=0;
        int attempted=0;

        for(Question q:questions){
            //single questions
            Question question = this.questionService.get(q.getQueid());

            if(question.getAnswer().equals(q.getGivenAnswer())){
                //correct
                currectAnswers++;
                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();     //this..quiz.maxMarks / this.questions.length;
                marksGot += marksSingle;
            }

            if(q.getGivenAnswer()!=null) {
                attempted++;
            }
        };

        Map<String, Object> map = Map.of("marksGot",marksGot,"currectAnswers",currectAnswers,"attempted",attempted);


        return  ResponseEntity.ok(map);
    }

}
