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
let route = 'api/v1/chat/'
const htmlStr = domain + route

const btn = document.querySelector('.btn_signup');

const useRequest = () => {
    return fetch(htmlStr)
        .then((response) => {
            console.log('Got Response', response);
            return response.json();
        })
        .then((json) => {
            return json
        })
        .catch((error) => {
            console.assertlog('error', error)
        })
}

btn.addEventListener('click', async() => {    
    const reqResult = await useRequest();
    console.log('reqResult', reqResult)
})

