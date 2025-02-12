import { getAirdrops, addAirdrop, updateAirdrop, deleteAirdrop } from "./db.js";

// Charger les airdrops dynamiquement dans le bouton
async function loadAirdrops() {
    const airdrops = await getAirdrops();
    const container = document.getElementById("airdropList");
    container.innerHTML = ""; // Nettoyer la liste avant d'ajouter les nouveaux éléments

    airdrops.forEach(airdrop => {
        // Création du bouton
        const button = document.createElement("button");
        button.className = "projectRow";
        button.onclick = () => markAsClaimed(airdrop.id);

        // Ajout de l'icône
        const img = document.createElement("img");
        img.className = "coinIcon";
        img.alt = airdrop.name;
        img.height = 35;
        img.width = 35;
        img.style.borderRadius = "50%";
        img.src = airdrop.image || "https://png.pngtree.com/png-clipart/20221014/original/pngtree-colorful-circle-logo-design-frame-png-image_8688484.png"; // Image par défaut si pas d'image

        // Création du conteneur des infos
        const infoDiv = document.createElement("div");
        infoDiv.className = "coinInfos";

        // Nom de l'airdrop
        const label = document.createElement("a");
        label.className = "coinLabel";
        label.textContent = airdrop.name;

        // Montant de l'airdrop
        const amount = document.createElement("a");
        amount.className = "coinAmount";
        amount.textContent = "$" + (airdrop.amount || "0.00");

        // Delete project
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.onclick = (event) => {
            event.stopPropagation();
            removeAirdrop(airdrop.id);
        };

        // Construction de la structure HTML
        infoDiv.appendChild(label);
        infoDiv.appendChild(amount);
        button.appendChild(img);
        button.appendChild(infoDiv);
        // button.appendChild(deleteBtn);

        // Ajout du bouton dans le conteneur
        container.appendChild(button);
    });
}

async function removeAirdrop(id) {
    await deleteAirdrop(id);
    loadAirdrops(); // Recharger la liste après suppression
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

// Marquer un airdrop comme réclamé
async function markAsClaimed(id) {
    await updateAirdrop(id, true);
    loadAirdrops(); // Recharger la liste après mise à jour
}

// Charger les airdrops au démarrage
document.addEventListener("DOMContentLoaded", loadAirdrops);
