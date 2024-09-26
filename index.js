class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h1>Add Items</h1>
            <input id="add-name" placeholder="Item name">
            <button id="submitButton">Add Item</button>
            <div class="line"></div>
            <input id="search" placeholder="Search items...">
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
        newItem.innerHTML = `<span>${this.itemObject[key]}</span> <button>X</button>`;
        newItem.querySelector('button').addEventListener('click', () => {
            delete this.itemObject[key];
            this.updateItemList();
        });
        itemList.appendChild(newItem);
    }
}

customElements.define('todo-list', TodoList);




// const itemInput = document.querySelector("#add-name");
// const submitItem = document.querySelector("#submitButton");
// const itemList = document.querySelector("#item-list");
// const search = document.querySelector("#search");

// let itemObject = {};
// let count = 0;

// function pushItem(value) {
//     itemObject[count] = value;
//     count++;
// };

// function removeItem(i) {
//     delete (itemObject[i]);
//     updateItemList();
// };

// function updateItemList() {
//     itemList.innerHTML = "";

//     for (let key in itemObject) {
//         addItem(key)
//     };
// };

// function searchItemList(input) {
//     itemList.innerHTML = "";

//     for (let key in itemObject) {
//         if(input === "") {
//             updateItemList()
//             break;
//         }
//         if(!itemObject[key].includes(input)) {
//             continue;
//         }
        
//         addItem(key)
//     };    
// };

// function addItem(key) {
//     const idNumber = `index${key}`;
//     let newItem = document.createElement("li");
//     newItem.className = "item-container"

//     newItem.innerHTML = `<span class="item-text">${itemObject[key]}</span> <button class="remove-button" id=${idNumber}>X</button>`;
//     itemList.appendChild(newItem);
//     document.querySelector(`#${idNumber}`).addEventListener('click', () => {
//         removeItem(key);
//     });
// };

// function addItemValue() {
//     if (itemInput.value) {
//         pushItem(itemInput.value)
//         itemInput.value = "";
//         updateItemList();
//     }
//     else {
//         alert("You can't add an empty item.");
//     };
// };

// submitItem.addEventListener('click', () => {
//     addItemValue();
// });

// itemInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         addItemValue();
//     };
// });

// search.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         searchItemList(search.value);
//         search.value = "";
//     };
// });