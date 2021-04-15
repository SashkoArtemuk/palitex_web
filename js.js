function login(){
    form = document.forms.login_form,
    user = {
        "login":form.email.value,
        "email":form.email.value,
        "pass":form.password.value,
    }
    console.log(user);
    let response = fetch("http://127.0.0.1:5000/api/v1/auth/",{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(user)
    })
}
