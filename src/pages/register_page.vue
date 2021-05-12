<template>
<div>
    <div class="modal">
        <h3>Sign up</h3>
        <div class="field">
            Enter your email:
            <input v-model="email" type="text">
        </div>
        <div class="field">
            Enter your username:
            <input type="text">
        </div>
        <div class="field">
            Enter your password:
            <input v-model="password" type="password">
        </div>
        <div class="field">
            Submit your password:
            <input type="password" v-model="confirmPassword">
        </div>
        <div class="field">
            Select role:
            <select name="roles" disabled>
                <option value="Admin">Admin</option>
                <option value="Regular" selected>Regular</option>
            </select>
        </div>
        <div class="field">
            <input @click="onSubmit" type="submit" value="Sign up">
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
import BaseNotification from '../components/base_notification.vue';

export default {
    name: 'RegisterPage',
	components: {
        BaseNotification,
    },
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            role: '',
			notification: '',
            isShowNotification: false,
        };
    },
    methods: {
        onSubmit() {
            const hasPassword = this.password.length;
            const passwordConfirmed = this.password === this.confirmPassword;

			if (this.password !== this.confirmPassword){
			    this.notification = 'Passwords are not equal!';
				this.isShowNotification = true;
				this.lastNotificationTimerId = setTimeout(() => {
				    clearTimeout(this.lastNotificationTimerId);
					this.notification = '';
					this.isShowNotification = false;
				}, 1000);
				return Promise.reject(error);
			}
            if (hasPassword && passwordConfirmed) {
                userService.registerUser({
                    email: this.email,
                    password: this.password,
                    firstName: 'first_name',
                    lastName: 'last_name',
                }).then(() => {
                    this.$router.push('/login');
                });
            }
        },
        onCancel() {
            this.email = '';
            this.password = '';
        },
    },
};
</script>
