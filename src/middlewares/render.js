// render.js     ----------------MY COOKBOOK----------------

import {
    render
} from '../lib.js';
import {
    getUserData
} from '../util.js';






export default function initialize(ctx, next) {
    const root = document.querySelector('main');
    updateUserNav();
    
    return function(ctx,next) {
       
    ctx.render = boundRender;
    ctx.updateUserNav=updateUserNav;    
    next();
    }
    
    

    function updateUserNav() {
      

        const userData = getUserData();
        if (userData) {
          console.log('navigation updated: guest display replaced with Logout | user is logedin');

            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
          console.log('navigation updated: user display replaced with LoginBtn | user is logedout');
            document.getElementById('user').style.display = 'none';
            document.getElementById('guest').style.display = 'inline-block';
        }
    }

    function boundRender(content) {
        render(content, root)
    }
}