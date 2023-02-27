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




// document.forms.form_signup.onsubmit = function() {
//     let Myusername = this.input_name.value;
//     let Mypassword = this.input_password.value;
//     let Myemail = this.input_email.value;
//     console.log(Myusername);
//     console.log(Mypassword);
//     console.log(Myemail);
//     const options = {
//         method: 'POST', // выбор метода запроса
//         mode: 'cors', // режим работы запроса
//         headers: { // дополнительные заголовки для запроса
//           'Content-Type': 'application/json'
//         },
//         body: `{
//             "username": ${Myusername},
//             "password": ${Mypassword},
//             "email": ${Myemail} 
//         }`, 
//       };
//     let myRequest = "http://127.0.0.1:8000/api/v1/auth/users/";
//     console.log(myRequest)
//     return fetch(myRequest, options)
//         .then((response) => {return response.json()})
//         .then((data) => {
//             console.log('My json Register:' , data)
//             return data
//         })
//         .catch((error) => {
//             console.log('error', error)
//         })
//   };