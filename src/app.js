
import {page} from './lib.js';
import * as api from './api/data.js'
import{getUserData} from './util.js'

import decorateContext from './middlewares/render.js';
import addSession from './middlewares/session.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';

page(addSession() )
page(decorateContext());
page('/',homePage);
page('/login',loginPage)

page.start();
const r=getUserData();
console.log(r);
window.api=api;