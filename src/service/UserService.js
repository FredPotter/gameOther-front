import config from "../config";

class UserService {
    constructor() {
        this.apiUrl = config.apiUrl;
    }

    async createUser(user) {
        const response = await fetch(`${this.apiUrl}/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }

    async editUser(user) {
        const response = await fetch(`${this.apiUrl}/user/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }

    async loginForAccessToken(body) {
        const response = await fetch(`${this.apiUrl}/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    async getUserBalance() {
        const response = await fetch(`${this.apiUrl}/api/payment/balance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.json();
    }
    async changeUserBalance(body) {
        const response = await fetch(`${this.apiUrl}/api/payment/balance`, {
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


export default UserService;