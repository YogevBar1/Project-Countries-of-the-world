# Country Data Display Project

This project displays country data and statistics using JavaScript and HTML.

## Table of Contents

- [Project Overview](#project-overview)
- [Dependencies](#dependencies)
- [HTML Structure](#html-structure)
- [CSS Styling](#css-styling)
- [JavaScript Functionality](#javascript-functionality)
- [Fetching All Countries](#fetching-all-countries)
- [Displaying All Countries](#displaying-all-countries)
- [Searching Specific Countries](#searching-specific-countries)
- [Displaying Specific Countries](#displaying-specific-countries)
- [Calculating Total Population](#calculating-total-population)
- [Displaying Data in Paragraphs](#displaying-data-in-paragraphs)
- [Displaying Region Data in Table](#displaying-region-data-in-table)
- [Calculating Currency Data](#calculating-currency-data)
- [Displaying Currency Data in Table](#displaying-currency-data-in-table)
- [Git Ignore](#git-ignore)
- [README](#readme)
- [License](#license)
- [Contribution Guidelines](#contribution-guidelines)

## Project Overview

This project aims to provide an interactive web application that showcases country data and statistics. It utilizes JavaScript and HTML to fetch data from an API and present it in a user-friendly manner.

## Dependencies

- jQuery 3.6.0

## HTML Structure

The HTML file contains the basic structure of the web page, including the header, buttons, search input, tables, and paragraphs for displaying data.

## CSS Styling

The CSS file (style.css) provides the styling for the HTML elements, ensuring an appealing and consistent layout for the web page.

## JavaScript Functionality

The JavaScript code (main.js) handles the main functionality of the project, including fetching data from the API, displaying countries, searching for specific countries, calculating population and currency data, and updating the UI.

## Fetching All Countries

The application fetches country data from the "https://restcountries.com/v3.1/all" API endpoint using the Fetch API in JavaScript. This retrieves an array of objects containing information about all countries.

## Displaying All Countries

Upon fetching the data, the application dynamically generates an HTML table to display the country name and population for each country.

## Searching Specific Countries

The user can search for specific countries by entering a country name in the search input field. The application then fetches the data for the matching country from the "https://restcountries.com/v3.1/name/{countryName}" API endpoint.

## Displaying Specific Countries

The application displays the data for the searched specific countries in the same HTML table format as for all countries.

## Calculating Total Population

The JavaScript code calculates the total population by iterating through the array of countries and summing up their population values.

## Displaying Data in Paragraphs

The application presents various statistics and data, such as the total number of countries, the total countries' population, and the average population, in separate paragraphs below the table.

## Displaying Region Data in Table

The project calculates the number of countries in each region and presents the data in a table format, showing the region name and the corresponding count of countries.

## Calculating Currency Data

The JavaScript code calculates the number of countries using each currency by analyzing the currency data retrieved from the API.

## Displaying Currency Data in Table

The project displays the currency data in a table format, showing the currency name and the number of countries using it.

## Git Ignore

The project includes a .gitignore file that specifies which files and directories should be ignored by Git version control.



