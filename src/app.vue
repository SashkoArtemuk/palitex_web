<template>
  <div id="app">
    <the-header :isAuthenticated="isAuthenticated" />
    <router-view />
    <base-notification
        v-show="isShowNotification"
        type="error"
    >
        {{ notification }}
    </base-notification>
  </div>
</template>

<script>
import TheHeader from './components/the_header.vue';
import BaseNotification from './components/base_notification.vue';
import apiService, { setToken } from './services/api_service';

const bearerToken = localStorage.getItem('auth_bearer');
const hasBearerToken = bearerToken !== null;

if (hasBearerToken) {
    setToken(bearerToken);
}

export default {
    components: {
        TheHeader,
        BaseNotification,
    },
    data() {
        return {
            isAuthenticated: hasBearerToken,

            notification: '',
            isShowNotification: false,
        };
    },
    created() {
        this.$root.$on('changeAuthStatus', this.onChangeAuthStatus);

        apiService.interceptors.response.use(null, (error) => {
            this.notification = error.response.data.message;
            this.isShowNotification = true;

            this.lastNotificationTimerId = setTimeout(() => {
                clearTimeout(this.lastNotificationTimerId);

                this.notification = '';
                this.isShowNotification = false;
            }, 1000);

            return Promise.reject(error);
        });
    },
    beforeDestroy() {
        this.$root.$off('changeAuthStatus', this.onChangeAuthStatus);
    },
    methods: {
        onChangeAuthStatus(value) {
            this.isAuthenticated = value;
        },
    },
};
</script>

<style lang="scss" src="./assets/styles.scss" />
