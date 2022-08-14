// login.js     ----------------MY COOKBOOK----------------

import {
    login
} from '../api/user.js';
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




const loginTemplate = (onSubmit, errors, data) => {
    
    return html `
<section id="login">
    <article>
        <h2>Login</h2>
        <form @submit=${onSubmit} id="loginForm">
        ${errorMsg(errors)}

        
         
            ${field({label:'Username',name:"username", value:data.username, error:errors.username})}
            
            ${field({label:'Password',name:"password",type:'password', error:errors.password})}
    <input type="submit" value="Login">
            
        </form>
    </article>
</section>`
    
};




const spacer = () => html `<div class="recent-space"></div>`;



export function loginPage(ctx) {
    update();

    function update(errors = {}, data = {}) {

        ctx.render(loginTemplate(createSubmitHandler(onSubmit, 'username', 'password'), errors, data))
    }

    async function onSubmit({username, password}) {
 
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

    }
}