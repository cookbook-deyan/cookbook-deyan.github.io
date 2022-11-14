
import {page} from './lib.js';
import * as api from './api/data.js'
 import {getCommentsByRecipeId} from './api/comment.js'
 
import addSession from './middlewares/session.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';

import  updateNavigation from './middlewares/render.js'

import  notify from './middlewares/notify.js'
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import {  logout } from './api/api.js';


page(addSession() )
page(notify())
page(updateNavigation())

page('/',homePage);
page('/login',loginPage);
page('/register',registerPage)
page('/catalog', catalogPage);
page('/create', createPage)
page('/details/:id' , detailsPage);
page('/edit/:id', editPage);
page('/logout',logout)
page.start();
 
document.getElementById('logoutBtn').addEventListener('click',(event)=>{
    event.preventDefault();
    page.redirect('/catalog')
    logout();
})