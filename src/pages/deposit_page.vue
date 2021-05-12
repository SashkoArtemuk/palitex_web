<template>
    <div>
        <div class="modal">
            <h3>Deposit</h3>
            <div class="field">
                Select wallet:
                <select v-model="walletUid">
                    <option v-for="wallet in wallets" :key="wallet.uid" :value="wallet.uid">
                        {{ wallet.name }} (uid: {{ wallet.uid }} | funds: {{ wallet.funds}})
                    </option>
                </select>
            </div>
            <div class="field">
                Enter amount
                <input type="number" v-model="amount">
            </div>
            <div class="field">
                <input
                    @click="onSubmit"
                    type="submit"
                    value="Send"
                    :disabled="beeingReplenished || fetchingDeposits"
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
import BaseNotification from '../components/base_notification.vue';
import walletService from '../services/wallet_service';

export default {
    name: 'DepositPage',
    components: {
        BaseNotification,
    },
    data() {
        return {
            beeingReplenished: false,
            walletUid: '',
            amount: '',

            wallets: [],
            fetchingDeposits: false,

            notification: '',
            isShowNotification: false,
        };
    },
    created() {
        this.fetchingDeposits = true;

        walletService.getWallets().then((response) => {
            this.wallets = response.data;

            this.fetchingDeposits = false;
        });
    },
    methods: {
        onSubmit() {
            this.beeingReplenished = true;

            walletService.createDeposit({
                walletUid: this.walletUid,
                amount: this.amount,
            }).then(() => {
                this.notification = `Wallet with uid ${this.walletUid} replenished`;
                this.isShowNotification = true;

                this.lastNotificationTimerId = setTimeout(() => {
                    clearTimeout(this.lastNotificationTimerId);

                    this.notification = '';
                    this.isShowNotification = false;
                }, 1000);

                this.walletUid = '';
                this.amount = '';
            }).finally(() => {
                this.beeingReplenished = false;
            });
        },
    },
};
</script>
