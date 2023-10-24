import { Injectable } from '@angular/core';

const defaultState = {
  categories: ['Сложение', 'Вычитание', 'Умножение', 'Деление'],
  questions: [
    {
      id: 1,
      question: '1 + 1',
      answer: '2',
      category: 'Сложение',
      points: 100,
    },
    {
      id: 2,
      question: '1 + 2',
      answer: '3',
      category: 'Сложение',
      points: 200,
    },
    {
      id: 3, 
      question: '2 * 2',
      answer: '4',
      category: 'Умножение',
      points: 100,
    },
    {
      id: 4,
      question: '2 * 3',
      answer: '6',
      category: 'Умножение',
      points: 200,
    },
    {
      id: 5,
      question: '3 - 3',
      answer: '0',
      category: 'Вычитание',
      points: 100,
    },
    {
      id: 6,
      question: '7 - 4',
      answer: '3',
      category: 'Вычитание',
      points: 200,
    },
    {
      id: 7,
      question: '6 / 2',
      answer: '3',
      category: 'Деление',
      points: 100,
    },
    {
      id: 8,
      question: '9 / 3',
      answer: '3',
      category: 'Деление',
      points: 200,
    }
  ],
  teams: [{
    name: 'Команда 1'
  },
  {
    name: 'Команда 2'
  }],
  answers: [],
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  state: {
    categories: string[];
    questions: {
      id: number;
      category: string;
      question: string;
      answer: string;
      image?: string;
      points: number;
    }[];
    teams: {
      name: string;
    }[];
    answers: {
      questionId: number;
      teamName: string;
    }[];
  } = defaultState;

  constructor() {
    if (localStorage.getItem('state')) {
      this.state = JSON.parse(localStorage.getItem('state')!);
    } else {
      this.state = defaultState;
    }
  }

  saveState() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  setEmptyState() {
    this.state = {
      categories: [],
      questions: [],
      teams: [],
      answers: [],
    }
  }

  downloadJSON() {
    const a = document.createElement('a');
    a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state));
    a.download = 'Игра.game';
    a.click();
  }

  uploadJSON(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.state = JSON.parse(event.target!.result as string);
      this.saveState();
      window.alert('Игра загружена!');
    };
    reader.readAsText(file);
  }

}
