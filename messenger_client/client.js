import { signupForm } from "./forms.js";

const domain = 'http://127.0.0.1:8000/'
let reqPathChat = 'api/v1/chat/'
let reqPathReg = 'api/v1/auth/users/'
let myRequest = domain + reqPathChat

const chatList = document.querySelector('.list_chat');
const section = document.querySelector('.section')
const btn_home = document.querySelector('.btn_home'); 
const btn_signup = document.querySelector('.btn_signup');


const loadChats = () => {
    return fetch(myRequest)
        .then((response) => {return response.json()})
        .then((data) => {
            // console.log('My json chats:' , data)
            for (const chat of data){
                const listItem = document.createElement('li');
                listItem.append(chat.name);
                chatList.appendChild(listItem);
            }
            return data
        })
        .catch((error) => {
            console.log('error', error)
        })
};

function initInterface(){
    loadChats();
    section.innerHTML="";
    section.innerHTML=signupForm;
}


window.onload = initInterface();


btn_home.addEventListener('click', async () => {
    chatList.innerHTML = "";
    const resultResponse = await loadChats();
    console.log('resultResponse', resultResponse)
});


const options = {
    method: 'POST', // выбор метода запроса
    mode: 'cors', // режим работы запроса
    headers: { // дополнительные заголовки для запроса
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": "user7", "password": "fghhgfuser123","email": "u7@u.ru" }), 
    };


const regUser = () => {
    return fetch(domain + reqPathReg, options)
        .then((response) => {return response.json()})
        .then((data) => {
            console.log('My json chats:' , data)
            return data
        })
        .catch((error) => {
            console.log('error', error)
        })
};


let statusSection = document.querySelector('.form_h3_status').firstChild.textContent
let btn_submit = document.querySelector('.btn_submit')
console.log(btn_submit)

if (statusSection == "Registration"){
    btn_submit.addEventListener('click', async () => {
        const resultResponse = await regUser();
        console.log('resultResponse', resultResponse)
    });
}





