import config from "../config";

class GameService {
    constructor() {
        this.apiUrl = config.apiUrl;
    }

    async createCollect(collect) {
        const response = await fetch(`${this.apiUrl}/collect/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(collect),
        });
        return response.json();
    }

    async getGames() {
        if (!localStorage.getItem('token')) {
            return {error: 'Unauthorized'};
        } else {
            const response = await fetch(`${this.apiUrl}/api/game/list`
                , {
                method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                }
            );
            return response.json();
        }
    }

    async getCollectPage(page = 1, onPage = 10, category_name = null, country_name = null, search = null) {
        let url = `${this.apiUrl}/collect/list/page?page=${page}&on_page=${onPage}`;
        if (category_name) {
            url += `&category_name=${category_name}`;
        }
        if (country_name) {
            url += `&country_name=${country_name}`;
        }
        if (search) {
            url += `&search=${search}`;
        }
        const response = await fetch(url);
        return response.json();
    }

    async mockDonate(donation) {
        const response = await fetch(`${this.apiUrl}/collect/mock/donate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(donation),
        });
        return response.json();
    }
}

export default GameService;