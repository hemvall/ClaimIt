import { getAirdrops, addAirdrop, updateAirdrop, deleteAirdrop } from "./db.js";

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

        infoDiv.appendChild(label);
        infoDiv.appendChild(amount);
        button.appendChild(img);
        button.appendChild(infoDiv);
        container.appendChild(button);
    }

    const totalAmountElement = document.querySelector(".title");
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
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

document.getElementById('addAirdropBtn').addEventListener('click', async function() {
    const name = document.getElementById('airdropName').value;
    const amount = document.getElementById('airdropAmount').value;
    const image = document.getElementById('airdropImage').value;

    if (name && amount && image) {
        try {
            const result = await addAirdrop(name, amount, image, false); // Call the addAirdrop function from db.js
            console.log('Airdrop added:', result);
            document.getElementById('airdropName').value = '';
            document.getElementById('airdropAmount').value = '';
            document.getElementById('airdropImage').value = '';
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

// Charger les airdrops au démarrage
document.addEventListener("DOMContentLoaded", loadAirdrops);
