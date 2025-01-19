// Toggle dropdown visibility
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show');
  }
  
  // Close dropdown when clicking outside
  window.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('show');
    }
  });

// Load traits from traits.json
async function loadTraits() {
    const response = await fetch('traits.json');
    return await response.json();
}

// Load products from products.csv
async function loadProducts() {
    try {
        const response = await fetch('products.csv');
        const text = await response.text();
        const products = text.split('\n').slice(1); // Skip the header
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random profile
async function generateProfile() {
    const traits = await loadTraits();
    const age = getRandomInt(5, 91);
    const sex = age < 20 ? (Math.random() < 0.5 ? 'girl' : 'boy') : (Math.random() < 0.5 ? 'woman' : 'man');
    const adjective = Math.random() < 0.833 ? traits[getRandomInt(0, traits.length - 1)].Adjective : null;
    const trait = Math.random() < 0.833 ? traits[getRandomInt(0, traits.length - 1)].Trait : null;

    // Build the profile sentence
    let profile = `a`;
    if (adjective) profile += ` ${adjective}`;
    profile += ` ${age} year old ${sex}`;
    if (trait) profile += ` who ${trait}`;
    profile += `.`; // Add a period at the end

    // Check if the toggle switch is on
    const fetchProductsToggle = document.getElementById('fetchProductsToggle').checked;
    if (fetchProductsToggle) {
        const products = await loadProducts();
        if (products.length > 0) {
            const product = products[getRandomInt(0, products.length - 1)];
            profile = `How would you sell ${product} to ` + profile;
        }
    }

    // Display the profile
    document.getElementById('profileContainer').innerText = profile;
}

// Play the sound
function playSound() {
    const audio = new Audio('click.mp3'); // Path to your sound file
    audio.play(); // Play the sound
}

// Attach event listener to the button
document.getElementById('generateButton').addEventListener('click', () => {
    playSound(); // Play sound when button is clicked
    generateProfile(); // Generate profile
});