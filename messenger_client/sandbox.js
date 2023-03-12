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

// style="display: none;"
// width: 80px;


{/* <img src="https://picsum.photos/40/40" alt="avatar"></img> */}

// $ redis-cli
// 127.0.0.1:6379> shutdown
// not connected> quit


// Вариант реализации через нейминг
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

// Полностью рабочий вариант
// async function postFormDataAsJson({ url, formData }) {
// 	const plainFormData = Object.fromEntries(formData.entries());
// 	const formDataJsonString = JSON.stringify(plainFormData);

// 	const fetchOptions = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Accept: "application/json",
// 		},
// 		body: formDataJsonString,
// 	};

// 	const response = await fetch(url, fetchOptions);

// 	if (!response.ok) {
// 		const errorMessage = await response.text();
// 		throw new Error(errorMessage);
// 	}

// 	return response.json();
// }

// async function handleFormSubmit(event) {
// 	event.preventDefault();

// 	const form = event.currentTarget;
// 	const url = form.action;

// 	try {
// 		const formData = new FormData(form);
// 		const responseData = await postFormDataAsJson({ url, formData });

// 		console.log({ responseData });
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// const exampleForm = document.getElementById("form_signup");
// exampleForm.addEventListener("submit", handleFormSubmit);


// export const writeChatToDB = (chat_name) =>{
//     console.log("We are into createChat");
//     const token = isAuthenticated().token;
//     const chat = fetch(domain + reqPathReg + "me/", {
//         method: "GET", 
//         mode: 'cors', 
//         headers: { 
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Token ' + token
//         },})
//         .then((response)=>{return response.json()})
//         .then((data)=>{
//             console.log("Got User from DB: ", data);
//              // готовим параметры POST запроса
//             const body = {
//                 "name": chat_name,
//                 "is_private": "false",
//                 "owner": data.id
//             }
//             console.log("Body: ", body)
           
//             const fetchOptions = {
//                 method: "POST", 
//                 mode: 'cors', 
//                 headers: { 
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Token ' + token
//                 },
//                 body: JSON.stringify(body)
//             }; 
//             const created_chat = fetch(domain + reqPathChat, fetchOptions)
//                 .then((response)=>{return response.json()})
//                 .then((response_chat)=>{
//                     console.log("Chat created: ", response_chat)
//                     return response_chat
//                 })
//                 .catch((error)=>{
//                     console.log('An ERROR has occured:', error )
//                 })
//             return created_chat;
//             })
//         .catch((error) => {
//             console.log('error', error)
//         });
//     return chat
// };