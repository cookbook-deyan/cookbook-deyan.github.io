
import {html,until} from '../lib.js'

const commentsTemplate = (commentsPromise,active) => html`
<div class="section-title">
    Comments for 
</div>

${commentForm(active)}

<div class="comments">
    ${until()}
</div>`;

const commentFormTemplate = (active, toggleForm) => html`
<article class="new-comment">
    ${active
        ? html`
    <h2>New comment</h2>
    <form id="commentForm">
        <textarea name="content" placeholder="Type comment"></textarea>
        <input type="submit" value="Add comment">
    </form>`
        : html`<article class="new-comment"><form><button class="button" >Add comment</button></form></article>`}
</article>`;



export function commentsView() {
    return commentsTemplate(loadComments(),false)
}


async function loadComments() {
    
}