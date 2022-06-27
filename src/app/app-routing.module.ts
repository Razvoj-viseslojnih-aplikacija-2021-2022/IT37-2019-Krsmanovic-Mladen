import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NacionalnostComponent } from './components/nacionalnost/nacionalnost.component';
import { LigaComponent } from './components/liga/liga.component';
import { TimComponent } from './components/tim/tim.component';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';

const routes: Routes = [

  { path: 'nacionalnost', component: NacionalnostComponent },
  { path: 'liga', component: LigaComponent },
  { path: 'tim', component: TimComponent },
  { path: 'home', component: HomeComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
