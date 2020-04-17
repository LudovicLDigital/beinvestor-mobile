export default class GouvAdressService {
    constructor() {
        this.resourceURL = 'https://api-adresse.data.gouv.fr/search/?q=';
    }
    async getAdressesCorresponding(terms) {
        return fetch(`${this.resourceURL}${terms}&type=municipality&limit=10`).then(async (response) => {
            return await response.json();
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }
}