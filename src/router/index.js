import Vue from 'vue';
import VueRouter from 'vue-router';
import RegisterPage from '../pages/register_page.vue';
import LoginPage from '../pages/login_page.vue';
import UserInfoPage from '../pages/user_info_page.vue';
import EditUserPage from '../pages/edit_user_page.vue';
import DeleteUserPage from '../pages/delete_user_page.vue';
import DepositPage from '../pages/deposit_page.vue';
import MakeTransactionPage from '../pages/make_transaction_page.vue';
import WithdrawPage from '../pages/withdraw_page.vue';
import MakeWalletPage from '../pages/make_wallet_page.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage,
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/user_info',
        name: 'UserInfoPage',
        component: UserInfoPage,
    },
    {
        path: '/edit',
        name: 'EditUserPage',
        component: EditUserPage,
    },
    {
        path: '/delete_user',
        name: 'DeleteUserPage',
        component: DeleteUserPage,
    },
    {
        path: '/deposit',
        name: 'DepositPage',
        component: DepositPage,
    },
    {
        path: '/make_wallet',
        name: 'MakeWalletPage',
        component: MakeWalletPage,
    },
    {
        path: '/make_transaction',
        name: 'MakeTransactionPage',
        component: MakeTransactionPage,
    },
    {
        path: '/withdraw',
        name: 'WithdrawPage',
        component: WithdrawPage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
