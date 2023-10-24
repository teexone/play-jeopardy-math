import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: 'play', component: PlayComponent },
  { path: 'q/:id', component: QuestionComponent },
  { path: 'create', component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
