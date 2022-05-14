const inputTag = document.querySelector('.inputText');
const listGroup = document.querySelector('.list-group');
const ulTag = document.querySelector('ul');
const clearAllBtn = document.querySelector('.clearAll');
const editValue = document.querySelector('.editValue');
const confirmBtn = document.querySelector('.confirmBtn');

const liTags = ulTag.children;
let keyArr = Object.keys(localStorage).sort();
let items = [];
let index = -1;

//create
const createItem = (itemName)=>{
    index += 1;
    const liTag = document.createElement('li');
    const pTag = document.createElement('p');
    const delBtn = document.createElement('i');
    const spanTag = document.createElement('span');
    spanTag.classList.add('badge','rounded-pill','bg-success','float-end','d-none');
    spanTag.textContent = "success";
    liTag.classList.add('list-group-item','text-capitalize','py-3');
    liTag.id = index;
    delBtn.classList.add("far","fa-trash-alt",'me-3','text-danger');
    pTag.classList.add('d-inline');
    pTag.textContent = itemName;
    liTag.append(delBtn,pTag,spanTag);
    listGroup.appendChild(liTag);

}

if(localStorage.length > 0){
    for(let i=0; i< keyArr.length; i++){
        let itemFromLocalStorage = localStorage.getItem(keyArr[i]);
        items.push(itemFromLocalStorage);
        createItem(itemFromLocalStorage);
    }
}else{
    createNothing();
}
function createNothing(){
    const liTag = document.createElement('li');
    liTag.classList.add('nothing');
    const alert = `<div class="alert text-center text-warning" role="alert">There is no record...</div>`;
    liTag.innerHTML = alert;
    ulTag.append(liTag);
}

inputTag.addEventListener("keypress",(event)=>{
    if(event.key == 'Enter'){
        if(ulTag.firstChild.classList.contains('nothing')){
            ulTag.firstChild.remove()
        }
        const productName = inputTag.value;
        items.push(productName);
        inputTag.value = "";
        createItem(productName);
        for(let i=0; i<items.length; i++){
            localStorage.setItem(i,items[i]);
        }
        return items;
    }
})


ulTag.addEventListener("click",(event)=>{

    if(event.target.nodeName == 'I'){
        let id = event.target.offsetParent.id;
            localStorage.removeItem(id);
            event.target.offsetParent.remove();
            if(localStorage.length == 0){
                createNothing();            
            }
    }else if(event.target.nodeName == 'P'){
        if(event.target.classList.contains('text-decoration-line-through')){
            event.target.classList.remove('text-decoration-line-through');
            event.target.nextSibling.classList.remove('d-inline');
            event.target.nextSibling.classList.add('d-none');
        }else{
            event.target.classList.add('text-decoration-line-through');
            event.target.nextSibling.classList.remove('d-none');
            event.target.nextSibling.classList.add('d-inline');
        }
    }
})

clearAllBtn.addEventListener("click",()=>{
    localStorage.clear();
    ulTag.innerHTML="";
    createNothing();
})