/// <reference path="jquery-3.7.0.js"/>

'use strict';

(() => {
    // Get the "searchAllBtn" element by its ID
    const searchAllBtn = document.getElementById("searchAllBtn");
    // Add a click event listener to the "searchAllBtn" button
    searchAllBtn.addEventListener("click", async function showAllCountries() {
        try {

            const response = await getJson();
            // Convert the response to JSON format
            const countries = await response.json();

            // Display the countries in the UI
            displayCountries(countries);

            // Show the data in paragraphs
            showDataInParagraphs(countries);
        }
        catch (err) {
            alert(err.message);     // Display an error message if an error occurs
        }
    });

    // Get the "searchSpecificBtn" element by its ID
    const searchSpecificBtn = document.getElementById("searchSpecificBtn");
    // Add a click event listener to the "searchSpecificBtn" button
    searchSpecificBtn.addEventListener("click", async function showSpecificCountries() {
        try {
            // Get the input field element for searching specific countries
            const searchSpecific = document.getElementById("searchSpecific");

            // Get the value entered in the input field
            const countryName = searchSpecific.value;
            // Reset the border style of the input field
            searchSpecific.style.border = "";

            if (countryName === "") {
                searchSpecific.style.border = "2px solid #a23438";  // Set a red border if the input field is empty
                alert("Please search a country");   // Display an alert message asking the user to enter a country name
                return;
            }
            const url = `https://restcountries.com/v3.1/name/${countryName}`;
            const response = await fetch(url);
            const countries = await response.json();

            if (!response.ok) {
                // Throw an error if the response is not successful
                throw new Error("Country not found");
            }

            if (!Array.isArray(countries) || countries.length === 0) {
                // Throw an error if the countries array is empty
                throw new Error("Country not found");
            }

            // Display the specific countries in the UI
            displayCountries(countries);

            // Show the data in paragraphs
            showDataInParagraphs(countries);
        }
        catch (err) {
            alert("County not found");  // Display an error message if the country is not found
        }

    });

    //   Display the countries data in the UI.
    function displayCountries(countries) {
        let content = "";
        // Iterate through each country in the array
        for (const country of countries) {
            const tr = `
            <tr>
                <td>${country.name.official}</td> 
                <td>${country.population}</td>
            </tr>`;
            content += tr;
        }
        const tBody = document.getElementById("tBody"); // Get the table body element by its ID
        tBody.innerHTML = content;  // Set the content as the inner HTML of the table body

        // Get the first table element in the document
        const table = document.getElementById("countriesTable");
        // Set the visibility of the table to "visible"
        table.style.visibility = "visible";
        // Call the function to show the region table
        showRegion(countries);
        // Call the function to show the currencies table
        showCurrenciesTable(countries);
    }

    // Calculate the total population of the given countries.
    function totalPopulation(countries) {
        let totalPopulation = 0;
        // Iterate through each country in the array
        for (const country of countries) {
            const population = country.population;
            // Add the country's population to the total
            totalPopulation += population;
        }
        // Return the total population
        return totalPopulation;
    }

    function showDataInParagraphs(countries) {

        // Get the total number of countries
        const countriesAmount = countries.length;
        // Get the total population of countries
        const countriesPopulation = totalPopulation(countries);

        const avgPopulation = (countriesPopulation / countriesAmount).toFixed(2);
        const countriesAmountPar = document.getElementById("countriesAmountPar");
        const totalPopulationParagraph = document.getElementById("totalPopulationPar");
        const averagePopulationParagraph = document.getElementById("averagePopulationPar");

        // Update the content of the HTML elements with the appropriate data
        countriesAmountPar.innerHTML = "Total amount of countries: " + countriesAmount;
        totalPopulationParagraph.innerHTML = "Total countries population: " + countriesPopulation;
        averagePopulationParagraph.innerHTML = "Average population of countries: " + avgPopulation;

        // Set the visibility of the HTML elements to make them visible
        const par1 = document.getElementById("countriesAmountPar");
        par1.style.visibility = "visible";
        const par2 = document.getElementById("totalPopulationPar");
        par2.style.visibility = "visible";
        const par3 = document.getElementById("averagePopulationPar");
        par3.style.visibility = "visible";
    }

    // Display the region data in the region table on the webpage.  
    function showRegion(countries) {
        const regionTable = document.getElementById("regionTable");

        // Calculate the region data
        const data = regionCalc(countries);

        let html = "";
        // Iterate through the regions and create table rows
        Object.keys(data).forEach((region) => {
            const tr = `
            <tr>
                <td>${region}</td>
                <td>${data[region]}</td>
            </tr>`;

            html += tr;
        });

        const tableBodyRegion = document.getElementById("regionTableBody");
        tableBodyRegion.innerHTML = html;

        // Set the visibility of the region table to make it visible
        regionTable.style.visibility = "visible";
    }


    function regionCalc(countries) {
        const resultData = {};

        for (const country of countries) {
            const region = country.region;

            // Check if the region already exists in the resultData object
            if (region in resultData) {
                resultData[region]++;  // Increment the count for the existing region
            } else {
                resultData[region] = 1; // Initialize the count for a new region
            }
        }
        return resultData;
    }

    // Calculate the region data based on the countries array.
    function showCurrenciesTable(countries) {
        const currencyTableBody = document.getElementById("currencyTableBody");


        // currencyTableBody.innerHTML = ''; // Clear table at start
        while (currencyTableBody.firstChild) {
            currencyTableBody.removeChild(currencyTableBody.firstChild);
        }


        const data = currencyCalc(countries);

        let html = "";
        // Object iteration
        Object.keys(data).forEach((currency) => {
            const tr = `
            <tr>
                <td>${currency}</td>
                <td>${data[currency]}</td>
            </tr>`;
            html += tr;

        });
        currencyTableBody.innerHTML = html;
        const currencyTable = document.getElementById("currencyTable");
        currencyTable.style.visibility = "visible";
    }

    function currencyCalc(countries) {
        const resultData = {}; // Here we build key:value pairs database

        for (let i = 0; i < countries.length; i++) {
            const currencyObj = countries[i].currencies; // Sub-object it first
            if (currencyObj === undefined) {
                continue; // In Antarctica, there is no currency - so handle the undefined and skip.
            }

            // We use it because we don't know the currency key name - so using 'values' method we can traverse the object like it was an array
            const key = Object.values(currencyObj)[0].name;

            if (typeof resultData[key] === 'undefined') {
                resultData[key] = 1;
            } else {
                resultData[key] += 1;
            }
        }

        return resultData;
    }

    async function getJson() {
        // URL of the API endpoint to fetch all countries
        const url = "https://restcountries.com/v3.1/all";
        // Fetch the data from the API
        const response = await fetch(url);

        return response;
    }



})();



