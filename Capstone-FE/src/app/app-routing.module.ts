import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { ActorDetailComponent } from 'src/component/actor-page/actor-detail/actor-detail.component';
import { ActorListComponent } from 'src/component/actor-page/actor-list/actor-list.component';
import { ActorPageComponent } from 'src/component/actor-page/actor-page.component';
import { IntroPageComponent } from 'src/component/intro-page/intro-page/intro-page.component';
import { MoviePageComponent } from 'src/component/movies-page/movie-page.component';
import { MoviesDetailComponent } from 'src/component/movies-page/movies-detail/movies-detail.component';
import { MoviesListComponent } from 'src/component/movies-page/movies-list/movies-list.component';

const routes: Routes = [
  {
    path:'home',
    component: IntroPageComponent
  },
  {
    path:'movies',
    component: MoviePageComponent,
    children:[
      {
        path:'movies-list',
        component:MoviesListComponent
      },
      {
        path:':id/movies-detail',
        component:MoviesDetailComponent
      }
    ]
  },
  {
    path:'actors',
    component: ActorPageComponent,
    children:[
      {path:'actor-list',component:ActorListComponent},
      {path:'actor-detail', component:ActorDetailComponent}
    ]
  },
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
