import apiService from './api_service';

function getWallets() {
    return apiService.get('/wallet');
}

function getTransactionsByWallet(walletUid) {
    return apiService.get(`/wallet/${walletUid}/transactions`);
}

function createWallet({ name }) {
    return apiService.post('/wallet', {
        name,
    });
}

function createDeposit({ walletUid, amount }) {
    return apiService.post('/wallet/deposit', {
        to_wallet: Number(walletUid),
        amount: Number(amount),
    });
}

function sendFunds({ fromWalletUid, toWalletUid, amount }) {
    return apiService.post(`/wallet/${fromWalletUid}/send-funds`, {
        to_wallet: Number(toWalletUid),
        amount: Number(amount),
    });
}

function withdraw({ fromWalletUid, amount }) {
    return apiService.post('/wallet/withdraw', {
        from_wallet: Number(fromWalletUid),
        amount: Number(amount),
    });
}

export default {
    getWallets,
    getTransactionsByWallet,
    createWallet,
    createDeposit,
    withdraw,
    sendFunds,
};
