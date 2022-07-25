


const catalogTemplate = (recipes, goTo, page, pages) => html`
<section id="catalog">
    <header class="section-title">${pager(goTo, page, pages)}</header>
    ${recipes.map(r => recipePreview(r, goTo))}
    <footer class="section-title">${pager(goTo, page, pages)}</footer>
</section>`;

const recipePreview = (recipe, goTo) => html`
<article class="preview" @click=${()=> goTo('details', recipe._id)}>
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src=${recipe.img}></div>
</article>`;