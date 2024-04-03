import config from "../config";

class OfferService {
    constructor() {
        this.apiUrl = config.apiUrl;
    }

    async getOffersById(gameId, categoryName) {
        if (!localStorage.getItem('token')) {
            return {error: 'Unauthorized'};
        } else {
            const params = new URLSearchParams({
                gameId: gameId,
                categoryName: categoryName
            });
            const response = await fetch(`${this.apiUrl}/api/offer/list?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log(`${this.apiUrl}/api/offer/list?${params.toString()}`);
            return response.json();
        }
    }

    async getOfferById(offerId) {
        const response = await fetch(`${this.apiUrl}/api/offer/${offerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        console.log(2);
        return response.json();
    }

    async buyOffer(offerId, count, totalPrice) {
        if (!localStorage.getItem('token')) {
            return {error: 'Unauthorized'};
        } else {
            const body = {
                offerId: offerId,
                quantity: count,
                totalPrice: totalPrice
            };
            console.log(body);
            const response = await fetch(`${this.apiUrl}/api/offer/buy`, {
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

    async createOffer(body) {
        if (!localStorage.getItem('token')) {
            return {error: 'Unauthorized'};
        } else {
            const response = await fetch(`${this.apiUrl}/api/offer/create`, {
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
}

export default OfferService;