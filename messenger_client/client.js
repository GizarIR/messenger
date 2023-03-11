import { signupForm, profileForm, chatForm, loginForm, createChatForm} from "./forms.js";
import { 
    isAuthenticated, writeChatToDB, getChatFromDB, loadChats, loadChatMembers, delChatInDB , 
    addParticipantToChatDB, isParticipant
} from "./utils.js";
import {
    domain, reqPathChat, reqPathReg, reqPathLogin, reqPathSetUsername,
    chatList, section, btn_home, btn_login, btn_create, btn_del, btn_leave, btn_profile, sidebar,
    wsUri
} from "./init.js";

let statusSection;
const lbl_status_connect = document.getElementById('status_connect');
let cur_chat;
let websocket;


async function initInterface(){
    let cur_user = isAuthenticated();
    if (cur_user){
        handleProfileForm(cur_user);
    } else {
        // sidebar.style.width = "80px";
        section.innerHTML = signupForm;
        handleSignupForm();    
    }
    console.log("Сработало window.onload")
};

window.onload = initInterface();


function showInterface(){
    let cur_user = isAuthenticated();
    statusSection = document.querySelector('.form_h3_status').firstChild.textContent;
    console.log(statusSection);

    if (statusSection === "Registration"){
         handleSignupForm();
    };

    if (statusSection == "Login"){
          handleLoginForm();
    };

    if(statusSection == "Your profile"){
          handleProfileForm(cur_user);
    };

    // if(statusSection == "Enter name of new chat"){
    //     await handleCreateChatForm();
    // };

    if(statusSection == "Chat"){
        handleChatForm();
    };
};


btn_home.addEventListener('click', () => {
    if (websocket){
        const user = isAuthenticated();
        websocket.send(JSON.stringify({
            "message": `User: ${user.username} leaved chat...`
        }));
        websocket.close();
        websocket = null;
    };
    section.innerHTML = profileForm;
    showInterface();
});


btn_profile.addEventListener('click', () => {
    if (websocket){
        const user = isAuthenticated();
        websocket.send(JSON.stringify({
            "message": `User: ${user.username} leaved chat...`
        }));
        websocket.close();
        websocket = null;
    };
    section.innerHTML = profileForm;
    showInterface();
});


btn_login.addEventListener('click', ()=>{
    if (isAuthenticated()){
        localStorage.clear();
        // websocket.close();
        // websocket = null;
        section.innerHTML = signupForm;
        btn_login.textContent = "Log in";
        showInterface();
    } else {
        section.innerHTML = loginForm;
        showInterface();
    }

});


btn_create.addEventListener('click', ()=>{
    console.log("We are into Create Chat form")
    section.innerHTML = createChatForm;
    const form = document.getElementById('form_create_chat');

    btn_home.style.visibility = "visible";
    btn_create.style.visibility = "visible";
    btn_leave.style.visibility = "hidden";
    btn_del.style.visibility = "hidden";
    btn_profile.style.visibility = "visible";

    // console.log(statusSection.id)
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); //отключаем поведение формы по умолчанию
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
	    const formDataJsonString = JSON.stringify(plainFormData); 
        console.log("formDataJsonString :" + formDataJsonString);
        cur_chat = await writeChatToDB(plainFormData.chatname);
        handleConnectToChat(cur_chat.name);
    });  
});


btn_del.addEventListener('click', async (event)=>{
    // console.log("We are deleting chat....", cur_chat)
    websocket.send(JSON.stringify({
        'message': `Message for all. Owner deleted chat...`
    }));
    const status_del = await delChatInDB(cur_chat);
    console.log("Status deleting: ", status_del)
    websocket.close();
    websocket = null;
    section.innerHTML = profileForm;
    showInterface();
}); 


btn_leave.addEventListener('click', ()=>{
    const user = isAuthenticated();
    websocket.send(JSON.stringify({
        "message": `User: ${user.username} leaved chat...`
    }));
    websocket.close();
    websocket = null;
    section.innerHTML = profileForm;
    showInterface();
});


// Это обработка создания непострественно комнаты чата - должна запускаться сразу после того как станет понятно имя Чата
async function handleConnectToChat(chat_name){
    
    section.innerHTML = chatForm;
    showInterface();
    btn_home.style.visibility = "visible";
    btn_create.style.visibility = "visible";
    btn_leave.style.visibility = "visible";
    btn_del.style.visibility = "visible";
    btn_profile.style.visibility = "visible";

    document.querySelector("#chat_name").textContent = "Chat's name: " + chat_name;

    function writeToScreen(message){
        let pre = document.createElement("p");
        pre.setAttribute("overflow-wrap", "break-word");
        pre.innerHTML = message;
        section.appendChild(pre);
    };

    const user = JSON.parse(localStorage.getItem("messenger_user"));
    console.log('GOT TOKEN FOR WEBSOCKET: ' + user.token)


    websocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + cur_chat.id + '/?token=' + user.token);

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
};


function addHandleToBtnChat(){
    for (let i = 0; i < chatList.children.length; i++){
        chatList.children[i].addEventListener('click',async ()=>{
            const chat_id = chatList.children[i].firstChild.id.match(/\d/g).join('')
            console.log('Found chatID: ', chat_id);
            cur_chat = await getChatFromDB(chat_id);
            const user = isAuthenticated();
            const is_participant = await isParticipant(user, cur_chat)
            if (!is_participant){
                await addParticipantToChatDB(user, cur_chat);
            }
            handleConnectToChat(cur_chat.name);
        });
    };
};


async function handleProfileForm(cur_user){
    console.log('We are into Profile form')
    section.innerHTML="";
    
    await loadChats();
    await addHandleToBtnChat();

    btn_home.style.visibility = "visible";
    btn_create.style.visibility = "visible";
    btn_leave.style.visibility = "hidden";
    btn_del.style.visibility = "hidden";
    btn_profile.style.visibility = "hidden";

    section.innerHTML=profileForm;
    btn_login.textContent = cur_user.username + "/logout";
    document.forms.form_profile.username.value = cur_user.username;
    document.forms.form_profile.email.value = cur_user.email;
};


function handleSignupForm(){
    console.log('We are into Registration form')
    const form = document.getElementById('form_signup');
    btn_home.style.visibility = "hidden";
    btn_create.style.visibility = "hidden";
    btn_leave.style.visibility = "hidden";
    btn_del.style.visibility = "hidden";
    btn_profile.style.visibility = "hidden"; 
    chatList.innerHTML="";
    
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
            handleProfileForm(newuser);
        }
    }); //addEventListener callback
};


function handleLoginForm(){
    console.log('We are into Login form')
    const form = document.getElementById('form_login');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); //отключаем поведение формы по умолчанию
        const formData = new FormData(form); //создаем объект для обработки данных формы
        //получаем данные в виде пары ключ:значение, в форме input name - ключ, value - значение
        const plainFormData = Object.fromEntries(formData.entries()); //в виде текста
	    const formDataJsonString = JSON.stringify(plainFormData); //преобразуем в json
        console.log("formDataJsonString :" + formDataJsonString);
        const cur_user = JSON.parse(formDataJsonString);

        // готовим параметры POST запроса

        const userForLogin = {
            "username":cur_user.username,
            "password":cur_user.password
        };

        const fetchOptions = {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForLogin)
        };

        let tokenAccept = null;

        tokenAccept = await fetch(domain + reqPathLogin, fetchOptions)
            .then((response)=>{return response.json()})
            .then((dataToken)=>{
                console.log('Token recieved:', dataToken.auth_token);
                return dataToken.auth_token
            })
            .catch((error)=>{
                console.log('An ERROR has occurred:', error )
                return false
            });

        // Если получили доступ, то загружаем форму профиля
        if(tokenAccept){

            const fetchOptions = {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + tokenAccept
                }
            };

            let userFromResponse = await fetch(domain + reqPathReg + 'me/', fetchOptions)
                .then((response)=>{return response.json()})
                .then((dataUser)=>{
                    console.log('User received:', dataUser);
                    localStorage.clear();
                    localStorage.setItem("messenger_user", `{
                        "username": "${dataUser.username}",
                        "token": "${tokenAccept}",
                        "email": "${dataUser.email}",
                        "id": "${dataUser.id}"
                    }`);
                    return dataUser
                })
                .catch((error)=>{
                    console.log('An ERROR has occurred:', error )
                    return false
                });

            handleProfileForm(userFromResponse);

        };
    });
};

async function handleChatForm(){
    console.log('We are into interface of chat');
    //обработка навигации 
    // обработка Чата
    const btn_send = document.getElementById('chat-message-submit');
    const input_message = document.getElementById('chat-message-input');

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

    chatList.innerHTML="";
    loadChatMembers(cur_chat);

};
