import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  questionId: number = 0;
  showAnswer: boolean = false;
  constructor(public gameService: GameService,
    public router: Router,
    ) { 
      // /q/{id}
      this.questionId = parseInt(this.router.url.split('/')[2]);
    }

  get question() {
    return this.gameService.state.questions.find(question => question.id === this.questionId)
  }

  get answer() {
    return this.gameService.state.answers.find(answer => answer.questionId === this.questionId)
  }

  get teams() {
    return this.gameService.state.teams
  }

  writeAnswer(teamName: string) {
    this.gameService.state.answers =
      this.gameService.state.answers.filter(answer => answer.questionId !== this.questionId)


    this.gameService.state.answers.push({
      questionId: this.questionId,
      teamName: teamName,
    })

    window.alert('Ответ записан!')
    this.router.navigate(['/play'])
    
  }

}
