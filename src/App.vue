<template>
  <div id="app">
    <the-header :isAuthenticated="isAuthenticated" />
    <router-view />
  </div>
</template>

<script>
import TheHeader from './components/the_header.vue';
import { setToken } from './services/api_service';

const bearerToken = localStorage.getItem('auth_bearer');
const hasBearerToken = bearerToken !== null;

if (hasBearerToken) {
    setToken(bearerToken);
}

export default {
    components: {
        TheHeader,
    },
    data() {
        return {
            isAuthenticated: hasBearerToken,
        };
    },
    created() {
        this.$root.$on('changeAuthStatus', this.onChangeAuthStatus);
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
