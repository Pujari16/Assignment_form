document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

var pageSize = 10; // Number of records per page
var currentPage = 1; // Initial page
var formattedData;
function fetchData() {
    fetch('https://localhost:7020/api/FormData/viewData')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Store the fetched data in the window.formData variable
            window.formData = data;

            // Format the DateOfBirth property in 'yyyy-MM-dd' format
             formattedData = data.map(item => ({
                FullName: item.fullName,
                Email: item.email,
                Age: item.age,
                DateOfBirth: new Date(item.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
            }));

            displayData(formattedData);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function displayData(data) {
    var dataBody = document.getElementById('dataBody');
    var totalPages = Math.ceil(data.length / pageSize);

    // Calculate the start and end indices for the current page
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize, data.length);

    // Clear the existing table rows
    dataBody.innerHTML = '';

    // Check if there is any data
    if (data.length === 0) {
        console.log('No data available');
        dataBody.innerHTML = '<tr><td colspan="4">No data available.</td></tr>';
        updatePaginationControls(totalPages);
        return;
    }

    // Log information for debugging
    console.log('Data to be displayed:', data);
    console.log('startIndex:', startIndex);
    console.log('endIndex:', endIndex);

    // Populate the table with data for the current page
    for (var i = startIndex; i < endIndex; i++) {
        var item = data[i];
        console.log('Adding row for item:', item);
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        var cell2 = document.createElement('td');
        var cell3 = document.createElement('td');
        var cell4 = document.createElement('td');

        cell1.textContent = item.FullName;
        cell2.textContent = item.Email;
        cell3.textContent = item.Age;
        cell4.textContent = item.DateOfBirth;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);

        // Log the created row
        console.log('Created row:', row);

        // Append the row to the table body
        dataBody.appendChild(row);
    }

    // Update pagination controls
    updatePaginationControls(totalPages);
}




function updatePaginationControls(totalPages) {
    var backButton = document.getElementById('backButton');
    var nextButton = document.getElementById('nextButton');

    backButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function navigatePage(direction) {
    // Ensure window.formData is defined before proceeding
    if (!window.formData) {
        return;
    }

    var totalPages = Math.ceil(window.formData.length / pageSize);

    // Update current page based on the navigation direction
    currentPage += direction;

    // Ensure the current page is within valid bounds
    currentPage = Math.max(1, Math.min(currentPage, totalPages));

    // Fetch and display data for the updated page
    displayData(formattedData);
}
