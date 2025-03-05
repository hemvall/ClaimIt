// UTILS
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


function completeTask(button) {
    button.parentElement.remove();
    completedTasks++;
    updateProgress();
}

function updateProgress() {
    const progressBar = document.getElementById("progress");
    const percent = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = percent + "%";
}

function updateProgressBar(totalAmount) {
    let rank = "Bronze";
    let rankIcon = "https://static.wikia.nocookie.net/leagueoflegends/images/c/cb/Season_2023_-_Bronze.png/revision/latest?cb=20231007195824";
    let progress = 0;
    let sumToGet = 0;

    if (totalAmount >= 5000) {
        sumToGet = 10000 - totalAmount;
        rank = "Master";
        rankIcon = "https://static.wikia.nocookie.net/leagueoflegends/images/6/64/Season_2023_-_Grandmaster.png/revision/latest?cb=20231007195830";
        progress = ((totalAmount - 5000) / 5000) * 100;
    } else if (totalAmount >= 1000) {
        sumToGet = 5000 - totalAmount;
        rank = "Platinum";
        rankIcon = "https://static.wikia.nocookie.net/leagueoflegends/images/b/bd/Season_2023_-_Platinum.png/revision/latest?cb=20231007195833";
        progress = ((totalAmount - 1000) / 4000) * 100;
    } else if (totalAmount >= 500) {
        sumToGet = 1000 - totalAmount;
        rank = "Gold";
        rankIcon = "https://static.wikia.nocookie.net/leagueoflegends/images/7/78/Season_2023_-_Gold.png/revision/latest?cb=20231007195829";
        progress = ((totalAmount - 500) / 500) * 100;
    } else if (totalAmount >= 100) {
        sumToGet = 500 - totalAmount;
        rank = "Silver";
        rankIcon = "https://static.wikia.nocookie.net/leagueoflegends/images/c/c4/Season_2023_-_Silver.png/revision/latest?cb=20231007195834";
        progress = ((totalAmount - 100) / 400) * 100;
    } else {
        sumToGet = 100 - totalAmount;
        progress = (totalAmount / 100) * 100;
    }
    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("rank-icon").innerHTML = `<img height="130" width="130; margin-top: 25px;" src="${rankIcon}"/> `;
    document.getElementById("level-text").innerHTML = `<strong>${rank} :</strong> ${sumToGet.toFixed(2)}$ left before next step`;
}


// FETCH API
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
            platformIconElement.height = 30;
            platformIconElement.style.marginLeft = "10px";
            platformIconElement.style.verticalAlign = "middle";

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

async function loadTasks() {
    try {
        const response = await fetch("https://localhost:7000/Tasks");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tasks = await response.json();
        const taskList = document.getElementById("tasks");

        for (const task of tasks) {
            let airdropLabel = "";
            let airdropImage = "";
            try {
                const airdropResponse = await fetch(`https://localhost:7000/Airdrops/${task.airdropId}`);
                if (airdropResponse.ok) {
                    const airdrop = await airdropResponse.json();
                    airdropLabel = airdrop.label;
                    airdropImage = airdrop.iconURL;
                }
            } catch (airdropError) {
                console.error("Error fetching airdrop details:", airdropError);
            }

            const taskdiv = document.createElement("div");
            taskdiv.className = "task";

            if (task.type === "Once") {
                taskdiv.innerHTML = `
                    <input id="taskComplete" type="checkbox">
                    <img height="30px" width="30px" style="border-radius: 50%; margin-right: 2px;" src="${airdropImage}" />
                    <span class="taskDescription">${task.label}<br>
                    <a style="font-size: 12px;" class="tutorialLink" href="${task.URL}" target="_blank">Complete it now</a>
                    </span>
                `;
            } else {
                taskdiv.innerHTML = `
                    <input id="taskComplete" type="checkbox">
                    <img height="30px" width="30px" style="border-radius: 50%; margin-right: 2px;" src="${airdropImage}" />
                    <span class="taskDescription">[${task.type}] ${task.label}<br>
                        <a style="font-size: 12px;" class="tutorialLink" href="${task.URL}" target="_blank">Complete it now</a>
                    </span>
                `;
            }

            taskList.appendChild(taskdiv);
        }
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

async function loadSuggestions() {
    try {
        const response = await fetch("https://localhost:7000/Suggestions");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const suggestions = await response.json();
        const container = document.querySelector("#content3");
        container.innerHTML = "";  // Clear previous content

        for (const suggestion of suggestions) {
            let airdropURL = `https://localhost:7000/Airdrops/${suggestion.airdropId}`;
            const airdropResponse = await fetch(airdropURL);
            const airdrop = await airdropResponse.json();

            const suggestionDiv = document.createElement("div");
            suggestionDiv.className = "suggestionRow";

            const airdropContainer = document.createElement("div");
            airdropContainer.className = "airdropContainer";

            const airdropName = document.createElement("h3");
            airdropName.textContent = airdrop.label;
            airdropName.classList.add("suggestionTitle");

            const iconElement = document.createElement("img");
            iconElement.src = airdrop.iconURL;
            iconElement.alt = airdrop.label;
            iconElement.height = 40;
            iconElement.width = 40;
            iconElement.classList.add("airdropIcon");

            const actionButton = document.createElement("button");
            actionButton.textContent = "Join project";
            actionButton.classList.add("minimalistButton");
            actionButton.onclick = () => window.open(airdrop.websiteURL, "_blank"); // Open airdrop website

            airdropContainer.appendChild(iconElement);
            airdropContainer.appendChild(airdropName);
            airdropContainer.appendChild(actionButton);

            const potential = document.createElement("p");
            potential.textContent = `Potential: $${suggestion.potential}`;
            potential.classList.add("potential");

            const timeCost = document.createElement("p");
            timeCost.textContent = `Time Cost: ${suggestion.timeCost} minutes`;
            timeCost.classList.add("costInfo");

            const farmCost = document.createElement("p");
            farmCost.textContent = `Farm Cost: $${suggestion.farmCost}`;
            farmCost.classList.add("costInfo");

            const tutorialLink = document.createElement("a");
            tutorialLink.href = suggestion.tutorialSource;
            tutorialLink.textContent = "View Tutorial";
            tutorialLink.classList.add("tutorialLink");
            tutorialLink.setAttribute("target", "_blank");

            if (airdropResponse.ok) {
                suggestionDiv.appendChild(airdropContainer);
            }

            suggestionDiv.appendChild(potential);
            suggestionDiv.appendChild(timeCost);
            suggestionDiv.appendChild(farmCost);
            suggestionDiv.appendChild(tutorialLink);

            container.appendChild(suggestionDiv);
        }


    } catch (error) {
        console.error("Error loading suggestions:", error);
    }
}

async function loadAirdrops() {
    // Show the skeleton loaders for title, subtitle, and progress bar
    document.querySelector(".title").classList.add('skeleton');
    document.querySelector(".subTitle").classList.add('skeleton');
    document.querySelector(".progress-bar").classList.add('skeleton');
    const response = await fetch("https://localhost:7000/Airdrops");
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const airdrops = await response.json();
    const container = document.getElementById("airdropList");
    container.innerHTML = "";
    
    let totalAmount = 0;
    for (const airdrop of airdrops) {
        console.log("Airdrop : " + airdrop);
        console.log("Ticker : " + airdrop.coinGeckoTicker);
        const coinPrice = await fetchCoinPrice(airdrop.coinGeckoTicker) || 0;
        const amountValue = 127 * coinPrice;

        totalAmount += parseFloat(amountValue) || 0;

        const button = document.createElement("button");
        button.className = "projectRow";
        button.onclick = () => {
            chrome.windows.create({
                url: `airdrop.html?name=${encodeURIComponent(airdrop.label)}&amount=${airdrop.id}&image=${encodeURIComponent(airdrop.iconURL)}`,
                type: "popup",
                width: 400,
                height: 600
            });
        };
        const img = document.createElement("img");
        img.className = "coinIcon";
        img.alt = airdrop.label;
        img.height = 35;
        img.width = 35;
        img.style.borderRadius = "50%";
        img.src = airdrop.iconURL || "https://png.pngtree.com/png-clipart/20221014/original/pngtree-colorful-circle-logo-design-frame-png-image_8688484.png";

        const infoDiv = document.createElement("div");
        infoDiv.className = "coinInfos";

        const label = document.createElement("a");
        label.className = "coinLabel";
        label.textContent = airdrop.label;

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

    // Update the title and subtitle with the total amount
    const totalAmountElement = document.querySelector("#title");
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;

    // Update progress bar with the total amount
    updateProgressBar(totalAmount);

    // Hide the skeleton loaders after data is loaded
    document.querySelector("#title").classList.remove('skeleton');
    document.querySelector("#subTitle").classList.remove('skeleton');
    document.querySelector(".progress-bar").classList.remove('skeleton');
}

// async 
//  loadNotifications() {
//     try {
//         const response = await fetch("https://localhost:7000/Notifications");
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const suggestions = await response.json();
//         const container = document.querySelector("#content3");
//         container.innerHTML = "";  // Clear previous content

//         for (const suggestion of suggestions) {
//             let airdropURL = `https://localhost:7000/Airdrops/${suggestion.airdropId}`;
//             const airdropResponse = await fetch(airdropURL);
//             const airdrop = await airdropResponse.json();
//         }
//     }
//     catch (error) {
//         console.error(`Error LoadNotifications: `, error);
//         return 0;
//     }
// }

export { loadAirdrops, loadSuggestions, loadTasks, loadWallets };

