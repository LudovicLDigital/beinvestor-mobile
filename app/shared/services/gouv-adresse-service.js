const DISTRICT = "Arrondissement";

/**
 * can add a recoverOnlyDistrict var to true if want to recover only cities without district and only district of massive cities
 */
export default class GouvAdressService {
    constructor(recoverOnlyDistrict = false) {
        this.resourceURL = 'https://api-adresse.data.gouv.fr/search/?q=';
        this.recoverOnlyDistrict = recoverOnlyDistrict;
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
        const contextMap = new Map();

        results.forEach((data) => {
            let cityMapped  = {
                title: data.properties.label + ', ' + data.properties.postcode,
                city: data.properties.city,
                postCode: data.properties.postcode,
                cityCode: data.properties.citycode,
                context: data.properties.context,
                geoCoords: {
                    latitude: data.geometry.coordinates[1],
                    longitude: data.geometry.coordinates[0],
                }
            };
            const contextSplitted = data.properties.label.split(' ');
            const cityKeyAllArrondissements = contextSplitted[0] + DISTRICT;
            if(this.recoverOnlyDistrict) {
                if ((!contextMap.get(cityKeyAllArrondissements) || contextMap.get(cityKeyAllArrondissements) === null)
                    && cityMapped.title.includes(DISTRICT)) {
                    contextMap.set(cityKeyAllArrondissements, cityMapped)
                } else {
                    if (!cityMapped.title.includes(DISTRICT)) {
                        if (!contextMap.get(cityMapped.city + DISTRICT) && contextMap.get(cityMapped.city + DISTRICT) === null) {
                            tempArray.push(cityMapped)
                        }
                    } else {
                        tempArray.push(cityMapped);
                    }
                }
            } else {
                tempArray.push(cityMapped)
            }
        });
        return tempArray;
    }
}