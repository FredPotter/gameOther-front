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

    async getUserInfo() {
        const response = await fetch(`${this.apiUrl}/user/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
}


export default UserService;