import config from "../config";

class CategoryService {
    constructor() {
        this.apiUrl = config.apiUrl;
    }

    async getCategories() {
        if (!localStorage.getItem('token')) {
            return {error: 'Unauthorized'};
        } else {
            const response = await fetch(`${this.apiUrl}/api/category/list`
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

export default CategoryService;