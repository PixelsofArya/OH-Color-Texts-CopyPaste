// Get elements from the DOM
const addColorButton = document.getElementById('addColor');
const resetButton = document.getElementById('resetBtn');
const colorBox = document.getElementById('colorBox');
const popup = document.getElementById('popup');
const liveResult = document.getElementById('liveResult');
const copyButton = document.getElementById('copyBtn');

// Set a character limit for all inputs including #cRRGGBB hex codes
const CHAR_LIMIT = 100;  // Total character limit
let totalCharacters = 0;  // Track the total character count

// Add a new color item when the plus button is clicked
addColorButton.addEventListener('click', () => {
    if (totalCharacters < CHAR_LIMIT) { // Allow adding only if the total character limit hasn't been exceeded
        const colorItem = document.createElement('div');
        colorItem.classList.add('color-item');
        colorItem.innerHTML = `
            <input type="color" class="color-picker">
            <input type="text" class="text-input" placeholder="Enter text">
        `;
        colorBox.appendChild(colorItem);
        updateLiveResult();
    } else {
        showPopup("Character limit reached!");
    }
});

// Reset the color items to one
resetButton.addEventListener('click', () => {
    colorBox.innerHTML = `
        <div class="color-item">
            <input type="color" class="color-picker">
            <input type="text" class="text-input" placeholder="Enter text">
        </div>
    `;
    totalCharacters = 0; // Reset character count
    updateLiveResult(); // Update the live result after resetting
});

// Update the live result whenever an input changes
colorBox.addEventListener('input', () => {
    updateLiveResult();
});

// Function to update the live result section and track total character count
function updateLiveResult() {
    let allTexts = "";
    totalCharacters = 0;  // Reset the total character count

    const colorItems = document.querySelectorAll('.color-item');

    colorItems.forEach(item => {
        const textInput = item.querySelector('.text-input');
        const text = textInput.value;
        const hexColor = item.querySelector('.color-picker').value;
        const hexCode = `#c${hexColor.slice(1)}`; // Hex code format with the 'c' prefix

        if (text) {
            const combinedLength = hexCode.length + text.length;  // Length of '#cRRGGBB' + text

            if (totalCharacters + combinedLength <= CHAR_LIMIT) {
                totalCharacters += combinedLength;
                allTexts += `${hexCode}${text} `;
            } else {
                const remainingChars = CHAR_LIMIT - totalCharacters - hexCode.length;
                if (remainingChars > 0) {
                    textInput.value = text.slice(0, remainingChars);  // Trim the text to fit the limit
                    showPopup("Character limit reached!");
                }
            }
        }
    });

    // Update the content of the live result
    liveResult.textContent = allTexts.trim();
}

// Make live result section editable
liveResult.setAttribute('contenteditable', 'true');
liveResult.addEventListener('input', (event) => {
    const newText = event.target.textContent;
    const allHexCodes = newText.match(/#c[0-9a-fA-F]{6}/g) || [];
    const textWithoutHex = newText.replace(/#c[0-9a-fA-F]{6}/g, '');

    totalCharacters = newText.length;  // Update the character count with the new live result content

    if (totalCharacters > CHAR_LIMIT) {
        event.target.textContent = newText.slice(0, CHAR_LIMIT);  // Limit text to CHAR_LIMIT
        showPopup("Character limit reached!");
    }
});

// Copy the content of the live result to clipboard
copyButton.addEventListener('click', () => {
    const textToCopy = liveResult.textContent;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showPopup("Copied!");
        });
    }
});

// Show the popup
function showPopup(message) {
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
}
