# Points of Interest App

The **Points of Interest App** is a lightweight and responsive web application designed to help users explore nearby locations using real-time data from the Google Maps API. Whether you’re looking for restaurants, parks, shopping centers, or other attractions, this app provides accurate and categorized results, including names, distances, ratings, and reviews.

## Features
- **Dynamic Search**: Retrieve nearby places within a configurable radius.
- **Category Filtering**: Easily filter results by category, such as restaurants, parks, or shopping.
- **Distance Calculation**: Displays the distance of each location from the central point.
- **Ratings and Reviews**: Provides user reviews and average ratings for each location.
- **Responsive Design**: Optimized for desktop and mobile views.

## Prerequisites
- Node.js and npm installed.
- A valid Google Maps API Key with access to the Places and Geometry libraries.

## Installation and Setup
1. Clone this repository to your local machine.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Install Vite for local development:
   ```bash
   npm install vite
   ```
4. Add your Google Maps API Key in the `js/config.js` file:
   ```javascript
    API_KEY: 
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the app in your browser at the URL provided by Vite.

## Usage
- Select a category using the filter buttons.
- View the dynamic table that updates with real-time location data.
- Explore details like distance, ratings, and reviews.

This app leverages the Google Maps API for real-time data and is ideal for developers looking to integrate similar functionality into their projects.