<template>
    <div>
        <div class="modal">
            <h3>Delete user</h3>
            <div class="field">
                Are you sure you want to delete user?
                <input type="text" disabled :value="email">
            </div>
            <div class="field">
                <input
                @click="onDeleteMyself"
                type="submit"
                :disabled="fetchingUser || beeinDeleted"
                value="Yes">
                <input type="reset" value="No">
            </div>
        </div>
        <base-notification
            v-show="isShowNotification"
            type="info"
        >
            {{ notification }}
        </base-notification>
    </div>
</template>

<script>
import BaseNotification from '../components/base_notification.vue';
import userService from '../services/user_service';
import { removeToken } from '../services/api_service';

export default {
    name: 'DeleteUserPage',
    components: {
        BaseNotification,
    },
    data() {
        return {
            fetchingUser: false,
            beeinDeleted: false,
            email: '',
            uid: null,

            notification: '',
            isShowNotification: false,
        };
    },
    created() {
        this.fetchingUser = true;

        userService.getMyselfUser().then((response) => {
            this.email = response.data.email;
            this.uid = response.data.uid;
        }).finally(() => {
            this.fetchingUser = false;
        });
    },
    methods: {
        onDeleteMyself() {
            this.beeinDeleted = true;

            userService.deleteUserByUid(this.uid).then(() => {
                this.notification = 'User deleted';
                this.isShowNotification = true;

                this.lastNotificationTimerId = setTimeout(() => {
                    clearTimeout(this.lastNotificationTimerId);

                    this.notification = '';
                    this.isShowNotification = false;
                }, 1000);

                this.$root.$emit('changeAuthStatus', false);

                removeToken();

                this.$router.push('/');
            }).finally(() => {
                this.beeinDeleted = false;
            });
        },
    },
};
</script>
