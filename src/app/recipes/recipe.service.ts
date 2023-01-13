import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[]=[];


  constructor(private http:HttpClient,private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    console.log('from recipe service-getRecipes')
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    console.log('from recipe service-getRecipe')
    return this.recipes[index];
  }
  getRecipeid(index: number) {
    return this.recipes[index].id;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log(recipe);
    this.http.post('https://localhost:44328/api/recipe/Post',recipe)
    .subscribe(response=>{
        console.log(response);
    });
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.http.put('https://localhost:44328/api/recipe/Putrecipes?id='+this.recipes[index].id,newRecipe)
    .subscribe(response=>{
    });
    this.recipes[index] = newRecipe;
    console.log(newRecipe)
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes.slice())
  }

  deleteRecipe(recipeid: number,index:number) {
    this.http.delete('https://localhost:44328/api/recipe/'+recipeid)
    .subscribe(response=>{
        console.log(response);
    });
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    
  }
}
