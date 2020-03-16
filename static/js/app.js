// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Simple JavaScript console.log statement
function printHello() {
    console.log("Hello there!");
}

//Build a data tabel
function buildTable(data){
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

/*function handleClick(){
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    //let date = d3.select("#city").property("value");

    let filteredData = tableData;
    // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
        // Apply `filter` to the table data to only keep the
        // rows where the `datetime` value matches the filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
} */
// Attach an event to listen for the form button
//d3.select("#filter-btn").on("click", handleClick);
// Build the table when the page loads
//buildTable(tableData);

// Challenge Solution

// This function will replace your handleClick function
function updateFilters() { 
    var filters = new Object();

    // Save the element, value, and id of the filter that was changed
     
    let date = d3.select("#datetime").property("value");
    let city = d3.select("#city").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");

    // If a filter value was entered then add that filterId and value 
    // to the filters list. Otherwise, clear that filter from the filters object 
    
    if(date) {
        filters["datetime"] = date;
    } if(city) {
        filters["city"] = city;
    } if(state) {
        filters["state"] = state;
    } if(country) {
        filters["country"] = country;  
    } if(shape) {
        filters["shape"] = shape;
    } 

    //clear the filter if no input data exists.
    if((date === "" || date === null) && (city === "" || city === null) &&
    (state === "" || state === null) && (country === "" || country === null) &&
    (shape === "" || shape === null)) {
        buildTable(tableData);

    } else {
    // Call function to apply all filters and rebuild the table  
    filterTable(filters);
    }

}


function filterTable(filters) {  
    // Set the filteredData to the tableData  
    let filteredData = tableData;


     // Loop through all of the filters and keep any data that
    //matches the filter values 
    Object.keys(filters).forEach( function(item) {
        if(item === "datetime") {
            let date = filters[item];
            filteredData = filteredData.filter(row => row.datetime === date);
        } else if(item === "city") {
            let city = filters[item];
            filteredData = filteredData.filter(row => row.city === city);
        } else if(item === "state") {
            let state = filters[item];
            filteredData = filteredData.filter(row => row.state === state);
        } else if(item === "country") {
            let country = filters[item];
            filteredData = filteredData.filter(row => row.country === country);
        } else if(item === "shape") {
            let shape = filters[item];
            filteredData = filteredData.filter(row => row.shape === shape);
        } 
    });
    // Finally, rebuild the table using the filtered Data  
    buildTable(filteredData);
}


// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis

d3.selectAll("#filter-btn").on("click", updateFilters);


// Build the table when the page loads

buildTable(tableData);

