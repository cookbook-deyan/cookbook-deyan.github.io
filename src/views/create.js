
// create.js     ----------------MY COOKBOOK----------------


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


const createTemplate = (onSubmit, errors,data) => html`
<section id="create">
    <article>
        <h2>New Recipe</h2>
        <form @submit=${onSubmit} id="createForm">
       ${errorMsg(errors)}
        
            ${field({label: "Name", name:'name',placeholder:'Recipe name', value:data.name})}
            ${field({label: "Image", name:'img',placeholder:'Image URL', value:data.img})}
            ${field({label: "Ingredients",type:'textarea', name:'ingredients',placeholder:'Enter ingredients on separate lines', value:data.ingredients})}
            ${field({label: "Preparation",type:'textarea', name:'steps',placeholder:'Enter preparation steps on separate lines', value:data.preparation})}
        
            <input type="submit" value="Create Recipe">
        </form>
    </article>
</section>`;

const spacer = () => html `<div class="recent-space"></div>`;



export function createPage(ctx) {
    update();

    function update(errors = {}, data = {}) {

        ctx.render(createTemplate(createSubmitHandler(onSubmit, 'username', 'password'), errors, data))
    }

    async function onSubmit({username, password}) {
 /*
        try {
            if (username == '' || password == '') {
                throw {

                    message: 'Pls fill all fields!',
                   
                        username: true,
                        password: true
                   
                }
            }
            await login(username, password);
            console.log(ctx);
            // event.target.reset();
            ctx.updateSession();
            ctx.updateUserNav();

            ctx.page.redirect('/catalog')
        } catch (error) {
          console.log(username,password);
            update(error, {username,password})
        }
*/
    }
    
}