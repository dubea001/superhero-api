# Superhero Comparison Application

## Overview

The Superhero Comparison Application is a web application that allows users to compare various powerstats of superheroes fetched from the Superhero API. Users can select which superhero has a higher stat or indicate if it's a tie. The app provides feedback and generates new questions automatically after each round.

## Features

-   Generates two unique random superheroes for comparison.
-   Fetches superhero data, including names, images, and powerstats.
-   Asks users to compare a randomly selected powerstat between two superheroes.
-   Handles NaN values in powerstats appropriately.
-   Provides feedback on whether the user's choice was correct or incorrect.
-   Displays the correct powerstats after each question.
-   Automatically generates new comparison questions after each round.

## How It Works

1. **Generating Random Superheroes**:

    - The application generates two unique random numbers between 1 and 731 to fetch different superheroes' data.

2. **Fetching Superhero Data**:

    - The application retrieves the selected superheroes' information, including their name, image, and powerstats from the Superhero API.

3. **Generating Comparison Questions**:

    - A random powerstat (e.g., intelligence, strength, speed, durability, power, combat) is selected to compare.
    - A question like "Which superhero has more strength?" is displayed to the user.

4. **Handling NaN Values**:

    - If any powerstat value is NaN, it is treated appropriately:
        - If both are NaN, it is a tie.
        - If one is NaN and the other is a valid number, the valid number is considered higher.

5. **Displaying Superheroes and Answering Questions**:

    - Superheroes are shown side by side.
    - Users can click on a superhero or a button to indicate a tie to answer the question.
    - Feedback is provided with the correct stats shown.

6. **Loading the Next Question**:
    - After an answer is given, a new question is generated and displayed, repeating the comparison process.

## Getting Started

### Prerequisites

-   Node.js
-   npm (Node Package Manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dubea001/superhero-api.git
```
