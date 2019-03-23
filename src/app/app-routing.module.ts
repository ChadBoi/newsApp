import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { SearchArticlesComponent} from './search-articles/search-articles.component';
import { SavedArticlesComponent} from './saved-articles/saved-articles.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'search',
    component: SearchArticlesComponent
  },
  {
    path: 'saved',
    component: SavedArticlesComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
