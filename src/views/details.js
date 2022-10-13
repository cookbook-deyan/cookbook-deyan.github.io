// details.js     ----------------MY COOKBOOK----------------


import { deleteRecipe, getRecipeById } from '../api/recipe.js';
import {html} from '../lib.js'
import { until } from '../lib/directives/until.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';

const detailsTemplate = (recipePromise) => html`
<section id="details">
   ${until(recipePromise,spinner())}

   <div id="comments-container">
     
   </div>
</section>`;

const recipeCard = (recipe,isOwner,onDelete) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb"><img src=${recipe.img}></div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(s => html`<p>${s}</p>`)}
    </div>
    ${
isOwner ? html`
        <div class="controls">
            <a  class="actionLink" href="/edit/${recipe.objectId}">&#x270e; Edit</a>
            <a @click=${onDelete} class="actionLink" href="javascript:void(0)"> &#x2716; Delete</a>
        </div>`:null
    }
   
</article>`;


export  function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadRecipe(ctx)))
    commentsView(ctx,ctx.params.id);
    // тези две функции ще тръгнат синхронно ще тръгнат едновременно , защото няма await
}

async function loadRecipe(ctx) {
    const recipe = await getRecipeById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id ===recipe.owner.objectId;


    return recipeCard(recipe,isOwner,onDelete);

    async function onDelete(recipe,isOwner) {
        const choice = confirm("Delete this recipe");

        if (choice) {
            await deleteRecipe(ctx.params.id);
            ctx.notify('Recipe deleted');
            ctx.page.redirect('/catalog');
        }
    }
}


