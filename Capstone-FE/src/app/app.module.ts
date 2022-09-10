import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MenuBarComponent } from 'src/component-ui/menu-bar/menu-bar.component';
import { ListComponent } from 'src/component-ui/list/list/list.component';
import { IntroPageComponent } from 'src/component/intro-page/intro-page/intro-page.component';
import { Dynamic } from 'src/data-type/dynamic-component.directive';
import { NgImageSliderModule } from 'ng-image-slider';
import { MoviePageComponent } from 'src/component/movies-page/movie-page.component';
import { MoviesListComponent } from 'src/component/movies-page/movies-list/movies-list.component';
import { MoviesDetailComponent } from 'src/component/movies-page/movies-detail/movies-detail.component';
import { ActorPageComponent } from 'src/component/actor-page/actor-page.component';
import { ActorListComponent } from 'src/component/actor-page/actor-list/actor-list.component';
import { ActorDetailComponent } from 'src/component/actor-page/actor-detail/actor-detail.component';
import { MovieService } from 'src/service/movie-service/movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActorService } from 'src/service/actor-service/actor.service';
import { StoreModule } from '@ngrx/store';
import { actorReducer } from 'src/component/actor-page/actor-store/actor.reducer';
import { movieReducer } from 'src/component/movies-page/movie-store/moive.reducer';
import { AuthInterceptor } from 'src/interceptor/auth.interceptor';
import { NoResultComponent } from 'src/component-ui/no-result/no-result.component';
import { FormErrorInputComponent } from 'src/component-ui/form-error-input/form-error-input.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ListComponent,
    IntroPageComponent,
    MoviePageComponent,
    MoviesListComponent,
    MoviesDetailComponent,
    ActorPageComponent,
    ActorListComponent,
    ActorDetailComponent,
    NoResultComponent,
    FormErrorInputComponent,
    Dynamic
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    MaterialModule,
    NgImageSliderModule,
    StoreModule.forRoot({actorStore: actorReducer, movieStore: movieReducer})
  ],
  providers: [MovieService, ActorService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
