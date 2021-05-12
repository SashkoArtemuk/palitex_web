<template>
    <div>
        <div class="modal">
            <h3>Make transaction</h3>
            <div class="field">
                From wallet:
                <select v-model="fromWalletUid">
                    <option v-for="wallet in wallets" :key="wallet.uid" :value="wallet.uid">
                        {{ wallet.name }} (uid: {{ wallet.uid }} | funds: {{ wallet.funds}})
                    </option>
                </select>
            </div>
            <div class="field">
                To wallet uid:
                <input type="text" v-model="toWalletUid">
            </div>
            <div class="field">
                Enter amount
                <input type="number" v-model="amount">
            </div>
            <div class="field">
                <input @click="onSubmit" type="submit" value="Send" :disabled="beeingReplenished">
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
    name: 'MakeTransactionPage',
    components: {
        BaseNotification,
    },
    data() {
        return {
            beeingReplenished: false,
            toWalletUid: '',
            fromWalletUid: '',
            amount: '',

            wallets: [],

            notification: '',
            isShowNotification: false,
        };
    },
    created() {
        walletService.getWallets().then((response) => {
            this.wallets = response.data;
        });
    },
    methods: {
        onSubmit() {
            this.beeingReplenished = true;

            walletService.sendFunds({
                toWalletUid: this.toWalletUid,
                fromWalletUid: this.fromWalletUid,
                amount: this.amount,
            }).then(() => {
                this.notification = `Wallet with uid ${this.toWalletUid} replenished`;
                this.isShowNotification = true;

                this.lastNotificationTimerId = setTimeout(() => {
                    clearTimeout(this.lastNotificationTimerId);

                    this.notification = '';
                    this.isShowNotification = false;
                }, 1000);

                this.toWalletUid = '';
                this.amount = '';
            }).finally(() => {
                this.beeingReplenished = false;
            });
        },
    },
};
</script>
