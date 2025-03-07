import { loadAirdrops, loadSuggestions, loadTasks, loadWallets } from "./db.js";

let completedTasks = 0;
let totalTasks = 0;

async function removeAirdrop(id) {
    await deleteAirdrop(id);
    loadAirdrops();
}

document.getElementById('addAirdropBtn').addEventListener('click', async function () {
    const name = document.getElementById('airdropName').value;
    const amount = document.getElementById('airdropAmount').value;
    const image = document.getElementById('airdropImage').value;
    const claimed = document.getElementById('airdropClaimed').value;

    if (name && amount && image && claimed) {
        try {
            const result = await addAirdrop(name, amount, image, false); // Call the addAirdrop function from db.js
            document.getElementById('airdropName').value = '';
            document.getElementById('airdropAmount').value = '';
            document.getElementById('airdropImage').value = '';
            document.getElementById('airdropClaimed').value = false;
        } catch (error) {
            console.error('Error adding airdrop:', error);
        }
    } else {
        alert('Please enter a name for the airdrop.');
    }
    loadAirdrops();
});

document.getElementById('tipbutton').addEventListener('click', async function () {
    const container = document.querySelector("#tipPopup");

    // Create a dark overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    container.innerHTML = `
    <div class="Smol-Popup fade-in">
        <button id="closePopup" class="closePopup">❌</button>
        <div class="Popup-container">
            <h1>🚀</h1>
            <h1 style="background: linear-gradient(90deg, #FF7EB3, #FF758C, #FF5E62);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: bold;">Claim Successful! </h1>
            <a style="font-size:22px; font-weight: 600;">Congratulations! You've received 
                <a style="background: linear-gradient(90deg, #FFD700, #FFB800, #FFA500);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: bold; font-size:22px; font-weight: 600;">120 $TOKEN</a>.
            </a>
            <br>            <br>
            <a style="font-size:14px; margin: 0 10px;">If ClaimIt helped you, a small donation goes a long way to keep us going! ❤️</a><br>
            <br>
            <div class="center">
            <button id="actionButton" class="donateButton">Donate</button>
            </div>
            <ul class="tipList">
                <li>🎖️    Unlock an exclusive badge to show your support!</li>
                <li>💎    Gain VIP status and stand out in the ClaimIt community!</li>
                <li>☯️    Earn some good karma—your future self will thank you. 😎</li>
                <li>🚀    Boost your XP, and help us improve ClaimIt for everyone.</li>
            </ul>
        </div>
    </div>
    `;

    // Close the popup when clicking on the close button
    document.getElementById('closePopup').addEventListener('click', () => {
        container.innerHTML = ''; // Clear the popup
        document.body.removeChild(overlay); // Remove the overlay
    });
});



document.getElementById('notificationIcon').addEventListener('click', async function () {
    // Fetch notifications from the API
    try {
        const response = await fetch("https://localhost:7000/Notifications");
        const notifications = await response.json(); // Assuming the response is in JSON format

        // Get the container where notifications will be displayed
        const container = document.querySelector("#notificationPopup");
        container.innerHTML = `
            <div class="Popup fade-in">
                <button id="closePopup" class="closePopup">❌</button>
                <div class="Popup-container">
                    <h1>Notifications</h1><br>
                    <hr>
                    <div id="notificationsList"></div>
                </div>
            </div>
        `;

        // Populate the notifications list
        const notificationList = document.getElementById('notificationsList');
        for (const notif of notifications) { // Change from 'in' to 'of'
            const notifdiv = document.createElement("button");
            notifdiv.className = "projectRow";
            let airdropImage = ""
            try {
                const airdropResponse = await fetch(`https://localhost:7000/Airdrops/${notif.airdropId}`);
                if (airdropResponse.ok) {
                    const airdrop = await airdropResponse.json();
                    airdropImage = airdrop.iconURL;
                }
            } catch (airdropError) {
                console.error("Error fetching airdrop details:", airdropError);
            }
            const date = new Date(notif.createdAt);

            notifdiv.innerHTML = `
                <a class="notif-subject" href="${notif.url}" target="_blank">
                    <img src="${airdropImage}"  class="airdrop-image"/>
                    <div class="notif-text">
                        <h3 class="notif-subject">${notif.subject} <br>
                        <a class="notif-date">${date.toISOString().split('T')[0]}</a></h3>
                        <p>${notif.body}</p>
                    </div>
                </a>
            `;
            notificationList.appendChild(notifdiv); // Append to the list
        }


        // Close the popup
        document.getElementById('closePopup').addEventListener('click', function () {
            container.innerHTML = ``;
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
});




document.getElementById("showForm").addEventListener("click", function () {
    const form = document.getElementById("addAirdropForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
});

async function markAsClaimed(id) {
    await updateAirdrop(id, true);
    loadAirdrops();
}
// Load wallets when the page loads
document.addEventListener("DOMContentLoaded", loadWallets);

// Load airdrops when the page loads
document.addEventListener("DOMContentLoaded", loadAirdrops);

// Load suggestions when the page loads
document.addEventListener("DOMContentLoaded", loadSuggestions);

// Load Tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("change", function (event) {
        if (event.target.id === "taskComplete" && event.target.checked) {
            triggerConfetti();
            event.target.classList.add("hide");
            const taskContainer = event.target.closest(".task");
            if (taskContainer) {
                taskContainer.classList.add("taskHidden");
                taskContainer.style.backgroundColor = "#000";
                taskContainer.style.color = "#00ff0d";
            }
        }
    });
});

function triggerConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * 50 - 20}vh`; // Randomize start position (-20vh to 50vh)
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random fall speed

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 1000);
}

function getRandomColor() {
    const colors = ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#ff99ac", "#fb5607", "#ffbe0b", "#3a86ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}