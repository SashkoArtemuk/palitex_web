<template>
    <div class="info">
        <h3>User info</h3>
        <div>
            Email:
            <input type="text" disabled :value="email">
        </div>
        <div>
            First name:
            <input type="text" disabled :value="firstName">
        </div>
        <div>
            Last name:
            <input type="text" disabled :value="lastName">
        </div>
        <div>
            Role:
            <select name="roles" disabled v-model="isAdmin">
                <option :value="true">Admin</option>
                <option :value="false">Regular</option>
            </select>
        </div>
        <div>
            Ballance:
            <input type="text" disabled :value="balance">
        </div>
        <div>
            Transactions by wallet
            <select v-model="selWallet" @change="onSelectWallet">
                <option v-for="wallet in wallets" :key="wallet.uid" :value="wallet.uid">
                    {{ wallet.name }} (uid: {{ wallet.uid }} | funds: {{ wallet.funds}})
                </option>
            </select>
            <table border="1" id="transactions">
                <tr>
                    <td>datetime</td>
                    <td>amount</td>
                    <td>sender uid</td>
                    <td>receiver uid</td>
                </tr>
                <tr v-for="transaction in transactions" :key="transaction.uid">
                    <td>{{ UtcFromIso(transaction.datetime) }}</td>
                    <td>{{ transaction.amount }}</td>
                    <td>{{ transaction.from_wallet }}</td>
                    <td>{{ transaction.to_wallet }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import userService from '../services/user_service';
import walletService from '../services/wallet_service';

export default {
    name: 'UserInfoPage',
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            isAdmin: false,
            uid: null,

            balance: 0,
            transactions: [],
            wallets: [],
            selWallet: '',
        };
    },
    created() {
        userService.getMyselfUser().then((response) => {
            this.email = response.data.email;
            this.firstName = response.data.first_name;
            this.lastName = response.data.last_name;
            this.isAdmin = response.data.is_admin;
            this.uid = response.data.uid;
        });

        walletService.getWallets().then((response) => {
            this.wallets = response.data;
        });
    },
    methods: {
        onSelectWallet(event) {
            this.selWallet = event.target.value;

            walletService.getTransactionsByWallet(this.selWallet).then((response) => {
                this.transactions = response.data;
            });
        },
        UtcFromIso(isoString) {
            const date = new Date(isoString);

            return date.toUTCString();
        },
    },
};
</script>
