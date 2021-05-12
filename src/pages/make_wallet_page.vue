<template>
    <div>
        <div class="modal">
            <h3>Make wallet</h3>
            <div class="field">
                Wallet name:
                <input type="text" v-model="walletName">
            </div>
            <div class="field">
                <input
                @click="onSubmit"
                type="submit"
                value="Make wallet"
                :disabled="beeingCreatedWallet"
                >
                <input type="reset" value="Cancel">
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
import walletService from '../services/wallet_service';
import BaseNotification from '../components/base_notification.vue';

export default {
    name: 'MakeWalletPage',
    components: {
        BaseNotification,
    },
    data() {
        return {
            walletName: '',
            beeingCreatedWallet: false,

            notification: '',
            isShowNotification: false,
        };
    },
    methods: {
        onSubmit() {
            this.beeingCreatedWallet = true;

            walletService.createWallet({ name: this.walletName }).then((response) => {
                this.notification = `Wallet ${this.walletName} with uid ${response.data.uid} created`;
                this.isShowNotification = true;

                this.lastNotificationTimerId = setTimeout(() => {
                    clearTimeout(this.lastNotificationTimerId);

                    this.notification = '';
                    this.isShowNotification = false;
                }, 1000);

                this.walletName = '';
            }).finally(() => {
                this.beeingCreatedWallet = false;
            });
        },
    },
};
</script>
