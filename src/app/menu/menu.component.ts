import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent {
  menuItems = [
    { name: 'Играть', link: '/play' },
    { name: 'Создать', link: '/create' },
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
