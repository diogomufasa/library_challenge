

class API {
    _baseUrl;
    
    constructor() {
        this._baseUrl = process.env.API_BASE_URL || '';
    }

    async fetchData(
        method = 'GET', 
        endpoint = '/books', 
        body = null
    ) {
        try {
            const response = await fetch(this._baseUrl + endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null,
            });

            const contentType = response.headers.get('content-type');
            console.log(contentType);
    

            if (response.status === '404') {
                return new Error.message('not found');
            }

            if (response.status === '500') {
                return new Error.message('server error');
            }

            if (!response.ok) throw new Error('Request failed');

            const data = await response.json();

            return data;
            
        } catch (error) {
            throw error;
        }
        
    }
}

const client = new API();

export default client;