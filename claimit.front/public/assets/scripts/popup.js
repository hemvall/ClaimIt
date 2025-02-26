import { getAirdrops, addAirdrop, updateAirdrop, deleteAirdrop } from "./db.js";

async function loadWallets() {
    try {
        const response = await fetch("https://localhost:7000/Wallets");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const wallets = await response.json();
        const container = document.querySelector("#content2");
        container.innerHTML = ""; // Clear previous content

        wallets.forEach(wallet => {
            const walletDiv = document.createElement("div");
            walletDiv.className = "walletRow";

            // Create label for the wallet
            const label = document.createElement("h3");
            label.textContent = wallet.label + " ";
            label.style.fontSize = "18px";
            label.style.fontWeight = "600"; // Slightly bold for emphasis

            // Create address element
            const address = document.createElement("p");
            address.textContent = wallet.address.slice(0, 6) + "..." + wallet.address.slice(-6);
            address.style.fontSize = "14px";
            address.style.color = "#888"; // Light gray color to differentiate from label
            address.style.marginTop = "5px"; // Space between label and address

            // Set platform icon based on the wallet platform
            let platformIcon = "";
            if (wallet.platform == "Phantom") {
                platformIcon = "https://187760183-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MVOiF6Zqit57q_hxJYp%2Fuploads%2FHEjleywo9QOnfYebBPCZ%2FPhantom_SVG_Icon.svg?alt=media&token=71b80a0a-def7-4f98-ae70-5e0843fdaaec";
            } else {
                platformIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png";
            }

            // Create the platform icon element
            const platformIconElement = document.createElement("img");
            platformIconElement.src = platformIcon;
            platformIconElement.alt = wallet.platform;
            platformIconElement.height = 20;  // Adjust size as needed
            platformIconElement.style.marginLeft = "10px";
            platformIconElement.style.verticalAlign = "middle";  // Align with text vertically

            // Append platform icon, label, and address to walletDiv
            walletDiv.appendChild(platformIconElement);
            walletDiv.appendChild(label);
            walletDiv.appendChild(address);

            // Add walletDiv to container
            container.appendChild(walletDiv);
        });

    } catch (error) {
        console.error("Error loading wallets:", error);
    }
}

async function loadSuggestions() {
    try {
        const response = await fetch("https://localhost:7000/Suggestions");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const suggestions = await response.json();
        const container = document.querySelector("#content3");  // Assuming you have a container for suggestions
        container.innerHTML = "";  // Clear previous content

        for (const suggestion of suggestions) {
            // Fetch the airdrop information using suggestion.airdropId
            let airdropURL = `https://localhost:7000/Airdrops/${suggestion.airdropId}`;
            const airdropResponse = await fetch(airdropURL);
            const airdrop = await airdropResponse.json();

            // Create a suggestion container
            const suggestionDiv = document.createElement("div");
            suggestionDiv.className = "suggestionRow";

            // Airdrop Name and Icon container
            const airdropContainer = document.createElement("div");
            airdropContainer.className = "airdropContainer";

            // Airdrop Name
            const airdropName = document.createElement("h3");
            airdropName.textContent = airdrop.label;
            airdropName.classList.add("suggestionTitle");

            // Airdrop Icon
            const iconElement = document.createElement("img");
            iconElement.src = airdrop.iconURL;
            iconElement.alt = airdrop.label;
            iconElement.height = 40;
            iconElement.width = 40;
            iconElement.classList.add("airdropIcon");

            // Append the icon and name to the container
            airdropContainer.appendChild(iconElement);
            airdropContainer.appendChild(airdropName);

            // Suggestion Potential
            const potential = document.createElement("p");
            potential.textContent = `Potential: $${suggestion.potential}`;
            potential.classList.add("potential");

            // Time Cost
            const timeCost = document.createElement("p");
            timeCost.textContent = `Time Cost: ${suggestion.timeCost} minutes`;
            timeCost.classList.add("costInfo");

            // Farm Cost
            const farmCost = document.createElement("p");
            farmCost.textContent = `Farm Cost: $${suggestion.farmCost}`;
            farmCost.classList.add("costInfo");

            // Tutorial Link
            const tutorialLink = document.createElement("a");
            tutorialLink.href = suggestion.tutorialSource;
            tutorialLink.textContent = "View Tutorial";
            tutorialLink.classList.add("tutorialLink");
            tutorialLink.setAttribute("target", "_blank");

            // Append the airdrop container (icon and name)
            if (airdropResponse.ok) {
                suggestionDiv.appendChild(airdropContainer);
            }

            // Append suggestion details
            suggestionDiv.appendChild(potential);
            suggestionDiv.appendChild(timeCost);
            suggestionDiv.appendChild(farmCost);
            suggestionDiv.appendChild(tutorialLink);

            // Append suggestionDiv to the container
            container.appendChild(suggestionDiv);
        }

    } catch (error) {
        console.error("Error loading suggestions:", error);
    }
}


async function loadAirdrops() {
    const airdrops = await getAirdrops();
    const container = document.getElementById("airdropList");
    container.innerHTML = "";

    let totalAmount = 0;
    for (const airdrop of airdrops) {
        const coinPrice = await fetchCoinPrice(airdrop.name) || 0;
        const amountValue = airdrop.amount * coinPrice;

        totalAmount += parseFloat(amountValue) || 0;

        const button = document.createElement("button");
        button.className = "projectRow";
        button.onclick = () => {
            chrome.windows.create({
                url: `airdrop.html?name=${encodeURIComponent(airdrop.name)}&amount=${airdrop.amount}&image=${encodeURIComponent(airdrop.image)}`,
                type: "popup",
                width: 400,
                height: 600
            });
        };
        const img = document.createElement("img");
        img.className = "coinIcon";
        img.alt = airdrop.name;
        img.height = 35;
        img.width = 35;
        img.style.borderRadius = "50%";
        img.src = airdrop.image || "https://png.pngtree.com/png-clipart/20221014/original/pngtree-colorful-circle-logo-design-frame-png-image_8688484.png";

        const infoDiv = document.createElement("div");
        infoDiv.className = "coinInfos";

        const label = document.createElement("a");
        label.className = "coinLabel";
        label.textContent = airdrop.name;

        const amount = document.createElement("a");
        amount.className = "coinAmount";
        amount.textContent = "$" + amountValue.toFixed(2);

        const claimedText = document.createElement("span");
        claimedText.className = "claimedStatus";
        claimedText.classList.add(airdrop.claimed ? "claimed" : "notClaimed");
        claimedText.textContent = airdrop.claimed ? "Claimed" : "Farming";


        infoDiv.appendChild(label);
        infoDiv.appendChild(claimedText);
        infoDiv.appendChild(amount);
        button.appendChild(img);
        button.appendChild(infoDiv);
        container.appendChild(button);
    }
    const totalAmountElement = document.querySelector(".title");
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    updateProgressBar(totalAmount);
}

function updateProgressBar(totalAmount) {
    let level = 1;
    let progress = 0;
    let sumToGet = 0;

    if (totalAmount >= 1000) {
        sumToGet = 999999;
        level = Math.floor(totalAmount / 1000) + 3; // Beyond level 3
        progress = 100;
    } else if (totalAmount >= 500) {
        sumToGet = 1000 - totalAmount;
        level = 3;
        progress = ((totalAmount - 500) / 500) * 100;
    } else if (totalAmount >= 100) {
        sumToGet = 500 - totalAmount;
        level = 2;
        progress = ((totalAmount - 100) / 400) * 100;
    } else {
        sumToGet = 100 - totalAmount;
        progress = (totalAmount / 100) * 100;
    }


    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("level-text").innerHTML = `<strong>Level ${level}:</strong> ${sumToGet.toFixed(2)}$ left before next step`;
}


async function fetchCoinPrice(coinName) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`);
        const data = await response.json();

        const price = data[coinName]?.usd;
        console.log(`${coinName} price: $${price}`);
        return price || 0;
    } catch (error) {
        console.error(`Error fetching ${coinName} price:`, error);
        return 0;
    }
}

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
