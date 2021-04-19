let jwt = null;

function get_jwt() {
    jwt = window.localStorage.getItem('jwt');
}

get_jwt();

function log_out() {
    window.localStorage.removeItem('jwt');
    location.href = 'notification.html?message=Success! You are logged out!';
}

function get_error() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('error_message').innerHTML = params.get('message');
}

function get_notification() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('notification_message').innerHTML = params.get('message');
}

function login() {
    const form = document.forms.login_form;
    const user = {
        username: form.email.value,
        password: form.password.value,
    };
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/api/v1/auth', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400 && xhr.status < 500) location.href = 'error.html?message=400 - Wrong%20credentials';
            if (xhr.status >= 500) location.href = 'error.html?message=500';
            if (xhr.status >= 200 && xhr.status < 300) {
                window.localStorage.setItem('jwt', JSON.parse(xhr.response).access_token);
                location.href = 'notification.html?message=Success! You are logged in!';
            }
        }
    };
}

function register() {
    if (jwt != null) {
        location.href = 'error.html?message=You are already registered!';
    }
    const form = new FormData(document.forms.register_form);
    if (form.get('password') != form.get('password_submit')) location.href = 'error.html?message=Passwords are not equal!';
    const user_to_create = {
        email: form.get('email'),
        first_name: form.get('first_name'),
        last_name: form.get('last_name'),
        password: form.get('password'),
    };
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/api/v1/user', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(user_to_create));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400 && xhr.status < 500) location.href = `error.html?message=400 - ${xhr.response}`;
            if (xhr.status >= 500) {
                location.href = 'error.html?message=500';
            }
            if (xhr.status >= 200 && xhr.status < 300) location.href = 'notification.html?message=Success! Now login please :)';
        }
    };
}

function get_user() {
    if (jwt == null) {
        location.href = 'error.html?message=You are not logged in!';
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/api/v1/user', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${jwt}`);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400 && xhr.status < 500) location.href = `error.html?message=400 - ${xhr.response}`;
            if (xhr.status >= 500) {
                location.href = 'error.html?message=500';
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.response);
                const form = document.forms.user_info;
                form.email.value = data.email;
                form.first_name.value = data.first_name;
                form.last_name.value = data.last_name;
                form.roles.value = data.is_admin ? 'Admin' : 'Regular';
            }
        }
    };
}
