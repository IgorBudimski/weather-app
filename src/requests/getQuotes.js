import { url } from '../api/apiQuotes';

export const getQuotes = async () => {
    try {
        let response = await fetch(url);
        response = await response.json();

        return response;
        
    } catch (error) {
        return error;
    }
}