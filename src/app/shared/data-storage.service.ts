import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { map,tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
@Injectable({providedIn: 'root'})

export class DataStorageService {

constructor(private http:HttpClient, private recipeService: RecipeService){}

storeRecipes()
{
    const recipes=this.recipeService.getRecipes();
    this.http.post('https://localhost:44328/api/recipe',recipes)
    .subscribe(response=>{

        console.log(response);
    });

    //    console.log(response);
    //});
    this.http.get('https://localhost:44328/api/recipe?pageNumber=1&pageSize=10').subscribe(response=>{
        //this.recipeService.setRecipes(response);
        console.log('from storerecipes')
    });

}

getallrecipes(){
  console.log('from getallrecipes service')

    return this.http
      .get<Recipe[]>(
        'https://localhost:44328/api/recipe?pageNumber=1&pageSize=5'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
          //console.log(recipes);
        })
      )
  }

  FetchRecipes(){
    //this.http.get('https://localhost:44328/api/recipe?pageNumber=1&pageSize=8').subscribe(response=>{console.log(response)    });
    console.log('from datastorage service-FetchRecipes')

    return this.http
      .get<Recipe[]>(
        'https://localhost:44328/api/recipe?pageNumber=1&pageSize=10'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
