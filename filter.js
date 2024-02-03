document.addEventListener('DOMContentLoaded', function () {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('.filter-checkbox');

    // Add event listener to each checkbox
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function (event) {
            applyFilters();
            event.preventDefault();
            return false;
        });
    });

    // Initial display of all places
    applyFilters();

    // Get all buttons in the navigation
    const navButtons = document.querySelectorAll('nav a');

    // Add click event listener to each button
    navButtons.forEach(function (button) {
        button.addEventListener('click', handleButtonClick);
    });

    // Add click event listener to each "Learn More" button
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    learnMoreButtons.forEach(function (button) {
        button.addEventListener('click', handleLearnMoreClick);
    });
});

function applyFilters() {
    // Get selected values from checkboxes
    const selectedMeals = getSelectedValues('meal');
    const selectedCuisines = getSelectedValues('cuisine');

    // Get all place boxes
    const placeBoxes = document.querySelectorAll('.place-box');

    // Iterate over place boxes to show/hide based on filters
    placeBoxes.forEach(function (placeBox) {
        const placeMeal = placeBox.getAttribute('data-meal');
        const placeCuisine = placeBox.getAttribute('data-cuisine').split(' '); // Split into an array

        const isMealMatch = selectedMeals.length === 0 || selectedMeals.some(meal => placeMeal.includes(meal));
        const isCuisineMatch = selectedCuisines.length === 0 || selectedCuisines.every(cuisine => placeCuisine.includes(cuisine));

        // Show/hide place box based on filters
        placeBox.style.display = isMealMatch && isCuisineMatch ? 'block' : 'none';
    });
}

function getSelectedValues(category) {
    const checkboxes = document.querySelectorAll(`[name="${category}"]:checked`);
    return Array.from(checkboxes).map(function (checkbox) {
        return checkbox.value;
    });
}

function handleButtonClick() {
    // Remove 'active' class from all buttons
    document.querySelectorAll('nav a').forEach(function (button) {
        button.classList.remove('active');
    });

    // Add 'active' class to the clicked button
    this.classList.add('active');
}

function handleLearnMoreClick(event) {
    // Open the link in a new tab
    window.open(event.target.href, '_blank');
}