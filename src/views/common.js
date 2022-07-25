import {classMap, html} from '../lib.js';

export const spinner = ()=>html`
<p>Loading &hellip;</p>
`

export const field=({label, name, type='text',value='',placeholder='',error})=>{
    
if (type =='textarea') {
reutrn html`<label>${label}: <textarea name="${name}" placeholder=${placeholder}  class=${classMap(error)} value=${value}  ></textarea></label>`
} else{
    console.log(typeof error);
    return html`<label>${label}: <input class=${classMap({error})} type=${type} name=${name} .value=${value}></label>`
    
    }

};

