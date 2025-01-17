// Load traits from traits.json
async function loadTraits() {
    const response = await fetch('traits.json');
    return await response.json();
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
    const adjective = Math.random() < 0.75 ? traits[getRandomInt(0, traits.length - 1)].Adjective : null;
    const trait = Math.random() < 0.75 ? traits[getRandomInt(0, traits.length - 1)].Trait : null;

    // Build the profile sentence
    let profile = `A`;
    if (adjective) profile += ` ${adjective}`;
    profile += ` ${age} year old ${sex}`;
    if (trait) profile += ` who ${trait}`;
    profile += `.`; // Add a period at the end

    // Display the profile
    document.getElementById('profileContainer').innerText = profile;
}

// Attach event listener to the button
document.getElementById('generateButton').addEventListener('click', generateProfile);
