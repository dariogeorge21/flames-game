// Dictionary for FLAMES results, themes, and emojis
const flamesMeanings = {
    'F': { title: 'Friends', desc: 'You are meant to be good friends! 🤝', color: '#f39c12' },
    'L': { title: 'Lovers', desc: 'Sparks are flying! You two are lovers. ❤️', color: '#e74c3c' },
    'A': { title: 'Affectionate', desc: 'There is a deep affection between you! 🥰', color: '#e84393' },
    'M': { title: 'Marriage', desc: 'Wedding bells are ringing! 💍', color: '#9b59b6' },
    'E': { title: 'Enemies', desc: 'Uh oh... You are destined enemies! ⚔️', color: '#2c3e50' },
    'S': { title: 'Siblings', desc: 'You share a sibling-like bond! 👦👧', color: '#0984e3' }
};

// DOM Elements
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const resultSection = document.getElementById('result-section');
const resultLetter = document.getElementById('result-letter');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');

// Event Listeners
calculateBtn.addEventListener('click', calculateFlames);
resetBtn.addEventListener('click', resetGame);

function calculateFlames() {
    // 1. Get inputs, make lowercase, and remove all spaces
    const name1Input = document.getElementById('name1').value.trim().toLowerCase().replace(/\s+/g, '');
    const name2Input = document.getElementById('name2').value.trim().toLowerCase().replace(/\s+/g, '');

    if (!name1Input || !name2Input) {
        alert("Please enter both names to find out your destiny!");
        return;
    }

    // 2. Remove Common Letters 
    // Following your rule: "if 'A' appears twice in name 1 and once in name 2, all three 'A's are removed"
    const arr1 = name1Input.split('');
    const arr2 = name2Input.split('');

    // Filter out characters that exist in the other array
    const uniqueToName1 = arr1.filter(char => !arr2.includes(char));
    const uniqueToName2 = arr2.filter(char => !arr1.includes(char));

    // 3. Count Remaining Letters
    const remainingCount = uniqueToName1.length + uniqueToName2.length;

    if (remainingCount === 0) {
        displayResult('?', 'Identical!', 'You two are exactly the same!', '#2d3436');
        return;
    }

    // 4. Eliminate Letters (The Josephus Problem logic)
    let flamesArr = ['F', 'L', 'A', 'M', 'E', 'S'];
    let index = 0;

    while (flamesArr.length > 1) {
        // Find the index to remove. (index + count - 1) % array length.
        index = (index + remainingCount - 1) % flamesArr.length;
        // Remove the letter at that index
        flamesArr.splice(index, 1);
    }

    // 5. Present the Result
    const finalLetter = flamesArr[0];
    const resultData = flamesMeanings[finalLetter];
    
    displayResult(finalLetter, resultData.title, resultData.desc, resultData.color);
}

function displayResult(letter, title, desc, color) {
    resultLetter.textContent = letter;
    resultLetter.style.color = color;
    
    resultTitle.textContent = title;
    resultTitle.style.color = color;
    
    resultDesc.textContent = desc;

    // Hide inputs/calculate button, show results
    calculateBtn.classList.add('hidden');
    document.querySelector('.input-section').classList.add('hidden');
    resultSection.classList.remove('hidden');
}

function resetGame() {
    // Clear inputs
    document.getElementById('name1').value = '';
    document.getElementById('name2').value = '';

    // Hide results, show inputs/calculate button
    resultSection.classList.add('hidden');
    calculateBtn.classList.remove('hidden');
    document.querySelector('.input-section').classList.remove('hidden');
}
