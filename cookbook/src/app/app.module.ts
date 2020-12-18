import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NgOrderByPipeModule } from 'angular-pipes';

@NgModule({
  declarations: [
    AppComponent,
    RecipePageComponent,
    RecipesPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    NgOrderByPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
