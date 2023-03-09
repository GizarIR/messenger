import {
    domain, reqPathChat, reqPathReg, reqPathLogin, reqPathSetUsername,
    chatList, section, btn_home, btn_login, btn_create, btn_del, btn_leave, btn_profile, sidebar,
    wsUri
} from "./init.js";


export function isAuthenticated(){
    let user = JSON.parse(localStorage.getItem('messenger_user'));
    return  user ? user : false
};


export function getUserDB(token){
    return fetch(domain + reqPathReg + "me/", {
        method: "GET", 
        mode: 'cors', 
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },})
        .then((response)=>{return response.json()})
        .then((data)=>{
            console.log("Got User from DB: ", data);
            return data;
        })
        .catch((error) => {
            console.log('error', error)
        })
};

export const loadChats = () => {
    chatList.innerHTML = "";
    return fetch(domain + reqPathChat)
        .then((response) => {return response.json()})
        .then((data) => {
            // console.log('My json chats:' , data)
            for (const chat of data){
                const listItem = document.createElement('li');
                listItem.setAttribute("class", "sidebar_li");
                // listItem.append(chat.name);
                let fullWsUri = `${wsUri}chat_${chat.id}'/'`;
                listItem.innerHTML = `<a href=${fullWsUri} id="btn_sb_${chat.id}">${chat.name}</a>`
                chatList.appendChild(listItem);
            }
            return data
        })
        .catch((error) => {
            console.log('error', error)
        });
};



export const writeChatToDB = (chat_name) =>{
    console.log("We are into createChat");
    const user = isAuthenticated();
    const body = {
        "name": chat_name,
        "is_private": "false",
        "owner": user.id
    }
    console.log("Body: ", body)
    
    const fetchOptions = {
        method: "POST", 
        mode: 'cors', 
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + user.token
        },
        body: JSON.stringify(body)
    }; 
    const created_chat = fetch(domain + reqPathChat, fetchOptions)
        .then((response)=>{return response.json()})
        .then((response_chat)=>{
            console.log("Chat created: ", response_chat)
            return response_chat
        })
        .catch((error)=>{
            console.log('An ERROR has occured:', error )
        })
    return created_chat
};

export function loadChatMembers(){
    console.log("We are into loadChatMembers");
    loadChats() //заглушка - здесь должен быть фетч и обработка списка пользователей
};