import apiService from './api_service';

function authUser({ email, password }) {
    return apiService.post('/auth', { username: email, password });
}

function registerUser({
    email, password, firstName, lastName,
}) {
    return apiService.post('/user', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
    });
}

function getMyselfUser() {
    return apiService.get('/user');
}

function updateUserByUid(
    uid,
    {
        password, firstName, lastName, email, // isAdmin
    },
) {
    return apiService.put(`/user/${uid}`, {
        password, email, first_name: firstName, last_name: lastName, // is_admin: isAdmin,
    });
}

function deleteUserByUid(uid) {
    return apiService.delete(`/user/${uid}`);
}

export default {
    authUser,
    registerUser,
    getMyselfUser,
    updateUserByUid,
    deleteUserByUid,
};
