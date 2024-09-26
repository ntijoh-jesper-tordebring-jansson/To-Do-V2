class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="index.css">
            <h1 class="item-title">Add Items</h1>
            <input class="input-item" id="add-name" placeholder="Item name">
            <button class="submit-button" id="submitButton">Add Item</button>
            <div class="line"></div>
            <input class="search-item" id="search" placeholder="Search items...">
            <div class="line"></div>
            <h2>Items</h2>
            <ul id="item-list"></ul>
        `;

        this.itemObject = {};
        this.count = 0;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#submitButton').addEventListener('click', () => this.addItem());
        this.shadowRoot.querySelector('#search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchItem();
        });
        this.shadowRoot.querySelector('#add-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });
    }

    addItem() {
        const itemInput = this.shadowRoot.querySelector('#add-name');
        if (itemInput.value) {
            this.itemObject[this.count] = itemInput.value;
            this.count++;
            itemInput.value = '';
            this.updateItemList();
        } else {
            alert("You can't add an empty item.");
        }
    }

    searchItem() {
        const searchInput = this.shadowRoot.querySelector('#search').value;
        this.shadowRoot.querySelector('#item-list').innerHTML = '';
        for (let key in this.itemObject) {
            if (this.itemObject[key].includes(searchInput)) {
                this.addItemToDOM(key);
            }
        }
    }

    updateItemList() {
        this.shadowRoot.querySelector('#item-list').innerHTML = '';
        for (let key in this.itemObject) {
            this.addItemToDOM(key);
        }
    }

    addItemToDOM(key) {
        const itemList = this.shadowRoot.querySelector('#item-list');
        const newItem = document.createElement('li');
        newItem.innerHTML = `<span class="item-text">${this.itemObject[key]}</span> <button class="remove-button">X</button>`;
        newItem.querySelector('button').addEventListener('click', () => {
            delete this.itemObject[key];
            this.updateItemList();
        });
        itemList.appendChild(newItem);
    }
}

customElements.define('todo-list', TodoList);