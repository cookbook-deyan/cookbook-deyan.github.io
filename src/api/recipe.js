// recipe.js     ----------------MY COOKBOOK----------------

import { getUserData } from '../util.js';
import * as api from './api.js';
import {addOwner, endpoints} from './data.js'

export async function getRecentRecipes() {
    console.log(endpoints.recent);
    return api.get(endpoints.recent)
}


export async function getRecipes(page,query) {
    if (query) {
        //ако има куери ще го сменим с един обект който създаваме тука
        query={
            name:{
                $text:{
                    $search:{$term:query},
                    $caseSensitive:false
                }
            }
        }
        return api.get(endpoints.recipeSearch(page,query))
    } else{

        return api.get(endpoints.recipes(page))
    }
    
}

export async function getRecipeById(id) {

    return api.get(endpoints.recepeDetails(id))
}

export async function createRecipe(recipe) {
    addOwner(recipe)

    return api.post(endpoints.createRecipe,recipe)
}

export async function updateRecipe(id,recipe) {
    return api.put(endpoints.recepeDetails(id),recipe)
}

export async function deleteRecipe(id) {
    return api.del(endpoints.recepeDetails(id))
}