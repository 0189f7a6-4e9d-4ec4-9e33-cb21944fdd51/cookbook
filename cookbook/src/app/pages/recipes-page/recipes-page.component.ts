import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { fadeInAnimation } from 'src/app/animations';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class RecipesPageComponent implements OnInit {

  /**
   * properties
   */
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public ingredientCtrl = new FormControl();
  public filteredIngredients: Observable<string[]>;
  public ingredients: string[] = [];
  public ingredientsFilter: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public allIngredients: string[] = [];
  private allRecipes: Recipe[] = [];
  public recipes: Recipe[];
  public loading: Observable<boolean>;

  /**
   * View vars
   */
  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  /**
   * constructor
   */
  constructor(
    private recipesService: RecipesService
  ) {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => ingredient ? this._filter(ingredient) : this.allIngredients.slice()));

    // Get loading state
    this.loading = this.recipesService.currentLoadingStateSource;
  }

  /**
   * ngOnInit
   * @returns void
   */
  ngOnInit(): void {
    // Get all recipes
    this.recipesService.currentRecipesSource
      .pipe(
        map(recipes => {
          // Get all ingredients for chipList
          return recipes.map(item => {
            this.addIngredients(item.ingredients);
            return item;
          });
        })
      )
      .subscribe(res => {
        this.recipes = res;
        this.allRecipes = res;
      });

    // Filter recipes
    this.ingredientsFilter.subscribe(ingredients => {
      this.recipes = this.allRecipes.filter(recipe => {
        for (const ingredient of ingredients) {
          if (recipe.ingredients.findIndex(obj => obj.name.trim().toLowerCase() === ingredient.trim().toLowerCase()) < 0) {
            return false;
          }
        }

        return true;
      });
    });

  }

  /**
   * addIngredients
   * @param ingredients array of Ingredient objects
   * @returns void
   */
  private addIngredients(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      const ingredientName = ingredient.name?.trim();
      if (this.allIngredients.indexOf(ingredientName) < 0) {
        this.allIngredients.push(ingredientName);
      }
    }
  }

  /**
   * add
   * @param event MatChipInputEvent
   */
  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our ingredient
    if ((value || '').trim()) {
      this.ingredients.push(value.trim());
      this.ingredientsFilter.next(this.ingredients);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.ingredientCtrl.setValue(null);
  }

  /**
   * remove
   * @param ingredient string
   */
  public remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
      this.ingredientsFilter.next(this.ingredients);
    }
  }

  /**
   * selected
   * @param event MatAutocompleteSelectedEvent
   */
  public selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.viewValue);
    this.ingredientsFilter.next(this.ingredients);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  /**
   * _filter
   * @param value string
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter(ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0);
  }

}
