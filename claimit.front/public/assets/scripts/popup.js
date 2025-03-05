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
            console.log('Airdrop added:', result);
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

document.getElementById('notificationIcon').addEventListener('click', async function () {
    // Fetch notifications from the API
    try {
        const response = await fetch("https://localhost:7000/Notifications");
        const notifications = await response.json(); // Assuming the response is in JSON format

        // Get the container where notifications will be displayed
        const container = document.querySelector("#notificationPopup");
        container.innerHTML = `
            <div class="notificationPopup fade-in">
                <button id="closePopup" class="closePopup">❌</button>
                <div class="notification-container">
                    <h1>Notifications</h1>
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
                    console.log(airdrop + airdrop.iconURL);
                    airdropImage = airdrop.iconURL;
                }
            } catch (airdropError) {
                console.error("Error fetching airdrop details:", airdropError);
            }
            const date = new Date(notif.createdAt);

            notifdiv.innerHTML = `
                <img src="${airdropImage}"  class="airdrop-image"/>
                <div class="notif-text">
                    <h3>${notif.subject} <a class="notif-date">${date.toISOString().split('T')[0]}</a></h3>
                    <p>${notif.body}</p>
                </div>
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
                taskContainer.style.color = "#00cd0a";
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