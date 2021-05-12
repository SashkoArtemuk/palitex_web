<template>
	<div>
    <div class="modal">
        <h3>Log in</h3>
        <div class="field">
            Enter your email:
            <input v-model="email" type="text">
        </div>
        <div class="field">
            Enter your password:
            <input v-model="password" type="password">
        </div>
        <div class="field">
            <input @click="onSubmit" type="submit" value="Log in">
            <input @click="onCancel" type="reset" value="Cancel">
        </div>
    </div>
	<base-notification
            v-show="isShowNotification"
            type="error"
        >
            {{ notification }}
        </base-notification>
	</div>
</template>

<script>
import userService from '../services/user_service';
import { setToken } from '../services/api_service';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        onSubmit() {
            userService.authUser({
                email: this.email,
                password: this.password,
            }).then((response) => {
                setToken(response.data.access_token);

                this.$root.$emit('changeAuthStatus', true);

                this.$router.push('/');
            });
        },
        onCancel() {
            this.email = '';
            this.password = '';
        },
    },
};
</script>
