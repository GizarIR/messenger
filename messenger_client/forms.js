export const signupForm = `
<form class="form" id="form_signup">
    <h3 class="form_h3_title form_h3_status">Registration</h3>
    <label class="label">
        <span class="label__title">User:</span>
        <input class="label__input" name="username" type="text" placeholder="Name" required>
    </label>
    <label class="label">
        <span class="label__title">Password:</span>
        <input class="label__input" name="password" type="password" placeholder="Password" required>
    </label>
    <label class="label">
        <span class="label__title">Email:</span>
        <input class="label__input" name="email" type="email" placeholder="Email" required>
    </label>
    <button class="form__submit btn_submit">Sign up</button>
</form>
`

export const profileForm =`
<form class="form" id="form_profile">
    <h3 class="form_h3_title form_h3_status">Your profile</h3>
    <label class="label">
        <span class="label__title">Username:</span>
        <input class="label__input" name="username" type="text" placeholder="Name" required>
    </label>
    <label class="label">
        <span class="label__title">Avatar:</span>
        <input class="label__input" name="password" type="file">
    </label>
    <label class="label">
        <span class="label__title">Email:</span>
        <input class="label__input" name="email" type="email" placeholder="Email" required>
    </label>
    <button class="form__submit btn_submit">Submit</button>
</form>
`

export const chatForm = `
    <h3 class="form_h3_title form_h3_status">Chat</h3>
    <div class="label_chat_name" id="chat_name">Here chat name</div>
    <textarea id="chat-log" cols="50" rows="20"></textarea><br>
    <input id="chat-message-input" type="text" size="50"><br>
    <input id="chat-message-submit" type="button" value="Send">
`

export const loginForm = `
<form class="form" id="form_login">
    <h3 class="form_h3_title form_h3_status">Login</h3>
    <label class="label">
        <span class="label__title">User:</span>
        <input class="label__input" name="username" type="text" placeholder="Name" required>
    </label>
    <label class="label">
        <span class="label__title">Password:</span>
        <input class="label__input" name="password" type="password" placeholder="Password" required>
    </label>
    <button class="form__submit btn_submit">Sign in</button>
</form>
`
export const createChatForm = `
<form class="form" id="form_create_chat">
    <h3 class="form_h3_title form_h3_status">Enter name of new chat</h3>
    <label class="label">
        <span class="label__title">Name:</span>
        <input class="label__input" name="chatname" type="text" placeholder="Name" required>
    </label>
    <button class="form__submit btn_submit">Create</button>
</form>
`