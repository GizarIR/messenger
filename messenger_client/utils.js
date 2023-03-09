import {
    domain, reqPathChat, reqPathReg, reqPathLogin, reqPathSetUsername,
    chatList, section, btn_home, btn_login, btn_create, btn_del, btn_leave, btn_profile, sidebar,
    wsUri
} from "./init.js";


export function isAuthenticated(){
    let user = JSON.parse(localStorage.getItem('messenger_user'));
    return  user ? user : false
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
                let fullWsUri = `${wsUri} + 'chat_' + ${chat.id} + '/'`;
                listItem.innerHTML = `<a href=${fullWsUri} id="btn_sb_${chat.id}">${chat.name}</a>`
                chatList.appendChild(listItem);
            }
            return data
        })
        .catch((error) => {
            console.log('error', error)
        });
};



export const createChat = (chat_name) =>{
    console.log("We are into createChat");
    const fetchOption = {};
    return 
};