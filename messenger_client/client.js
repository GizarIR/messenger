import { signupForm, profileForm, chatForm } from "./forms.js";

const domain = 'http://127.0.0.1:8000/';
const reqPathChat = 'api/v1/chat/';
const reqPathReg = 'api/v1/auth/users/';
const reqPathLogin = 'auth/token/login/';



const chatList = document.querySelector('.list_chat');
const section = document.querySelector('.section')
const btn_home = document.querySelector('.btn_home'); 
const btn_login = document.querySelector('.btn_login');
const btn_create = document.querySelector('.btn_create'); 
const btn_close = document.querySelector('.btn_close');
// const btn_send = document.querySelector('.btn_send');
let statusSection;

const lbl_status_connect = document.getElementById('status_connect');
const wsUri = 'ws://' + window.location.host + '/ws/chat/'
let websocket;

const loadChats = () => {
    chatList.innerHTML = "";
    return fetch(domain + reqPathChat)
        .then((response) => {return response.json()})
        .then((data) => {
            // console.log('My json chats:' , data)
            for (const chat of data){
                const listItem = document.createElement('li');
                listItem.setAttribute("class", "sidebar_li");
                // listItem.append(chat.name);
                let fullWsUri = `${wsUri} + 'chat_' + ${chat.id} + '/'`;
                listItem.innerHTML = `<a href=${fullWsUri} id="btn_sb_${chat.id}">${chat.name}</a>`
                chatList.appendChild(listItem);
            }
            return data
        })
        .catch((error) => {
            console.log('error', error)
        })
};

function isAuthenticated(){
    let user = JSON.parse(localStorage.getItem('messenger_user'));
    return  user ? user : false
};


function showProfileForm(cur_user){
    section.innerHTML="";
    section.innerHTML=profileForm;
    btn_login.textContent = cur_user.username + "/logout";
    document.forms.form_profile.username.value = cur_user.username;
    // console.log(newuser.username)
    document.forms.form_profile.email.value = cur_user.email;
};


async function initInterface(){
    await loadChats();
    section.innerHTML = signupForm;
    handleSignupForm();
    let cur_user = isAuthenticated();
    if (cur_user){
        showProfileForm(cur_user);
    }
    // const statusSection = document.querySelector("form");
    statusSection = document.querySelector('.form_h3_status').firstChild.textContent;
    console.log(statusSection)
};

window.onload = initInterface();


async function showInterface(){
    let cur_user = isAuthenticated();

    const resultResponse = await loadChats();
    console.log('resultResponse', resultResponse)

    statusSection = document.querySelector('.form_h3_status').firstChild.textContent;
    console.log(statusSection);

    if (statusSection === "Registration"){
        handleSignupForm();
    };


    if(statusSection == "Your profile"){
        console.log("Here should be handle Submit button Profile form") // TODO - create handler for Submit's button Profile form
    };//  if(statusSection.id == "form_profile")

    if(statusSection == "Chat"){
        handleChatForm();
    };

};


btn_home.addEventListener('click', () => {
    section.innerHTML = profileForm;
    showInterface();
});


btn_login.addEventListener('click', ()=>{
    localStorage.clear();
    section.innerHTML = signupForm;
    showInterface();
    btn_login.textContent = "Log in";
});


btn_create.addEventListener('click', ()=>{
    section.innerHTML = chatForm;
    showInterface();
    
    function writeToScreen(message){
        let pre = document.createElement("p");
        pre.setAttribute("overflow-wrap", "break-word");
        pre.innerHTML = message;
        section.appendChild(pre);
    };

    const user = JSON.parse(localStorage.getItem("messenger_user"));
    console.log('GOT TOKEN FOR WEBSOCKET: ' + user.token)

    // websocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/lobby/?token=6b50ca89f721f48d8b20b114a347df728399d3b0');
    // websocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/lobby/');
    websocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/lobby/?token=' + user.token);
    // console.log(websocket);

    websocket.onopen = function(event){
        lbl_status_connect.setAttribute("color","green");
        lbl_status_connect.textContent = "CONNECTED";
    };

    websocket.onclose = function(event){
        lbl_status_connect.setAttribute("color","red");
        lbl_status_connect.textContent = "DISCONNECTED";
    };

    websocket.onmessage = function(event){
        // writeToScreen('<span style="color: blue;">RESPONSE: ' + event.data + '</span>');
        const data = JSON.parse(event.data);
        document.querySelector('#chat-log').value += (data.message + '\n');
    };

    websocket.onerror = function(event){
        writeToScreen('<span style="color: red;">ERROR:</span> ' + event.data);
    };
});

btn_close.addEventListener('click', ()=>{
    websocket.close();
    websocket = null;
});


function handleSignupForm(){
    console.log('We are into Registration form')
    const form = document.getElementById('form_signup');
    // console.log(statusSection.id)
    form.addEventListener('submit', async (event) => {        
        event.preventDefault(); //отключаем поведение формы по умолчанию
        const formData = new FormData(form); //создаем объект для обработки данных формы
        //получаем данные в виде пары ключ:значение, в форме input name - ключ, value - значение 
        const plainFormData = Object.fromEntries(formData.entries()); //в виде текста
	    const formDataJsonString = JSON.stringify(plainFormData); //преобразуем в json
        const newuser = JSON.parse(formDataJsonString);

        // готовим параметры POST запроса
        const fetchOptions = {
            method: "POST", 
            mode: 'cors', 
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formDataJsonString
        }; 

        //отправляем асинхроныый запрос для созданияпользователя на 'http://127.0.0.1:8000/api/v1/auth/users/'
        const regData = await fetch(domain + reqPathReg, fetchOptions)
            .then((response)=>{return response.json()})
            .then((data)=>{
                console.log('Registration data recieved:', data);
                return data
            })
            .catch((error)=>{
                console.log('An ERROR has occured:', error )
            })

        //Готовим данные для следующего запроса 
        const userForLogin = {
            "username":newuser.username,
            "password":newuser.password
        };
        fetchOptions.body = JSON.stringify(userForLogin);
        let accessAccept = false;

        // Если получили ID, то логинимся и сохраняем токен в локальное хранилище
        if (regData.id){
            accessAccept = await fetch(domain + reqPathLogin, fetchOptions)
                .then((response)=>{return response.json()})
                .then((dataToken)=>{
                    console.log('Token recieved:', dataToken.auth_token);
                    localStorage.clear();
                    localStorage.setItem("messenger_user", `{
                        "username": "${userForLogin.username}",
                        "token": "${dataToken.auth_token}",
                        "email": "${newuser.email}"
                    }`);
                    return true
                })
                .catch((error)=>{
                    console.log('An ERROR has occured:', error )
                    return false
                });
        };

        // Если получили доступ, то загружаем форму профиля
        if(accessAccept){
            showProfileForm(newuser);
        }
    }); //addEventListener callback
};


function handleChatForm(){
    // далее идет обработка функционала Websocket
    console.log('We are into interface of chat');
    const btn_send = document.getElementById('chat-message-submit');
    const input_message = document.getElementById('chat-message-input');

    // const wsUri = 'ws://' + window.location.host + '/ws/chat/' + 'lobby/'


    input_message.focus();
    input_message.onkeyup = function(e){
        // console.log('Kere code', e.code );
        if (e.code === "Enter") {  // enter, return
        btn_send.click();
        }
    };
    
    btn_send.onclick = function(event){
        const message = input_message.value;
        // console.log(message)
        websocket.send(JSON.stringify({
            'message': message
        }));
        input_message.value = '';
    };

};
