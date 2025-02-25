const DB_NAME = "ClaimItDB";
const DB_VERSION = 1;
const STORE_NAME = "airdrops";

// Ouvre la base de données
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                store.createIndex("name", "name", { unique: false });
                store.createIndex("amount", "amount", { unique: false });
                store.createIndex("image", "image", { unique: false }); 
                store.createIndex("claimed", "claimed", { unique: false }); 
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

async function viewAirdrops() {
    const airdrops = await getAirdrops();
    console.log(airdrops);  // You can display them in the dashboard instead of just logging them.
}
viewAirdrops();


// Ajoute un airdrop
async function addAirdrop(name, amount = 0, image = "", claimed = false) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.add({ name, amount, image, claimed });

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}


// Récupère tous les airdrops
async function getAirdrops() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

// Met à jour un airdrop
async function updateAirdrop(id, claimed) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (data) {
                data.claimed = claimed;
                const updateRequest = store.put(data);
                updateRequest.onsuccess = () => resolve(true);
            } else {
                resolve(false);
            }
        };

        getRequest.onerror = (event) => reject(event.target.error);
    });
}

// Supprime un airdrop
async function deleteAirdrop(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
    });
}
// Export des fonctions
export { addAirdrop, getAirdrops, updateAirdrop, deleteAirdrop };
