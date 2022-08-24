

// edit.js     ----------------MY COOKBOOK----------------


import { getRecipeById, updateRecipe } from '../api/recipe.js';
import {
    html
} from '../lib.js';
import {
    createSubmitHandler
} from '../util.js';
import {
    errorMsg,
    field
} from './common.js';


const editTemplate = (onSubmit, errors,data) => html`
<section id="create">
    <article>
        <h2>Edit Recipe</h2>
        <form @submit=${onSubmit} id="editForm">
       ${errorMsg(errors)}
        
            ${field({label: "Name", name:'name',placeholder:'Recipe name', value:data.name,error:errors.name})}
            ${field({label: "Image", name:'img',placeholder:'Image URL', value:data.img,error:errors.img})}
            ${field({label: "Ingredients",type:'textarea', name:'ingredients',placeholder:'Enter ingredients on separate lines', value:data.ingredients,error:errors.ingredients})}
            ${field({label: "Preparation",type:'textarea', name:'steps',placeholder:'Enter preparation steps on separate lines', value:data.steps,error:errors.steps})}
        
            <input type="submit" value="Edit Recipe">
        </form>
    </article>
</section>`;

const spacer = () => html `<div class="recent-space"></div>`;

 

export async function editPage(ctx) {

     
    const recipe = await getRecipeById(ctx.params.id);
    recipe.ingredients=recipe.ingredients.join('\n');
    recipe.steps=recipe.steps.join('\n');
    console.log(recipe.steps);


    update( );

    function update(errors = {}, data =recipe) {
       
        ctx.render(editTemplate(createSubmitHandler(onSubmit, 'name', 'img','ingredients','steps'), errors, data))
    }

    async function onSubmit(data,event) {
        const missing = Object.entries(data).filter(([k, v]) => v == '')
        try {
            if (missing.length > 0) {

                throw missing.reduce((a, [k]) => Object.assign(a, {
                    [k]: true
                }), {
                    message: 'Pls fill all fields!'
                })
            }

            const recipe = {
                name:data.name,
                img:data.img,
                ingredients:data.ingredients.split('\n').filter(r=> r!=''),
                steps:data.steps.split('\n').filter(r=>r !='')
            }
         
            const result = await updateRecipe(ctx.params.id,recipe);
            
            event.target.reset();
            ctx.page.redirect('/details/'+ctx.params.id);
         
        } catch (error) {
         
            update(error,data)
        }
 
    }
    
}