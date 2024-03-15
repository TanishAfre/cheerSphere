const listItems = document.querySelectorAll('#moodEntriesList li');
const itemsPerPage = 10;
let currentPage = 1;

function showPage(page) {
    const maxItem = page * itemsPerPage;
    const minItem = maxItem - itemsPerPage;

    listItems.forEach((item, index) => {
        item.style.display = 'none'; // Hide all items
        if (index >= minItem && index < maxItem) {
            item.style.display = 'block'; // Show only items for current page
        }
    });

    document.getElementById('pageNumber').innerText = page; // Update the current page number display
}

function changePage(step) {
    const nextPage = currentPage + step;
    const totalPages = Math.ceil(listItems.length / itemsPerPage);

    // Check if next page is within range
    if (nextPage > 0 && nextPage <= totalPages) {
        currentPage = nextPage;
        showPage(currentPage);
    }
}

// Initialize the list with the first page
showPage(1);