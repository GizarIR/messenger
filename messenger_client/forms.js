export const signupForm = `
<form action="http://127.0.0.1:8000/api/v1/auth/users/" class="form" name="form_signup" id="form">
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