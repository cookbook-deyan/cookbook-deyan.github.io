// session.js     ----------------MY COOKBOOK----------------


import { getUserData } from "../util.js";

export default function initialize() {
    let user = null;

    updateSession();
   
   return function(ctx,next) {
        ctx.updateSession= updateSession;
        ctx.user = user;
        next();
    }

    function updateSession() {
        user = getUserData();
        console.log(`user value is: ${user} | if [object Object]-it is in LocalStorage(LS) | if null-deleted from LS`);
    }
}