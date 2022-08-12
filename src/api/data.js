// data.js     ----------------MY COOKBOOK----------------

import {getUserData} from '../util.js';
import {del} from '../api/api.js'

export const endpoints= {
    recent:'/classes/recipe?limit=3',
    recipes:(qyery)=>`/classes/recipe`, //?where=${createQuery(query)}
    recipeById:'/classes/recipe/',
    recepeDetails:(id)=>`/classes/recipe/${id}?include=owner`,
    commentsByRecipe:(recipeId)=>`/classes/comment?where=${createPointerQuery('recipe','recipe',recipeId)}&include=owner`,
    comments: '/classes/comment',
    deleteSes:'/parse/sessions/'

}

export function createPointerQuery(propName,className, objectId) {
    return createQuery({[propName]:createPointer(className,objectId)})
}

export function createQuery(query) {
   return encodeURIComponent(JSON.stringify(query))
}

export function createPointer(className, objectId) {
    return {
        __type:'Pointer',
        className,
        objectId
    }
}

export function addOwner(record) {
    const {id}=getUserData();
    console.log(id);
    record.owner = createPointer('_User',id);
    return record;
}

export async function deleteSession(id) {
    await del(endpoints.deleteSes+id);

}