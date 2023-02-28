import { signupForm } from "./forms.js";

const domain = 'http://127.0.0.1:8000/'
let reqPathChat = 'api/v1/chat/'
let reqPathReg = 'api/v1/auth/users/'
let myRequest = domain + reqPathChat

const chatList = document.querySelector('.list_chat');
const section = document.querySelector('.section')
const btn_home = document.querySelector('.btn_home'); 

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


const statusSection = document.getElementById('form_signup');
// let statusSection = document.querySelector('.form_h3_status').firstChild.textContent;


if (statusSection){
    const form = document.getElementById('form_signup');

    form.addEventListener('submit', (event) => {
        
        event.preventDefault();
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
	    const formDataJsonString = JSON.stringify(plainFormData);

        const options = {
            method: "POST", 
            mode: 'cors', 
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formDataJsonString
        }; 

        fetch('http://127.0.0.1:8000/api/v1/auth/users/', options)
            .then((response)=>{return response.json()})
            .then((data)=>{
                console.log('My registration data', data);
                return data
            })
            .catch((error)=>{
                console.log('Happened ERROR:', error )
            })
    });

}
