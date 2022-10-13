// data.js     ----------------MY COOKBOOK----------------

import {getUserData} from '../util.js';
import {del} from '../api/api.js'

const pageSize=5

export const endpoints= {
    recent:'/classes/recipe?limit=2',
    recipes:()=>`/classes/recipe`,
    // и двете имат паджинейшън, но едната заявка няма търсене или where клауза
    recipeSearch:(page,query)=>`/classes/recipe?where=${createQuery(query)}&skip=${(page-1)*pageSize}&limit=${pageSize}`,
    createRecipe:'/classes/recipe',
    recipeById:'/classes/recipe/',
    recepeDetails:(id)=>`/classes/recipe/${id}?include=owner`,
    commentsByRecipe:(recipeId)=>`/classes/comment?where=${createPointerQuery('recipe','recipe',recipeId)}&include=owner&order=-createdAt`,
    comments: '/classes/comment',
    delateSes:'/parse/sessions/'

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
   
    record.owner = createPointer('_User',id);
    return record;
}

export async function deleteSession(id) {
    await del(endpoints.delateSes+id);

}