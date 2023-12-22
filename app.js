let jsonData = [];

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                // Parse the JSON data and ensure it's an array
                jsonData = JSON.parse(e.target.result).products || [];
                initializeFields();
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Error parsing JSON. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

function initializeFields() {
    const availableFields = document.getElementById('availableFields');
    const thead = document.querySelector('#dataTable thead');
    thead.innerHTML = '';

    // Ensure jsonData is an array and not empty
    if (Object.keys(jsonData).length > 0) {
        // Assuming the first object in the data contains the column names
        const columns = Object.keys(jsonData[Object.keys(jsonData)[0]]);

        columns.forEach(column => {
            const option = document.createElement('option');
            option.value = column;
            option.text = column;
            availableFields.add(option);

            const th = document.createElement('th');
            th.textContent = column;
            thead.appendChild(th);
        });
    } else {
        console.error('JSON data is not in the expected format.');
    }
}

function addSelected() {
    moveSelectedOptions('availableFields', 'displayedFields');
    displayData();
}

function removeSelected() {
    moveSelectedOptions('displayedFields', 'availableFields');
    displayData();
}

function moveSelectedOptions(sourceId, targetId) {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);

    Array.from(source.selectedOptions).forEach(option => {
        target.add(option);
    });

    clearSelection(source);
    clearSelection(target);
}

function clearSelection(select) {
    select.selectedIndex = -1;
}

function displayData() {
    const displayedFields = Array.from(document.getElementById('displayedFields').options).map(option => option.value);

    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';

    // Sort the data based on descending popularity
    const sortedData = Object.entries(jsonData).sort(([, a], [, b]) => b.popularity - a.popularity);

    sortedData.forEach(([key, item]) => {
        const row = tbody.insertRow();
        displayedFields.forEach(field => {
            const cell = row.insertCell();
            cell.textContent = item[field];
        });
    });
}
