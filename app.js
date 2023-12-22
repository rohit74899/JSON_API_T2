document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const jsonData = JSON.parse(e.target.result);
            displayData(jsonData);
        };
        reader.readAsText(file);
    }
}

function displayData(data) {
    const tableContainer = document.getElementById('tableContainer');
    const table = document.createElement('table');

    // Assuming data is an array of objects with attributes (subcategory, title, price, popularity)
    data.forEach(product => {
        const row = table.insertRow();
        const titleCell = row.insertCell(0);
        const priceCell = row.insertCell(1);

        titleCell.textContent = product.title;
        priceCell.textContent = product.price;
    });

    tableContainer.innerHTML = ''; // Clear previous content
    tableContainer.appendChild(table);
}
