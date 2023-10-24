import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  
    category = '';
    question = '';
    answer = '';
    points = '0';
    team = '';
  
    constructor(public gameService: GameService) {
    }
  
    ngOnInit(): void {

    }

    newGame() {
      if (!window.confirm('Вы уверены? Предыдущая игра будет потеряна!')) {
        return
      }

      this.gameService.state = {
        categories: [],
        questions: [],
        teams: [],
        answers: [],
      }
      this.gameService.saveState()
      window.alert('Новая игра создана! Добавьте категории и вопросы!')
    }

    addCategory() {
      if (this.gameService.state.categories.find(category => category === this.category)) {
        window.alert('Такая категория уже есть!')
        return
      }

      if (!this.category) {
        window.alert('Введите название категории!')
        return
      }

      this.gameService.state.categories.push(this.category)
      window.alert(`Категория ${this.category} добавлена!`)
    }

    addQuestion() {
      if (!this.category) {
        window.alert('Выберите категорию!')
        return
      }

      if (!this.question) {
        window.alert('Введите вопрос!')
        return
      }

      if (!this.answer) {
        window.alert('Введите ответ!')
        return
      }

      if (!this.points) {
        window.alert('Введите баллы!')
        return
      }

      this.gameService.state.questions.push({
        id: this.gameService.state.questions.length,
        category: this.category,
        question: this.question,
        answer: this.answer,
        points: parseInt(this.points),
      })
      window.alert('Вопрос добавлен!')
    }

    addTeam() {
      if (this.gameService.state.teams.find(team => team.name === this.team)) {
        window.alert('Такая команда уже есть!')
        return
      }
      this.gameService.state.teams.push({name: this.team})
      window.alert(`Команда ${this.team} добавлена!`)
    }

    saveState() {
      this.gameService.saveState()
      window.alert('Игра сохранена!')
    }

    removeQuestion(questionId: number) {
      this.gameService.state.questions = this.gameService.state.questions.filter(question => question.id !== questionId)
      this.gameService.state.answers = this.gameService.state.answers.filter(answer => answer.questionId !== questionId)
      window.alert('Вопрос удален!')
    }

    removeTeam(teamName: string) {
      this.gameService.state.teams = this.gameService.state.teams.filter(team => team.name !== teamName)
      this.gameService.state.answers = this.gameService.state.answers.filter(answer => answer.teamName !== teamName)
      window.alert('Команда удалена!')
    }

    removeCategory(category: string) {
      this.gameService.state.categories = this.gameService.state.categories.filter(cat => cat !== category)
      this.gameService.state.questions = this.gameService.state.questions.filter(question => question.category !== category)
      window.alert('Категория удалена!')
    }

}
