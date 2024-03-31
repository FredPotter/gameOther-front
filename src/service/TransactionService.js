import config from "../config";

class TransactionService {
    constructor() {
        this.apiUrl = config.apiUrl;
    }

    async getTransactions() {
        const response = await fetch(`${this.apiUrl}/api/transaction/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.json();
    }

    async confirmTransaction(id) {
        const body = {
            id: id,
        };
        const response = await fetch(`${this.apiUrl}/api/transaction/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    async rejectTransaction(id) {
        const body = {
            id: id,
        };
        const response = await fetch(`${this.apiUrl}/api/transaction/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }
}

export default TransactionService;