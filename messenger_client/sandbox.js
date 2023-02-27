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


// function regUser(){
//     return fetch("http://127.0.0.1:8000/api/v1/auth/users/", options)
//         .then((response) => {return response.json()})
//         .then((data) => {
//             console.log('My json reg:' , data)
//             return data
//         })
//         .catch((error) => {
//             console.log('error', error)
//         })
// };

// const options = {
//     method: "POST", 
//     mode: 'cors', 
//     headers: { 
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"username": "user11", "password": "fghhgfuser123", "email": "u11@u.ru"})
//     };

// btn_submit.addEventListener('click', async () => {
//     const newuser = {
//     username: "user14", 
//     password: "fghhgfuser123", 
//     email: "u14@u.ru"
//     };

//     const resultResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/users/', {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newuser)
//     })
//     .then((response) => {return response.json()})
//     .then((data) => {
//         console.log('My registration json:' , data)
//         return data
//     })
//     .catch((error) => {
//         console.log('error', error)
//     })
//     console.log('resultResponse', resultResponse)
// });


// document.forms.form_signup.onsubmit = async function() {
//     let newUserName = this.input_name.value;
//     let pswd = this.input_password.value;
//     let eMail = this.input_email.value;
//     console.log(newUserName);
//     console.log(pswd);
//     console.log(eMail);

//     const newuser = {
//         username: "user13", 
//         password: "fghhgfuser123", 
//         email: "u13@u.ru"
//     };

//     let response = await fetch('http://127.0.0.1:8000/api/v1/auth/users/', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//           'Content-Type': 'application/json;'
//         },
//         body: JSON.stringify(newuser)
//       });

//     let result = await response.json();
    
//     console.log(result)
    
//     return false
//     };