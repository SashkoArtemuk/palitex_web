<template>
    <div>
        <div class="modal">
            <h3>Edit user</h3>
            <div class="field">
                Email:
                <input type="text" v-model="email">
            </div>
            <div class="field">
                First name:
                <input type="text" v-model="firstName">
            </div>
            <div class="field">
                Last name:
                <input type="text" v-model="lastName">
            </div>
            <div class="field">
                Password:
                <input type="password" v-model="password">
            </div>
            <div class="field">
                Submit password:
                <input type="password"  v-model="confirmPassword">
            </div>
            <div class="field">
                Role:
                <select name="roles" v-model="isAdmin" disabled>
                    <option :value="true">Admin</option>
                    <option :value="false">Regular</option>
                </select>
            </div>
            <div class="field">
                <input
                @click="onSubmit"
                :disabled="fetchingUser || beeingUpdatedUser"
                type="submit"
                value="Save"
                >
                <input type="reset" value="Cancel">
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
import BaseNotification from '../components/base_notification.vue';
import userService from '../services/user_service';

export default {
    name: 'EditUserPage',
    components: {
        BaseNotification,
    },
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            isAdmin: false,
            uid: null,
            fetchingUser: false,
            beeingUpdatedUser: false,

            notification: '',
            isShowNotification: false,
        };
    },
    created() {
        this.fetchingUser = true;

        userService.getMyselfUser().then((response) => {
            this.email = response.data.email;
            this.firstName = response.data.first_name;
            this.lastName = response.data.last_name;
            this.isAdmin = response.data.is_admin;
            this.uid = response.data.uid;
        }).finally(() => {
            this.fetchingUser = false;
        });
    },
    methods: {
        onSubmit() {
            const hasPassword = this.password.length;
            const passwordConfirmed = this.password === this.confirmPassword;

            if (hasPassword && passwordConfirmed) {
                this.beeingUpdatedUser = true;

                userService.updateUserByUid(this.uid, {
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    isAdmin: this.isAdmin,
                    email: this.email,
                }).finally(() => {
                    this.beeingUpdatedUser = false;
                });
            } else {
                this.notification = 'Please, confirm password';
                this.isShowNotification = true;

                this.lastNotificationTimerId = setTimeout(() => {
                    clearTimeout(this.lastNotificationTimerId);

                    this.notification = '';
                    this.isShowNotification = false;
                }, 1000);
            }
        },
    },
};
</script>
