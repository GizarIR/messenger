import { signupForm, profileForm } from "./forms.js";

const domain = 'http://127.0.0.1:8000/';
const reqPathChat = 'api/v1/chat/';
const reqPathReg = 'api/v1/auth/users/';
const reqPathLogin = 'auth/token/login/';

const chatList = document.querySelector('.list_chat');
const section = document.querySelector('.section')
const btn_home = document.querySelector('.btn_home'); 
const btn_login = document.querySelector('.btn_login'); 


const loadChats = () => {
    return fetch(domain + reqPathChat)
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


const statusSection = document.querySelector("form");
// let statusSection = document.querySelector('.form_h3_status').firstChild.textContent;


if (statusSection.id == "form_signup"){
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
                    localStorage.setItem(userForLogin.username, dataToken.auth_token);
                    return true
                })
                .catch((error)=>{
                    console.log('An ERROR has occured:', error )
                    return false
                });
        };

        // Если получили доступ, то загружаем форму профиля
        if(accessAccept){
            section.innerHTML="";
            section.innerHTML=profileForm;
            btn_login.textContent = newuser.username + "/logout";
            document.forms.form_profile.username.value = newuser.username;
            // console.log(newuser.username)
            document.forms.form_profile.email.value = newuser.email;
        }
    }); //addEventListener callback
} //if statusSection - form_signup - дальше лучше использовать switch - case
