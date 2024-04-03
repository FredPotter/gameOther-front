import config from "../config";

class GameService {
    constructor() {
        this.apiUrl = config.apiUrl;
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
}

export default GameService;