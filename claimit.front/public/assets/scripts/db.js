// UTILS
async function fetchCoinPrice(coinName) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`);
        const data = await response.json();

        const price = data[coinName]?.usd;
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

        // Loop through tasks and create their elements
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

            let countdownHTML = "";
            if (task.deadline) {
                countdownHTML = `<span class="countdown" data-deadline="${task.deadline}"></span>`;
            }

            const tasklevel = task.level;
            let taskxp = 0;
            switch (tasklevel) {
                case 1:
                    taskxp = 100;
                    break;
                case 2:
                    taskxp = 60;
                    break;
                case 3:
                    taskxp = 30;
                    break;
                case 4:
                    taskxp = 10;
                    break;
                default:
                    taskxp = 5;
            }

            if (task.type === "Once") {
                taskdiv.innerHTML = `
                  <input id="taskComplete" type="checkbox">
                  <img height="30px" width="30px" style="border-radius: 50%; margin-right: 2px;" src="${airdropImage}" />
                  <span class="taskDescription">${task.label}<br>
                  <a style="font-size: 12px;" class="tutorialLink" href="${task.url}" target="_blank">Complete it now</a>
                  <a class="taskXp">+${taskxp}XP</a>
                  </span>
                  ${countdownHTML}
              `;
            } else {
                taskdiv.innerHTML = `
                  <input id="taskComplete" type="checkbox">
                  <img height="30px" width="30px" style="border-radius: 50%; margin-right: 2px;" src="${airdropImage}" />
                  <span class="taskDescription">[${task.type}] ${task.label}<br>
                      <a style="font-size: 12px;" class="tutorialLink" href="${task.url}" target="_blank">Complete it now</a>
                      <a class="taskXp">+${taskxp}XP</a>
                  </span>
              `;
            }

            taskList.appendChild(taskdiv);
        }

        const buttonWrapper = document.createElement("div");
        buttonWrapper.style.display = "flex";
        buttonWrapper.style.justifyContent = "center";
        buttonWrapper.style.marginTop = "10px";

        const openAllTasksButton = document.createElement("button");
        openAllTasksButton.textContent = "Open All Tasks";
        openAllTasksButton.id = "openAllTasks";

        openAllTasksButton.addEventListener("click", () => {
            tasks.forEach(task => {
                window.open(task.url, '_blank');
            });
        });
        buttonWrapper.appendChild(openAllTasksButton);
        taskList.appendChild(buttonWrapper);

        // startCountdowns();
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}


function startCountdowns() {
    const countdownElements = document.querySelectorAll(".countdown");

    function updateCountdown() {
        const now = new Date().getTime();

        countdownElements.forEach(element => {
            const deadline = new Date(element.getAttribute("data-deadline")).getTime();
            const timeRemaining = deadline - now;

            if (timeRemaining <= 0) {
                element.innerHTML = `<span style="color: red;">Expired</span>`;
            } else {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                element.innerHTML = `<span style="color: #00ff0d;">${days}d ${hours}h ${minutes}m ${seconds}s</span>`;
            }
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
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

    const response = await fetch("https://localhost:7000/UserAirdrop/User/1/Airdrops");
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userAirdrops = await response.json();
    console.log(userAirdrops);
    const container = document.getElementById("airdropList");
    container.innerHTML = "";

    let totalAmount = 0;
    for (const uAirdrop of userAirdrops) {
        const resp = await fetch(`https://localhost:7000/Airdrops/${uAirdrop.airdropId}`);
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        const airdrop = await resp.json();
        console.log(airdrop);
        const coinPrice = await fetchCoinPrice(airdrop.coinGeckoTicker) || 0;
        const amountValue = 127 * coinPrice;

        totalAmount += parseFloat(amountValue) || 0;

        const button = document.createElement("button");
        button.className = "projectRow";
        button.onclick = () => {
            // Only open the airdrop tab if it's not a claim button click
            openAirdropTab(uAirdrop, airdrop, coinPrice, amountValue);
        };

        const img = document.createElement("img");
        img.className = "coinIcon";
        img.alt = airdrop.label;
        img.height = 35;
        img.width = 35;
        img.style.borderRadius = "50%";
        img.src = airdrop.iconURL || "https://png.pngtree.com/png-clipart/20221014/original/pngtree-colorful-circle-logo-design-frame-png-image_8688484.png";

        const infoCont = document.createElement("div")
        infoCont.className = "coinContainer";
        const infoDiv = document.createElement("div");
        infoDiv.className = "coinInfos";
        const infoDiv2 = document.createElement("div");
        infoDiv2.className = "coinInfos";

        const label = document.createElement("a");
        label.className = "coinLabel";
        label.textContent = airdrop.label;
        const claim = document.createElement("button");
        claim.className = "claimbutton";
        claim.id = "claimButton"
        claim.textContent = "Claim >";
        const amount = document.createElement("a");
        amount.className = "coinAmount";
        amount.textContent = "$" + amountValue.toFixed(2);

        if (uAirdrop.allocation == 0) {
            claim.classList.remove("hide");
        }

        const claimedText = document.createElement("div");
        claimedText.className = "claimedStatus";
        if (airdrop.claimed) {
            claimedText.classList.add("claimed");
            claimedText.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check mr-1"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Claimed
            `;
            }
        else {
            claimedText.classList.add("notClaimed");
            claimedText.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock mr-1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>In Progress
            `;
            }


        infoDiv.appendChild(label);
        button.appendChild(img);
        if (uAirdrop.allocation > 0) {
            claim.classList.add("hide");
        }
        
        infoDiv2.innerHTML = `
            <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock mr-1">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                5d 11h $${amountValue.toFixed(2)}
            </a>
        `;
        
        infoDiv.appendChild(claimedText);
        infoCont.appendChild(infoDiv);
        infoCont.appendChild(infoDiv2);
        button.appendChild(infoCont);

        container.appendChild(button);

        // Claim button functionality
        claim.addEventListener('click', async function (e) {
            e.stopPropagation(); // Prevent the event from propagating to the parent button's click event
            // Create a dark overlay
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            document.body.appendChild(overlay);
            const container = document.querySelector("#claimPopup");
            container.innerHTML = `
          <div class="Very-Smol-Popup center fade-in">
              <button id="closePopup" class="closePopup">❌</button>
              <div class="Popup-container">
                  <h1 style="font-size: 28px; margin-top: 22px; font-weight: bold;">🎉<br>Claim Your $${airdrop.label}</h1>
                  <div style="margin-top: 5px;">
                      <h2 style="font-size: 20px; color:#c4c4c4; margin:0;">Your rewards are waiting! Claim them now <a href="https://google.com" target="_blank" style="color: #57b3fe; font-weight: bold;">here</a>.</h2>
                      <h3 style="margin-top: 20px; font-size: 24px;">You’ve won 🎁:</h3>
                      <div style="display: flex; justify-content: center; align-items: center; margin-top: 5px;">
                          <input type="text" id="tokenAmount" placeholder="🪙 Allocated tokens" style="padding: 8px; border-radius: 5px; border: 1px solid #ccc; text-align: center;">
                          <button id="saveAllocation" style="padding: 7px 15px; margin: 0;">Save</button>
                      </div>
                  </div>
              </div>
          </div>
          `;
            document.getElementById('closePopup').addEventListener('click', function () {
                container.innerHTML = ""; // Clear popup content
                document.body.removeChild(overlay); // Remove overlay
            });

            // Also close when clicking outside the popup
            overlay.addEventListener('click', function () {
                container.innerHTML = "";
                document.body.removeChild(overlay);
            });
        });

        infoDiv.appendChild(claim);
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


async function openAirdropTab(userAirdrop, airdrop, coinPrice, amountValue) {
    let wallet = "";
    try {
        const resp = await fetch(`https://localhost:7000/Wallets/${userAirdrop.walletId}`);
        if (resp.ok) {
            wallet = await resp.json();
        }
    } catch (walletError) {
        console.error("Error fetching wallet details:", walletError);
    }

    // Move copyToClipboard function outside of openAirdropTab for better access
    function copyToClipboard() {
        const text = wallet.address;
        navigator.clipboard.writeText(text).then(() => {
            alert('Address copied to clipboard!');
        });
    }

    const container = document.querySelector("#airdropPopup");
    container.innerHTML = `
      <div class="Popup fade-in">
          <button id="closePopup" class="closePopup">❌</button>
          <div class="Popup-container">
              <h1>${airdrop.label}</h1><br>
              <hr style="color:grey; background-color: grey;"><br>
              <div style="display:flex; justify-content: center;">
              <button id="copyButton">Copy</button>
              </div>
              <h2 id="walletAddress" class="copiable-text">${wallet.address.slice(0, 6) + "..." + wallet.address.slice(-6)}</h2>
              <h3>Balance</h3>
              <button class="projectRow airdropDetail">
                  <img class="coinIcon" alt="airdrop.label" height="35" width="35" style="border-radius: 50%;" 
                      src="${airdrop.iconURL}">
                  <div style="display:block; margin-left: 30px">
                      <div style="display:flex;">
                      <a class="">${airdrop.label}</a>
                      <a class="coinAmount" style="margin-left:5px;">$${coinPrice}</a>
                      </div>
                      <div style="display:flex;">
                      <a class="">${amountValue.toFixed(2)} ${airdrop.coinGeckoTicker}</a>
                      </div>
                  </div>
              </button>
              <h2>${airdrop.description}</h2>
              <h3>Details</h3>
              <div class="airdropDetails">
              <p>Phase : ${airdrop.phase}</p>
              <p>Network : ICO ${airdrop.blockchain}</p>
              <p>X : ${airdrop.xAccount}</p>
              <p>Official Website : ${airdrop.websiteURL}</p>
              <p>Verified : ${airdrop.verifiedByTeam}</p>
              <p>Start Date : ${airdrop.startDate}</p>
              <p>Ending Date: ${airdrop.endDate}</p>
              </div>
          </div>
      </div>
  `;

    // Adding event listener for the "Copy" button
    document.getElementById('copyButton').addEventListener('click', copyToClipboard);

    // Adding event listener for closing the popup
    document.getElementById('closePopup').addEventListener('click', function () {
        container.innerHTML = ``;
    });
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

