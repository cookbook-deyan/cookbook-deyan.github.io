
import { createComment, getCommentsByRecipeId } from '../api/comment.js';
import {html,until,render} from '../lib.js'
import { createSubmitHandler } from '../util.js';
import { spinner } from './common.js';

const commentsTemplate = (commentsPromise,hasUser,active,onToggle,onSubmit) => html`
<div class="section-title">
    Comments:
</div>

${hasUser ? commentForm(active,onToggle,onSubmit) : null}

<div class="comments">
   <ul>
       ${until(commentsPromise,spinner)}
   </ul>
</div>`;

const commentForm = (active,onToggle,onSubmit) => html`
<article class="new-comment">
    ${active
        ? html`
    <h2>New comment</h2>
    <form id="commentForm" @submit=${onSubmit}>
        <textarea name="content" placeholder="Type comment"></textarea>
        <input type="submit" value="Add comment">
    </form>`
        : html`<article class="new-comment"><form ><button class="button" @click=${onToggle}>Add comment</button></form></article>`}
</article>`;

const commentCard=(comment)=>html`
    <li class="comment">
        <header>${comment.owner.username}<span class="comment-date">${(new Date(comment.owner.createdAt).toLocaleString())}</span> </header>
        <p>${comment.content}</p>
    </li>
`


export function commentsView(ctx, recipeId) {
    const parent = document.getElementById('comments-container');
    
    const commentsPromise=getCommentsByRecipeId(recipeId)
        console.log(commentsPromise);
    update();

    function update(active=false) {
        render(commentsTemplate(loadComments(commentsPromise),ctx.user,active,onToggle,createSubmitHandler(onSubmit,'content')),parent)
    }

    function onToggle() {
        update(true)
    }

    async function onSubmit({content}) {
        if (content==='') {
            return;
        }

        const result=    await createComment(recipeId,{content});
        result.owner = {username:ctx.user.username}
        result.content=content;
        (await commentsPromise).results.unshift(result);
        update();
    }


}


async function loadComments(commentsPromise) {
    const {results:comments} = await commentsPromise;
    console.log(await commentsPromise);
    return comments.map(commentCard)
}