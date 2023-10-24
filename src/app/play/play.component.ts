import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  state = this.gameService.state

  constructor(public gameService: GameService) {
  }

  getQuestionsOfCategory(category: string) {
    return this.state.questions.filter(question => question.category === category).sort((a, b) => a.points - b.points)
  }

  getMaximumNumberOfQuestions() {
    return Math.max(...this.state.categories.map(category => this.getQuestionsOfCategory(category).length))
  }

  isAnswered(questionId: number) {
    return this.state.answers.find(answer => answer.questionId === questionId)
  }

  teamScore(teamName: string) {
    let score = 0
    this.state.answers.forEach(answer => {
      if (answer.teamName === teamName) {
        const question = this.state.questions.find(question => question.id === answer.questionId)
        score += (question?.points ?? 0) 
      }
    })
    return score
  }

  resetState() {
    this.gameService.state.answers = []
    this.gameService.saveState()
    window.alert('Игра сброшена!')
  }

  saveState() {
    this.gameService.saveState()
    window.alert('Игра сохранена!')
  }
}
