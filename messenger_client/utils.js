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
                // let fullWsUri = `${wsUri}chat_${chat.id}'/'`;
                let fullWsUri = "#";
                listItem.innerHTML = `<a href=${fullWsUri} id="btn_chat_${chat.id}">${chat.name}</a>`
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


export const getChatFromDB = (chat_id) =>{
    console.log("We are into getChatFromDB");
    const user = isAuthenticated();
    
    const fetchOptions = {
        method: "GET", 
        mode: 'cors', 
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + user.token
        },
    }; 

    const chat = fetch(domain + reqPathChat + chat_id + "/", fetchOptions)
        .then((response)=>{return response.json()})
        .then((response_chat)=>{
            console.log("Chat found: ", response_chat)
            return response_chat
        })
        .catch((error)=>{
            console.log('Chat NOT found, an ERROR has occured:', error )
        })
    return chat
};


export function loadChatMembers(cur_chat){
    console.log("We are into loadChatMembers");
    console.log("CHAT_ID", cur_chat.id)
    return fetch(domain + reqPathChat + cur_chat.id + '/participant/')
    // return fetch(domain + reqPathChat + '1' + '/participant/')
        .then((response) => {return response.json()})
        .then((data) => {
            console.log('My json Members:' , data)
            for (const member of data){
                const listItem = document.createElement('li');
                listItem.setAttribute("class", "sidebar_li");
                // listItem.append(chat.name);
                let fullWsUri = "#";
                listItem.innerHTML = `<a href=${fullWsUri} id="btn_sb_${member.username}">${member.username}</a>`
                chatList.appendChild(listItem);
            }
            return data
        })
        .catch((error) => {
            console.log('error', error)
        });
};

export function delChatInDB(chat){
    console.log("We will delete chat....", chat)
    const user = isAuthenticated();
    const fetchOptions = {
        method: "DELETE", 
        mode: 'cors', 
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + user.token
        },
    }; 

    const status_del = fetch(domain + reqPathChat + chat.id + '/delete/', fetchOptions)
        .then((response)=>{
            // console.log("Status delete chat into FUNC:", response.status )
            return response.status
        })
        .catch((error) => {
            console.log('Occiried error when attempt to delete CHAT', error)
        });

    return status_del
};