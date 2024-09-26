const itemInput = document.querySelector("#add-name");
const submitItem = document.querySelector("#submitButton");
const itemList = document.querySelector("#item-list");
const search = document.querySelector("#search");

let itemObject = {};
let count = 0;

function pushItem(value) {
    itemObject[count] = value;
    count++;
};

function removeItem(i) {
    delete (itemObject[i]);
    updateItemList();
};

function updateItemList() {
    itemList.innerHTML = "";

    for (let key in itemObject) {
        addItem(key)
    };
};

function searchItemList(input) {
    itemList.innerHTML = "";

    for (let key in itemObject) {
        if(input === "") {
            updateItemList()
            break;
        }
        if(!itemObject[key].includes(input)) {
            continue;
        }
        
        addItem(key)
    };    
};

function addItem(key) {
    const idNumber = `index${key}`;
    let newItem = document.createElement("li");
    newItem.className = "item-container"

    newItem.innerHTML = `<span class="item-text">${itemObject[key]}</span> <button class="remove-button" id=${idNumber}>X</button>`;
    itemList.appendChild(newItem);
    document.querySelector(`#${idNumber}`).addEventListener('click', () => {
        removeItem(key);
    });
};

function addItemValue() {
    if (itemInput.value) {
        pushItem(itemInput.value)
        itemInput.value = "";
        updateItemList();
    }
    else {
        alert("You can't add an empty item.");
    };
};

submitItem.addEventListener('click', () => {
    addItemValue();
});

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItemValue();
    };
});

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchItemList(search.value);
        search.value = "";
    };
});