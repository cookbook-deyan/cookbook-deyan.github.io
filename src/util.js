// util.js     ----------------MY COOKBOOK----------------

export function setUserData(userData) {
    localStorage.setItem('userData',JSON.stringify(userData));

}

export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData() {
    localStorage.removeItem('userData');
}

export function createSubmitHandler(callback ,...fieldNames) {
    return function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
         
       
        const data= fieldNames.reduce((a,c)=>Object.assign(a,{[c]: formData.get(c)}),{});
            
        callback(data,event)
    }
}

export function parseQuery(querystring) {
    if (querystring =='') {
        return {}
    } else {


        
        return querystring.split('&').reduce((a,c)=>{
            const [k,v]=c.split('=');
            a[k]=v;
            return a
        },{})
    }
}