import { getRecipeById } from '../api/recipe.js';
import {html} from '../lib.js'
import { until } from '../lib/directives/until.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';

const detailsTemplate = (recipePromise) => html`
<section id="details">
   ${until(recipePromise,spinner())}
   ${commentsView()}
</section>`;

const recipeCard = (recipe,isOwner) => html`
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
            <a class="actionLink" href="$1">&#x270e; Edit</a>
            <a class="actionLink" href="javascript:void(0)"> &#x2716; Delete</a>
        </div>`:null
    }
   
</article>`;


export  function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadRecipe(ctx)))
}

async function loadRecipe(ctx) {
    const recipe = await getRecipeById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id ===recipe.owner.objectId;


    return recipeCard(recipe,isOwner)
    async function onDelete(recipe,isOwner) {
        
    }
}

