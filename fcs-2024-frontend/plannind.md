Project Planning: FCS-2024 App

Project Overview

The FCS-2024 App is a dynamic fight simulation application that allows users to:

Select characters from various universes (Marvel, DC, etc.).

Simulate battles between characters with detailed animations and stats.

View character details, fight histories, and leaderboards.

This document outlines the development plan, goals, and milestones for the project.


Objectives

Build a user-friendly and visually appealing fight simulation platform.

Enable efficient management of character data using MongoDB.

Provide dynamic animations for fights and an engaging user experience.

Integrate features like leaderboards, galleries, and fight history.


Folder Structure

Backend

Purpose: Handle server-side logic, database operations, and API integration.

Folder Structure:    
backend/
├── controllers/             # Business logic
├── models/                  # Mongoose schemas
├── routes/                  # API and page routes
├── config/                  # Configuration files
├── utils/                   # Helper functions
├── data/                    # Data importers
├── app.js                   # Entry point for backend
├── .env                     # Environment variables
├── error.log                # Error logging


Frontend

Purpose: Manage client-side rendering, static assets, and UI components.

Folder Structure:
frontend/
├── public/
│   ├── images/              # Images and logos
│   ├── javascripts/         # Client-side scripts
│   ├── stylesheets/         # CSS files
│   ├── animations/          # Animation-specific assets
│   └── assets/              # Fonts and additional resources
├── views/
│   ├── partials/            # Header, footer, and reusable templates
│   ├── characters/          # Character-related views
│   ├── fights/              # Fight-related views
│   ├── leaderboards.ejs     # Leaderboard view
│   ├── about.ejs            # About page
│   ├── gallery.ejs          # Gallery view
│   └── index.ejs            # Homepage
└── README.md                # Frontend documentation



Milestones

Phase 1: Core Features



Phase 2: Advanced Features



Phase 3: Optimization


Key Components

Backend Components

Controllers:

characterController.js: Manage character CRUD operations.

fightController.js: Handle fight logic and results.

leaderboardController.js: Display sorted leaderboard.

Models:

character.js: Define character schema with stats, universe, and abilities.

fight.js: Log fight details, rounds, and results.

Routes:

/characters: Manage character-related actions.

/fights: Set up and simulate fights.

/leaderboards: Display sorted leaderboard.

Utils:

apiFetcher.js: Fetch data from Superhero API.

utils.js: General utility functions.


Frontend Components

Public Assets:

Animations: Smooth character and fight animations.

Stylesheets: CSS for layout, typography, and responsiveness.

Views:

characterDetails.ejs: Detailed character stats.

fightResult.ejs: Show fight outcomes and logs.

leaderboards.ejs: Display top-performing characters.

gallery.ejs: Browse all available characters visually.

JavaScript Enhancements:

Handle user interactions dynamically (e.g., dropdowns, character selection).

Integrate animations for fights and transitions.


Testing Plan

Unit Testing:

Test all controllers and models for edge cases.

Ensure proper validation for character stats and universes.

Integration Testing:

Test API endpoints for expected responses.

Simulate user workflows (e.g., creating a fight, viewing leaderboard).

Frontend Testing:

Verify responsiveness on various devices.

Check for smooth animations and proper data rendering.


Deployment Plan

Use Heroku for backend deployment.

Serve static assets via CDN for faster loading.

Implement CI/CD pipeline for automated testing and deployments.

Set up monitoring tools (New Relic) for error tracking.


Future Enhancements

Multiplayer Mode: Allow users to fight against each other in real-time.

Custom Characters: Enable users to create and upload their own characters.

Leaderboards: Include weekly and monthly rankings.

Thematic Fights: Add seasonal events with unique fight mechanics.


Contributors

Project Owner: Jephthe Petit-Frere, Byron Lewis, Saidu Kamara

Frontend Developer: TBD

Backend Developer: TBD

QA Tester: TBD



Project Start Date: 1/2025 
Expected Completion Date: 2/2025