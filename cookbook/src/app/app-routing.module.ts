import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';

const routes: Routes = [
  {
    // Home page with list of recipes
    path: '',
    component: RecipesPageComponent,
    data: {
      title: 'Rezepte'
    }
  },
  {
    // Recipe
    path: 'recipe/:id',
    component: RecipePageComponent,
    data: {
      title: 'Rezept'
    }
  },
  {
    // Wildcard route for a 404 page
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
