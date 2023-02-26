// JSON.stringify() — преобразует объект JavaScript в строку JSON.
// JSON.parse() — преобразует JSON в объект JavaScript.

// localStorage данные не удаляются даже после закрытия браузера 
// (можно хранить токены и последние сообщения пользователя) 

// localStorage.setItem('myKey', 'myValue');
// let myKey = localStorage.getItem('myKey');
// const jsonString = `
// {
//   "book": "Harry Potter"
// }
// `;
// localStorage.setItem('myJSON', jsonString);
// const myJSON = localStorage.getItem('myJSON');
// // Выводим сразу как объект
// console.log('3. myJSON', JSON.parse(myJSON));
// localStorage.removeItem('myJSON');
// localStorage.clear();

// const options = {
//     method: 'GET', // выбор метода запроса
//     mode: 'cors', // режим работы запроса
//     headers: { // дополнительные заголовки для запроса
//       'Content-Type': 'application/json'
//     },
//     // body: 'body', // тело запроса
//     // и тд
//   }
// fetch('https://picsum.photos/v2/list/?limit=5', options)




const domain = 'http://127.0.0.1:8000/'
let reqPath = 'api/v1/chat/'
const myRequest = domain + reqPath

const chatList = document.querySelector('.list_chat') 

const loadChats = () => {
    return fetch(myRequest)
        .then((response) => {return response.json()})
        .then((data) => {
            // console.log('My json:' , data)
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

window.onload = loadChats()

const btn = document.querySelector('.btn_home');

btn.addEventListener('click', async () => {
    chatList.innerHTML = "";
    const resultResponse = await loadChats();
    console.log('resultResponse', resultResponse)
});


