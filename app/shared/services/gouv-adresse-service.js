export default class GouvAdressService {
    constructor() {
        this.resourceURL = 'https://api-adresse.data.gouv.fr/search/?q=';
    }
    async getAdressesCorresponding(terms) {
        return fetch(`${this.resourceURL}${terms}&type=municipality&limit=10`).then(async (response) => {
            const results = await response.json();
            return await this._prepareDataForAutoComplete(results.features);
        }).catch((error) => {
            console.error(error);
            throw error;
        })
    }

    _prepareDataForAutoComplete(results) {
        const tempArray = [];
        results.forEach((data) => {
            tempArray.push({
                title: data.properties.label + ', ' + data.properties.postcode,
                city: data.properties.city,
                postCode: data.properties.postcode,
                cityCode: data.properties.citycode,
                context: data.properties.context,
                geoCoords: {
                    latitude: data.geometry.coordinates[1],
                    longitude: data.geometry.coordinates[0],
                }
            });
        });
        return tempArray;
    }
}