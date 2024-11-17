export class PlacesService {
    constructor(map) {
        this.service = new google.maps.places.PlacesService(map);
    }

    async searchNearby(location, type = null) {
        return new Promise((resolve, reject) => {
            const request = {
                location,
                radius: 5000
            };

            if (type && type !== 'all') {
                request.type = [type];
            }

            this.service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                } else {
                    reject(new Error(`Places API error: ${status}`));
                }
            });
        });
    }

    calculateDistance(origin, destination) {
        return google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(origin),
            destination
        ) / 1609.34; // Convert to miles
    }
}