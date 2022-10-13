// home.js     ----------------MY COOKBOOK----------------

import { getRecentRecipes} from '../api/recipe.js';
import {html, until} from '../lib.js';
import { spinner } from './common.js';

const homeTemplate = (recipePromise) => html`
<section id="home">
    <div class="hero">
        <h2>Welcome to My Cookbook</h2>
    </div>
    <header class="section-title">Recently added recipes</header>
    <div class="recent-recipes">
        ${until(recipePromise,spinner())}
    </div>
    <footer class="section-title">
        <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
        <iframe src="https://free.timeanddate.com/countdown/i8jjxyf9/n238/cf114/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pcfff/tcfff/fs100/szw320/szh135/tatTime%20left%20to%20Event%20in/tac000/tptTime%20since%20Event%20started%20in/tpc000/mac000/mpc000/iso2022-10-13T00:00:00" allowtransparency="true" frameborder="0" width="320" height="135"></iframe>

    </footer>
</section>`;

const recipePreview = (data) => html`
<a class="card" href="/details/${data.objectId}">

    <article class="recent" >
        <div class="recent-preview"><img src=${data.img}></div>
        <div class="recent-title">${data.name}</div>
    </article>;
</a>`

const spacer = () => html`<div class="recent-space"></div>`;

export function homePage(ctx) {
    ctx.render(homeTemplate(loadRecipes()))
    
}

async function loadRecipes() {
   
    let {results:recipes} =  await getRecentRecipes();
    if (recipes.length==0) {
        return html`<p>No recipes found</p>`
    }else{
       
        return recipes.reduce((a,c)=>{
           
            if (a.length>0) {
                a.push(html`<div class="recent-space"></div>`)
               
            }  
            
            a.push(recipePreview(c))
            
            return a
        },[])
    }
     
}