import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  /**
   * properties
   */
  private recipesSource = new BehaviorSubject<Recipe[]>([]);
  public currentRecipesSource = this.recipesSource.asObservable();

  private loadingStateSource = new BehaviorSubject<boolean>(false);
  public currentLoadingStateSource = this.loadingStateSource.asObservable();

  /**
   * constructor
   */
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * changeRecipes
   * @param recipes Array of recipe objects
   * @returns void
   */
  public changeRecipes(recipes: Recipe[]): void {
    this.recipesSource.next(recipes);
  }

  /**
   * changeLoadingState
   * @param state boolean
   * @returns void
   */
  public changeLoadingState(state: boolean): void {
    this.loadingStateSource.next(state);
  }

  /**
   * getRecipes
   * @returns Array
   */
  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('assets/recipes.json')
      .pipe(
        map((recipes) =>
          recipes.map((item, index) => {
            return new Recipe(
              index,
              item.name,
              item.ingredients,
              item.steps,
              item.timers,
              item.imageURL,
              item.originalURL
            );
          }),

        ),
        catchError(this.handleError<Recipe[]>('getRecipes', 'Die Rezepte konnten nicht geladen werden.', []))
      );
  }

  /**
   * handleError
   *  Handelt Fehler die bei einer HTTP Operation aufgetreten sind.
   *  Lässt die App weiterlaufen.
   *
   * @param operation - Name der Aktion die fehlerhaft war
   * @param message - Nachricht an den User
   * @param result - Optionaler Wert welches als Observable Ergebnis zurückgegeben wird.
   * @returns Observable<T>
   */
  private handleError<T>(operation = 'operation', message: string, result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
