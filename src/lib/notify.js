const container = document.createElement('div');
container.id='notification';
const list = document.createElement('ul');

container.appendChild(list);

document.body.appendChild(container);

export function notify(message) {
    const liItem = document.createElement('li');
    liItem.className='notification'
    liItem.textContent=message;
    list.appendChild(liItem)
}