
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { inOutAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [inOutAnimation]
})
export class AppComponent implements OnInit {
  /**
   * properties
   */
  public title = 'cookbook';
  public windowScrolled: boolean;

  /**
   * constructor
   */
  constructor(
    private recipesService: RecipesService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  /**
   * ngOnInit
   * @returns void
   */
  ngOnInit(): void {
    // Load recipes data
    this.recipesService.changeLoadingState(true);
    this.recipesService.getRecipes().subscribe(res => {
      this.recipesService.changeRecipes(res);
      this.recipesService.changeLoadingState(false);
    });
  }

  /**
   * onWindowScroll
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  /**
   * scrollToTop
   */
  public scrollToTop(): void {
    (function smoothscroll(): void {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  /**
   * onActivate
   *  Scroll Top onActivate Event
   * @param event any
   */
  public onActivate(event: any): void {
    window.scroll(0, 0);
  }
}
