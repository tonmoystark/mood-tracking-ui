let registrationForm = document.querySelector("#registrationForm");
let newAccountEmail = document.querySelector("#newAccountEmail");
let newAccountPassword = document.querySelector("#newAccountPassword");
let newAccountSubmit = document.querySelector("#newAccountSubmit");
let newAccountData = document.querySelector(".create-account");
let welcomeBack = document.querySelector("#back");
let logOutBtn = document.querySelector("#logOutBtn");
let h1Status = document.querySelector("#status");
let sleepData = []; // To track sleep data
let moodData = []; // To track mood data
function showCard(cardName){
    let card = document.querySelector(cardName);
    card.classList.remove("hide");
}

function hideCard(cardName){
    let card = document.querySelector(cardName);
    card.classList.add("hide");
}
//registration work 1st part started
registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (regexEmail.test(newAccountEmail.value) && regexPassword.test(newAccountPassword.value)) {
        hideCard(".registration");
        showCard(".create-account");
    }
    else {
        alert("Invalid email or password");
    }
})
//registration work 1st part finished

let uploadPicBtn = document.querySelector("#uploadButton");
let file = document.querySelector("#file");
// upload image part
uploadPicBtn.addEventListener("click", () => {
    file.click();
})

file.addEventListener("change", imageChanger);

function imageChanger(e) {
    let imageType = document.querySelector("#imageType");
    let imageTitle = document.querySelector("#imageTitle");
    let file = e.target.files[0];
    if(file){
        let reader = new FileReader();
    reader.readAsDataURL(file);
    imageType.textContent = file.type;
    imageTitle.textContent = file.name;
    reader.onload = () => {
        let imges = document.querySelectorAll(".profileImage");
        imges.forEach(img => {
            img.src = reader.result;
        })
    }
    }
    else{
        let imges = document.querySelectorAll(".profileImage");
        imges.forEach(img => {
            img.src = "./images/avatar-placeholder.svg";
            imageType.textContent = `Type not available`;
            imageTitle.textContent = `Select an image`;
        })
    }

}
//upload image part ended.

let createAccount = document.querySelector("#createAccount");

createAccount.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector(".create-account").classList.remove("centerDiv");

    let userName = document.querySelector("#userName");
    let name = document.querySelector(".name");
    let smallDataName = document.querySelector(".smallDataName");
    let smallDataEmail = document.querySelector(".smallDataEmail");
    if(userName.value !== "") {
        alert("Account created successfully");
        hideCard(".create-account");
        hideCard(".main-part");
        showCard(".profile");
        smallMenu.classList.add("hide"); //that small data card removed
        name.textContent = userName.value;
        smallDataName.textContent = userName.value;
        smallDataEmail.textContent = newAccountEmail.value;
    }
    else{
        alert("Please enter your name");
    }
})
//account created successfully

// date making

function displayCurrentDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${dayName}, ${date} ${monthName} ${year}`;
}

let date = document.querySelector(".date");
date.textContent = displayCurrentDate();

//date making ended

//small menu work started

let button = document.querySelector(".profile-check");
let smallMenu = document.querySelector(".smallData");
button.addEventListener("click", () => {
    smallMenu.classList.toggle("hide");
})

document.addEventListener('click', (e) => {
    const smallMenu = document.querySelector('.smallData');
    const profileButton = document.querySelector('.profile-check');
    
    if (!smallMenu.classList.contains('hide') && 
        !smallMenu.contains(e.target) && 
        !profileButton.contains(e.target)) {
            
        smallMenu.classList.add('hide');
    }
});

//small menu work ended
//log in card appearance

let logInCar = document.querySelector("#logInCar");
logInCar.addEventListener("click", (e) => {
    e.preventDefault();
    hideCard(".registration");
    showCard(".login");
});

//log in card appearance ended

//registration card appearance
let registrationCar = document.querySelector("#registrationCar");
registrationCar.addEventListener("click", (e) => {
    e.preventDefault();
    hideCard(".login");
    showCard(".registration");
});

//registration card appearance ended

// setting work started
// 1st part --> update data
let settingBtn = document.querySelector(".settingBtn");

// Replace the current settingBtn event listener with this:
settingBtn.addEventListener("click", () => {
    hideCard(".profile");
    showCard(".main-part");
    showCard(".create-account");
    document.querySelector(".create-account").classList.add("centerDiv");
    
    welcomeBack.textContent = "Update your data";

    // Optional: Pre-fill the form with existing user data
    document.querySelector("#userName").value = document.querySelector(".name").textContent;
});

// 1st part --> update data ended

// 2nd part --> log out

logOutBtn.addEventListener("click", () => {
    hideCard(".profile");
    showCard(".main-part");
    showCard(".login");
    console.log("clicked log out");
    
})

// 2nd part --> log out ended

// setting work ended

// log your mood today.

const moodIcons = {
    happy: "./images/icon-happy-color.svg",
    sad: "./images/icon-sad-color.svg",
    neutral: "./images/icon-neutral-color.svg",
    verySad: "./images/icon-sad-color.svg",
    veryHappy: "./images/icon-very-happy-color.svg"

}

let logMoodBtn = document.querySelector(".log-mood");

logMoodBtn.addEventListener("click", () => {
    showCard(".logging-select-mood");
    hideCard(".profile");
    resetAllInputs();
})

async function fetchMoods() {
    try {
        const response = await fetch("./moods.json");
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error("Error fetching moods:", error);
        return [];
    }
}


let continue1 = document.querySelector("#continue1");
let feelsImg = document.querySelector("#feelsImg");
let randomQuote = document.querySelector("#quote");
// Add this array to store mood data at the top with other variables


// Inside the continue1 event listener, add mood tracking
continue1.addEventListener("click", async () => {

    const checkedInput = document.querySelector('input[name="v-happy"]:checked');
    
    if (checkedInput) {
        const value = checkedInput.value;
        h1Status.textContent = value;
        
        let moodKey;
        let moodValue; // Add this to store numeric mood value

        // Set image source AND determine mood key for quotes
        if (value === "Very Happy") {
            feelsImg.src = moodIcons.veryHappy;
            moodKey = "2";
            moodValue = 2; // Add numeric value
        } else if (value === "Happy") {
            feelsImg.src = moodIcons.happy;
            moodKey = "1";
            moodValue = 1; // Add numeric value
        } else if (value === "Neutral") {
            feelsImg.src = moodIcons.neutral;
            moodKey = "0";
            moodValue = 0; // Add numeric value
        } else if (value === "Sad") {
            feelsImg.src = moodIcons.sad;
            moodKey = "-1";
            moodValue = -1; // Add numeric value
        } else if (value === "Very Sad") {
            feelsImg.src = moodIcons.verySad;
            moodKey = "-2";
            moodValue = -2; // Add numeric value
        }
        
        // Store mood data
        moodData.push(moodValue);
        
        // Calculate average mood if we have at least 5 entries
        
        
        // Fetch and set random quote
        try {
            const moodsData = await fetchMoods();
            if (moodsData.moodQuotes && moodsData.moodQuotes[moodKey]) {
                const quotes = moodsData.moodQuotes[moodKey];
                const randomIndex = Math.floor(Math.random() * quotes.length);
                randomQuote.textContent = quotes[randomIndex];
            }
        } catch (error) {
            console.error("Error setting random quote:", error);
            randomQuote.textContent = "Stay positive today!";
        }
        
        hideCard(".logging-select-mood");
        showCard(".logging-feeling");
    } else {
        alert("Please select a mood first");
    }
});

function updateMoodAverageDisplay() {
    const averageMoodDiv = document.querySelector("#averageMood").nextElementSibling;
    
    if (moodData.length >= 5) {
        const sum = moodData.reduce((a, b) => a + b, 0);
        const average = (sum / moodData.length).toFixed(1);
        
        let moodText;
        let moodIcon;
        
        if (average >= 1.5) {
            moodText = "Very Happy";
            moodIcon = "./images/icon-very-happy-color.svg";
            averageMoodDiv.style.backgroundColor = "#059669";
            averageSleepDiv.style.backgroundColor = "#059669";
        } else if (average >= 0.5) {
            moodText = "Happy";
            moodIcon = "./images/icon-happy-color.svg";
            averageMoodDiv.style.backgroundColor = "#2563eb";
            averageSleepDiv.style.backgroundColor = "#2563eb";
        } else if (average >= -0.5) {
            moodText = "Neutral";
            moodIcon = "./images/icon-neutral-color.svg";
            averageMoodDiv.style.backgroundColor = "#eab308";
            averageSleepDiv.style.backgroundColor = "#eab308";
        } else if (average >= -1.5) {
            moodText = "Sad";
            moodIcon = "./images/icon-sad-color.svg";
            averageMoodDiv.style.backgroundColor = "#f97316";
            averageSleepDiv.style.backgroundColor = "#f97316";
        } else {
            moodText = "Very Sad";
            moodIcon = "./images/icon-very-sad-color.svg";
            averageMoodDiv.style.backgroundColor = "#dc2626";
            averageSleepDiv.style.backgroundColor = "#dc2626";
        }
        
        averageMoodDiv.innerHTML = `
            <div class="flex items-center justify-center gap-2">
                <img src="${moodIcon}" class="tinyIcon" alt="${moodText}">
                <h1 class="text-lg md:text-xl font-bold">${moodText}</h1>
            </div>
            <p class="text-sm md:text-lg">Your average mood over the last ${moodData.length} check-ins</p>
        `;
    } else {
        // Clear the average display if we don't have enough data
        averageSleepDiv.style.backgroundColor = ""
        averageMoodDiv.style.backgroundColor = "";
        averageMoodDiv.innerHTML = `
            <div class="bg-slate-300 flex flex-col justify-start w-[90%] rounded-xl items-start py-5 px-2 mx-4">
                <h1 class="text-lg md:text-xl font-bold">Keep Tracking!</h1>
                <p class="text-sm md:text-lg">Log five check-ins to see your average mood</p>
            </div>`;
    }
}

//many moods.

let continue2 = document.querySelector("#continue2");
let selectedMood = document.querySelector("#selectedTags");

// Add change event listeners to checkboxes once
const checkBoxes = document.querySelectorAll(".feelTags input[type='checkbox']");
checkBoxes.forEach((box) => {
    box.addEventListener("change", updateSelectedTags);
});

// Function to update the selected tags display
function updateSelectedTags() {
    const checked = document.querySelectorAll(".feelTags input[type='checkbox']:checked");
    
    // Limit to 3 tags maximum
    const tags = Array.from(checked).slice(0, 3).map((box) => {
        return `#${box.nextElementSibling.textContent.trim()}`;
    });
    
    selectedMood.textContent = tags.join(" ");
}

// Handle the continue button click
continue2.addEventListener("click", () => {
    const checked = document.querySelectorAll(".feelTags input[type='checkbox']:checked");
    
    // Check if fewer than 3 tags are selected
    if (checked.length < 3) {
        alert(`Please select at least 3 tags. You've only selected ${checked.length}.`);
        return; // Stop execution, don't proceed to next card
    }
    
    // Update tags display
    updateSelectedTags();
    
    // Proceed to next card
    hideCard(".logging-feeling");
    showCard(".about-day");
});

//about the day work
// for textarea not more than 150 letters

  const textarea = document.getElementById("aboutDay");
  const charCount = document.getElementById("charCount");
  const maxLength = 150;

  textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length;

    if (currentLength > maxLength) {
      textarea.value = textarea.value.slice(0, maxLength);
      alert("You can’t type more than 150 characters!");
    }

    charCount.textContent = textarea.value.length;
  });

let continue3 = document.querySelector("#continue3");
let msg = document.querySelector(".random-msg");

continue3.addEventListener("click", () => {
  const text = textarea.value.trim();

  if (text === "") {
    alert("Please write something before continuing!");
    return; // stop here
  }

  hideCard(".about-day");
  showCard(".sleep-time");

  // put textarea value inside .random-msg
  msg.textContent = text;
});


let continue4 = document.querySelector("#continue4");

// Add event listener to the continue4 button
continue4.addEventListener("click", function() {

    hideCard(".sleep-time");
    showCard(".firstPart");
    showCard(".profile");
    const checkedInput = document.querySelector('input[name="sleep_hours"]:checked');


    if (checkedInput) {
        const label = document.querySelector(`label[for="${checkedInput.id}"]`);
        const hoursText = label.textContent;

        document.querySelector("#hours").textContent = hoursText;

        // Convert sleep text to numeric value for calculation
        let sleepValue;
        if (hoursText === "9+ hours") sleepValue = 9;
        else if (hoursText === "7-8 hours") sleepValue = 7.5;
        else if (hoursText === "5-6 hours") sleepValue = 5.5;
        else if (hoursText === "3-4 hours") sleepValue = 3.5;
        else if (hoursText === "0-2 hours") sleepValue = 1;

        // Store sleep data
        sleepData.push(sleepValue);
        
        // Calculate average if we have at least 5 entries
        updateSleepAverageDisplay()
        updateMoodAverageDisplay();
        // Bar heights
        const heightMap = {
            "9+ hours": 375,
            "7-8 hours": 300,
            "5-6 hours": 225,
            "3-4 hours": 150,
            "0-2 hours": 65
        };

        // Colors
        const colorMap = {
            "9+ hours": "bg-emerald-600",
            "7-8 hours": "bg-blue-600",
            "5-6 hours": "bg-yellow-500",
            "3-4 hours": "bg-orange-500",
            "0-2 hours": "bg-red-600"
        };

        // Icons (put your image paths here)
        const iconMap = {
            "9+ hours": "./images/icon-very-happy-color.svg",
            "7-8 hours": "./images/icon-happy-color.svg",
            "5-6 hours": "./images/icon-neutral-color.svg",
            "3-4 hours": "./images/icon-sad-color.svg",
            "0-2 hours": "./images/icon-very-sad-color.svg"
        };

        const barContainer = document.getElementById("barContainer");
        
        // Get all existing bars
        const existingBars = barContainer.querySelectorAll('.flex.flex-col.items-center');
        
        // Remove the oldest bar if we already have 10 bars
        if (existingBars.length >= 10) {
            existingBars[0].remove();
            // Also remove the oldest sleep data point to keep in sync
            if (sleepData.length > 10) {
                sleepData.shift();
            }
        }

        const barWrapper = document.createElement("div");
        barWrapper.className = "flex flex-col items-center";

        // Bar with dynamic color
        const bar = document.createElement("div");
        bar.className = `relative w-10 ${colorMap[hoursText]} rounded-md transition-all duration-700 flex justify-center`;
        bar.style.height = "0px"; // start collapsed

        // Icon inside bar (stick at top)
        const icon = document.createElement("img");
        icon.src = iconMap[hoursText];
        icon.className = "absolute -top-1 w-8 h-8"; 
        bar.appendChild(icon);

        barWrapper.appendChild(bar);

        // Date label
        const today = new Date();
        const options = { month: "short", day: "numeric" };
        const dateLabel = document.createElement("p");
        dateLabel.className = "mt-1 text-slate-600 text-xs";
        dateLabel.textContent = today.toLocaleDateString(undefined, options);
        barWrapper.appendChild(dateLabel);

        barContainer.appendChild(barWrapper);

        // Animate height
        setTimeout(() => {
            bar.style.height = heightMap[hoursText] + "px";
        }, 100);

        console.log("Tracked sleep hours:", hoursText);
    } else {
        alert("Please select your sleep hours first!");
    }
});

const averageSleepDiv = document.querySelector("#averageSleep");
function updateSleepAverageDisplay() {
    
    if (sleepData.length >= 5) {
        const sum = sleepData.reduce((a, b) => a + b, 0);
        const average = (sum / sleepData.length).toFixed(1);
        
        averageSleepDiv.innerHTML = `
            <h1 class="text-lg md:text-xl font-bold">${average} hours</h1>
            <p class="text-sm md:text-lg">Your average sleep over the last ${sleepData.length} nights</p>
        `;
    } else {
        // Clear the average display if we don't have enough data
        averageSleepDiv.style.backgroundColor = "";
        averageSleepDiv.innerHTML = `<div class="bg-slate-300 flex flex-col justify-start w-[90%] rounded-xl items-start py-5 px-2 mx-4"  id="averageSleep">
                        <h1 class="text-lg md:text-xl font-bold">Not enough data yet!</h1>
                        <p class="text-sm md:text-lg">Track five nights to view your average sleep</p>
                    </div>`;
    }
}

function resetAllInputs() {
  // Uncheck radios & checkboxes
  document.querySelectorAll("input[type=radio], input[type=checkbox]").forEach(input => {
    input.checked = false;
  });

  // Clear textarea
  const textarea = document.getElementById("aboutDay");
  if (textarea) textarea.value = "";
  document.getElementById("charCount").textContent = "0";

  // Clear selected tags + messages + status
  const tags = document.getElementById("selectedTags");
  if (tags) tags.textContent = "";

  const msg = document.querySelector(".random-msg");
  if (msg) msg.textContent = "";

  const status = document.getElementById("status");
  if (status) status.textContent = "";

  const hours = document.getElementById("hours");
  if (hours) hours.textContent = "";

  const feelsImg = document.getElementById("feelsImg");
  if (feelsImg) {
    feelsImg.src = "";
};
}


document.querySelectorAll(".indi button img").forEach(closeIcon => {
  closeIcon.parentElement.addEventListener("click", () => {
    showCard(".profile");
    hideCard(".firstPart");
    // Find the parent card with .indi
    const card = closeIcon.closest(".indi");
    if (card) {
      hideCard("." + card.classList[0]); // hide the specific card
    }
    if(moodData.length > 0){
        moodData.pop();
        updateMoodAverageDisplay();
    }
    resetAllInputs();
  });
});