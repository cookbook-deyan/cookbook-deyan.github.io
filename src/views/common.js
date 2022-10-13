
// common.js     ----------------MY COOKBOOK----------------

import {
    classMap,
    html
} from '../lib.js';

export const spinner = () => html `
<p>Loading &hellip;</p>
`

export const field = ({
    label,
    name,
    type = 'text',
    value = '',
    placeholder = '',
    error
}) => {

    if (type == 'textarea') {
        return html `<label class=${classMap({ml:true})}>${label}: <textarea name="${name}" placeholder=${placeholder}  class=${classMap({err:error})}   >${value}</textarea></label>`
    } else {

        return html `<label>${label}: <input class=${classMap({err:error})} type=${type} name=${name} .value=${value}></label>`

    }

};

export const errorMsg = (errors)=>{
    if (errors) {
        return html`<p class="err">${errors.message}</p>`
    } else{
        return null;
    }
}