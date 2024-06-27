document.addEventListener("DOMContentLoaded", function() {
    const keys = document.querySelectorAll(".keyboard_hotspot");
    const keyPressedDisplay = document.getElementById("key-pressed");
    const MAX_KEY_HISTORY = 10; // 최대 기록할 키의 개수

    // 배열로 key history를 관리
    let keyHistory = [];

    // Create a mapping of key codes to key elements
    const keyMap = {};
    keys.forEach(key => {
        const keyId = key.id.split('_')[1]; // Extract the key code from the id
        if (!keyMap[keyId]) {
            keyMap[keyId] = [];
        }
        keyMap[keyId].push(key);
    });

    // Add event listeners for keydown and keyup events
    document.addEventListener("keydown", function(event) {
        const keyId = event.keyCode.toString();
        const keyElements = keyMap[keyId];
        
        if (keyElements) {
            event.preventDefault();
            event.stopPropagation();

            keyElements.forEach(key => {
                if (!key.classList.contains('active')) {
                    key.classList.add('active');
                }
            });
        }
    });

    document.addEventListener("keyup", function(event) {
        const keyId = event.keyCode.toString();
        const keyElements = keyMap[keyId];
        
        if (keyElements) {
            keyElements.forEach(key => {
                key.classList.remove('active');
                key.classList.add('pressed');
            });

            // Add the pressed key to the history
            const pressedKey = keyElements[0].textContent.trim();
            keyHistory.push(pressedKey);

            // Trim the history if it exceeds the maximum allowed
            if (keyHistory.length > MAX_KEY_HISTORY) {
                keyHistory = keyHistory.slice(1); // Remove the oldest key
            }

            // Update the displayed key history
            updateKeyPressedDisplay();
        }
    });

    // Function to update the displayed key history
    function updateKeyPressedDisplay() {
        // Display up to MAX_KEY_HISTORY items from keyHistory
        let displayText = "";
        for (let i = Math.max(0, keyHistory.length - MAX_KEY_HISTORY); i < keyHistory.length; i++) {
            displayText += `Key pressed: ${keyHistory[i]}<br>`;
        }
        keyPressedDisplay.innerHTML = displayText;
    }
});
