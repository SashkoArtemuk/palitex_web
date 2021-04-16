var jwt = null

function get_jwt(){
    jwt = window.localStorage.getItem('jwt');
}

get_jwt()


function register(){
    var form = new FormData(document.forms.register_form)
    if (form.get("password") != form.get("password_submit"))
        alert("Passwords are not equal!") // TODO: redirect to err
    user_to_create = {
        "email" : form.get("email"),
        "first_name": form.get("first_name"),
        "last_name" : form.get("last_name"),
        "password" : form.get("password"),
    }
    console.log(user_to_create) // TODO: send post request
    
}
