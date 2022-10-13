// api.js     ----------------MY COOKBOOK----------------

import { notify } from "../lib/notify.js";
import {
    clearUserData,
    getUserData,
    setUserData
} from "../util.js";
import { endpoints} from './data.js'

const hostname = 'https://parseapi.back4app.com'

async function request(url, options) {

    try {
        const response = await fetch(hostname + url, options);
        if (response.ok == false) {
            // handle error
            const error = await response.json();
            console.log(error);
            throw{
                message:error.error,
                code: error.code
            }
        }

        return await response.json();
    } catch (err) {
        notify(err.message)
        throw err;
    }

}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': '7OFqWPkI9uNzgYxbg75yTbGL2ZxjUr1QpzOWNlEn',
            'X-Parse-REST-API-Key': 'Yz9nr1DMcLe3JfU00h9LHfHFfqb2fDblC3Qnrsf7'
        }
    }
    const userData = getUserData();

    if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.token;
    }
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }

    return options;



}
export async function get(url) {
    return request(url, createOptions())
}

export async function post(url, data) {

    return request(url, createOptions('post', data));
}

export async function del(url) {
    return request(url,createOptions('delete'));
}
export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function login(username, password) {
    const result = await post('/login', {
        username,
        password
    });

    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken
    }
    setUserData(userData)
    return result;
}

export async function register(username, email, password) {
    const result = await post('/users', {
        username,
        email,
        password
    });

    const userData = {
        username,
        id: result.objectId,
        token: result.sessionToken
    }
    setUserData(userData);
    return result
}

export async function logout(ctx) {
    console.log(ctx);
    await post('/logout');
    //    async function deleteSession(id) {
    //     await del(endpoints.delateSes+id);
    
    // }

    clearUserData();
    ctx.updateSession();
    console.log('Logout function is executed. clearUserData and ctx.updateSession() run');
}

window.logout=logout;