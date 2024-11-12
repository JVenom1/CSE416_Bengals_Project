# CSE416_Bengals_Project

## Overview

Video Preview:
https://github.com/user-attachments/assets/5d2e5ccd-596f-4414-9454-daca7fa71f3e

Welcome to the main project folder for our Bengals Project! This repository houses the code and resources for performing cluster analysis on sets of random district plans. The primary goals of this project include:

- Analyzing clustering effects among ensembles of random district plans.
- Understanding patterns of clusters within an ensemble.
- Evaluating the effectiveness of distance measures for pairs of district plans.
- Determining how many plans in an ensemble are needed to identify almost all clusters.
- Visualizing clusters.
- Visualizing thousands of random plans for the selection of individual plans.

## Getting Started

To start the program, follow these steps:

1. **Update Server Link:**

   - Update the server link in `gui/src/api/posts.js` to match the backend server.
   - Ensure the server has data for the following GET requests from this file: `../server/src/main/java/org/bengals/server/Resource.java`.

2. Navigate to the `gui` directory in your terminal:

   ```bash
   cd gui
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

## Cluster Analysis

The cluster analysis is designed to provide insights into the patterns and effects of clustering within ensembles of random district plans. This involves evaluating distance measures, identifying clusters, and determining the optimal number of plans to capture most clusters.

## Visualization

The project includes visualization components to aid in understanding and selecting individual plans. This is particularly useful when dealing with thousands of random plans, allowing for efficient exploration and selection.
