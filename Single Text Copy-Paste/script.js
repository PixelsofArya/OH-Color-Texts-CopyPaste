// Get elements from the DOM
const colorPicker = document.getElementById('colorPicker');
const textInput = document.getElementById('textInput');
const copyButton = document.getElementById('copyButton');
const resetButton = document.getElementById('resetButton');
const charCount = document.getElementById('charCount');

// Function to show popups
function showPopup(message) {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.style.position = 'absolute';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#4CAF50';
    popup.style.color = 'white';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '9999';

    textInput.parentNode.appendChild(popup);  // Append popup inside the textInput's container

    // Remove the popup after 2 seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Update character count on input
textInput.addEventListener('input', () => {
    const remainingChars = 132 - textInput.value.length; // 100 is the max length
    charCount.textContent = `Characters left: ${remainingChars}`;
});

// Copy text and color hex when the copy button is clicked
copyButton.addEventListener('click', () => {
    if (textInput.value.trim() === '') {
        // Show a message if no text is entered
        return;  // Exit if there is no text
    }

    const selectedColor = colorPicker.value;  // Get the color hex code
    const text = textInput.value;              // Get the user input text

    // Modify the text to follow the format: #c<color hex><text>
    const textWithColor = `#c${selectedColor.slice(1)}${text}`;  // Add '#' and 'c' to the text with color hex

    // Create a temporary textarea to copy the text with the hashtag and color code
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textWithColor;  // Set the value of the text to be copied
    document.body.appendChild(tempTextArea);  // Append it to the body
    tempTextArea.select();  // Select the text
    document.execCommand('copy');  // Copy the text to clipboard
    document.body.removeChild(tempTextArea);  // Remove the temporary textarea

    showPopup('Copied!');  // Show the "Copied" popup
});

// Reset the color picker, text area, and character count when the reset button is clicked
resetButton.addEventListener('click', () => {
    textInput.value = '';  // Clear the text area
    colorPicker.value = '#000000';  // Reset the color picker to black
    charCount.textContent = 'Characters left: 132';  // Reset character count to 100
    showPopup('Reset!');  // Show the "Reset" popup
});
