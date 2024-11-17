export class UIManager {
    constructor(config) {
        this.filtersContainer = document.querySelector('.filters');
        this.tableBody = document.getElementById('places-table');
        this.config = config;
    }

    initializeFilters() {
        this.filtersContainer.innerHTML = this.config.PLACE_TYPES
            .map(type => `
                <button class="filter-btn ${type.id === 'all' ? 'active' : ''}" 
                        data-type="${type.id}">
                    ${type.label}
                </button>
            `).join('');
    }

    updateActiveFilter(button) {
        document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');
    }

    showLoading() {
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="loading">
                    <div class="loading-spinner"></div>
                    Finding nearby places...
                </td>
            </tr>`;
    }

    showError(message) {
        this.tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="error">
                    ${message}
                </td>
            </tr>`;
    }

    formatRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '★'.repeat(fullStars);
        if (hasHalfStar) stars += '½';
        return stars;
    }

    displayPlaces(places, currentLocation) {
        this.tableBody.innerHTML = '';
        
        places.forEach(place => {
            const distance = new google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(currentLocation),
                place.geometry.location
            ) / 1609.34; // Convert to miles

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${place.name}</td>
                <td>${place.types[0].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                <td>${distance.toFixed(1)} mi</td>
                <td>${place.user_ratings_total || 0}</td>
                <td>
                    <div class="rating">
                        <span class="stars">${this.formatRating(place.rating || 0)}</span>
                        <span>${place.rating ? place.rating.toFixed(1) : 'N/A'}</span>
                    </div>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }
}