import config from "../config";

class CountryService {
    constructor() {
        this.apiUrl = config.apiUrl;
    }

    async getCountries() {
        const response = await fetch(`${this.apiUrl}/api/country/list`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.json();
    }
}

export default CountryService;