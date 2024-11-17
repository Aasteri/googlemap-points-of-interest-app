import { CONFIG } from './js/config.js';
import { LocationService } from './js/location-service.js';
import { PlacesService } from './js/places-service.js';
import { UIManager } from './js/ui-manager.js';

class PointsOfInterest {
    constructor() {
        this.currentLocation = null;
        this.map = new google.maps.Map(document.createElement('div'));
        this.placesService = new PlacesService(this.map);
        this.uiManager = new UIManager(CONFIG);
        this.init();
    }

    async init() {
        try {
            // Initialize UI components
            this.uiManager.initializeFilters();
            this.uiManager.showLoading();

            // Get user's location
            this.currentLocation = await LocationService.getCurrentLocation();
            
            // Setup event listeners
            this.setupFilterListeners();
            
            // Initial search
            await this.searchPlaces('all');
        } catch (error) {
            console.error('Initialization error:', error);
            this.currentLocation = CONFIG.DEFAULT_LOCATION;
            this.uiManager.showError('Unable to get your location. Showing places in New York City.');
            await this.searchPlaces('all');
        }
    }

    setupFilterListeners() {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', async () => {
                this.uiManager.updateActiveFilter(button);
                this.uiManager.showLoading();
                await this.searchPlaces(button.dataset.type);
            });
        });
    }

    async searchPlaces(type) {
        try {
            const places = await this.placesService.searchNearby(this.currentLocation, type);
            this.uiManager.displayPlaces(places, this.currentLocation);
        } catch (error) {
            console.error('Search error:', error);
            this.uiManager.showError('Failed to fetch places. Please try again.');
        }
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PointsOfInterest();
});