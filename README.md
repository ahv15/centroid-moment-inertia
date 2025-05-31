# Project_centroid

A web-based application for calculating centroids and moments of inertia of geometric shapes and composite shapes. This project provides interactive tools for engineering and physics calculations involving 2D shapes.

## Project Overview

Project_centroid is an educational and professional tool that allows users to:
- Calculate centroids of various geometric shapes (rectangles, circles, triangles, polygons, semi-circles)
- Compute moments of inertia about specified axes
- Handle composite shapes with cutouts
- Visualize shapes on an interactive canvas
- Set custom coordinate systems and reference points

## Directory Structure

```
Project_centroid/
├── index.html                 # Main centroid calculator page
├── moment-of-inertia.html     # Moment of inertia calculator page
├── js/
│   ├── utils.js              # Common utility functions
│   ├── shapes.js             # Shape drawing functions
│   ├── centroid.js           # Centroid calculation logic
│   ├── inertia.js            # Moment of inertia calculations
│   └── ui.js                 # User interface interactions
├── css/
│   └── styles.css            # Application styling
└── README.md                 # This file
```

## Features

### Implemented Features

- **Shape Creation**: Create rectangles, circles, triangles, polygons, and semi-circles
- **Composite Shapes**: Add and subtract shapes to create complex geometries
- **Centroid Calculation**: Calculate the centroid (center of mass) of composite shapes
- **Moment of Inertia**: Compute moment of inertia about custom axes
- **Interactive Canvas**: Visual representation of shapes with real-time drawing
- **Custom Coordinate System**: Set origin and reference axes
- **Form Validation**: Input validation for shape parameters
- **Responsive Design**: Adaptive layout for different screen sizes

## Usage Instructions

### Getting Started

1. **Open the Application**:
   - Open `index.html` in a web browser for centroid calculations
   - Open `moment-of-inertia.html` for moment of inertia calculations

2. **No Server Required**: The application runs entirely in the browser using client-side JavaScript

### Using the Centroid Calculator

1. **Set Origin** (Optional):
   - Enter X and Y coordinates for the origin point
   - Default origin is at (300, 200) on the canvas

2. **Create Shapes**:
   - Click on the desired shape button (Rectangle, Circle, Triangle, etc.)
   - Fill in the required dimensions and coordinates
   - Click "Create" to add the shape to the canvas

3. **Add Multiple Shapes**:
   - Repeat the process to add more shapes
   - All shapes will be included in the centroid calculation

4. **Create Cutouts**:
   - Use the "Making Cutoffs" section to subtract shapes
   - Useful for creating holes or complex geometries

5. **Calculate Centroid**:
   - Click "Calculate" to compute and display the centroid
   - The result shows coordinates relative to the origin

## Mathematical Background

### Centroid Calculation

The centroid of a composite shape is calculated using:
```
x̄ = (Σ Ai × x̄i) / Σ Ai
ȳ = (Σ Ai × ȳi) / Σ Ai
```

Where:
- Ai = area of each component shape
- x̄i, ȳi = centroid coordinates of each component
- Σ represents summation over all shapes

### Moment of Inertia

Uses the parallel axis theorem:
```
I = Ic + A × d²
```

Where:
- Ic = moment of inertia about the centroidal axis
- A = area of the shape
- d = distance from centroidal axis to reference axis
