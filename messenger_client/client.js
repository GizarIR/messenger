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

const regUser = () => {
    return fetch(domain+reqPathReg, options)
        .then((response) => {return response.json()})
        .then((data) => {
            // console.log('My json:' , data)
            return data
        })
        .catch((error) => {
            console.log('error', error)
        })
};


let statusSection = document.querySelector('.form_h3_status').firstChild.textContent
// let btn_submit = document.querySelector('.btn_submit')
// console.log(btn_submit)

if (statusSection == "Registration"){
    document.forms.form_signup.onsubmit = function() {
        let username = this.input_name.value;
        let password = this.input_password.value;
        let email = this.input_email.value;
        console.log(username)
        console.log(password)
        console.log(email)
        return false;
      };

}





