import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { fadeInAnimation } from 'src/app/animations';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class RecipePageComponent implements OnInit, OnDestroy {

  /**
   * properties
   */
  private routeSubscription: any;
  public recipe: Recipe = null;
  public loading: Observable<boolean>;

  /**
   * constructor
   */
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {
    // Get loading state
    this.loading = this.recipesService.currentLoadingStateSource;
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    // Get Routing Parameter
    this.routeSubscription = this.route.params.subscribe(params => {

      // Get Recipe from URL Parameter ID
      this.recipesService.currentRecipesSource.subscribe(recipes => {
        this.recipe = recipes.filter(obj => obj.id === +params['id'])[0];
      });
    });
  }

  /**
   * ngOnDestroy
   *  Destroys any Subscription on component destroy event
   * @returns void
   */
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
