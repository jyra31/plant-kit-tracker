// Load stored data when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadWaterLog();
    loadReminder();
    loadQRCode();
});

// Watering Tracker
function logWatering() {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value.trim();

    if (!note) {
        alert("Please enter a note.");
        return;
    }

    const waterLog = JSON.parse(localStorage.getItem("waterLog")) || [];
    const newLog = { date: new Date().toLocaleString(), note };
    waterLog.push(newLog);

    localStorage.setItem("waterLog", JSON.stringify(waterLog));
    noteInput.value = "";
    loadWaterLog();
}

// Load Water Log History
function loadWaterLog() {
    const waterLog = JSON.parse(localStorage.getItem("waterLog")) || [];
    const logList = document.getElementById("waterLog");
    logList.innerHTML = "";

    waterLog.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.date} - ${entry.note}`;
        logList.appendChild(li);
    });
}

// Watering Reminder
function setReminder() {
    const reminderTime = document.getElementById("reminderTime").value;
    if (!reminderTime) {
        alert("Please select a reminder time.");
        return;
    }

    localStorage.setItem("reminderTime", reminderTime);
    alert(`Reminder set for ${new Date(reminderTime).toLocaleString()}`);

    const timeDifference = new Date(reminderTime) - new Date();
    if (timeDifference > 0) {
        setTimeout(() => sendNotification(), timeDifference);
    }
}

// Load Reminder
function loadReminder() {
    const savedReminder = localStorage.getItem("reminderTime");
    if (savedReminder) {
        document.getElementById("reminderTime").value = savedReminder;
    }
}

// Send Watering Notification
function sendNotification() {
    if (Notification.permission === "granted") {
        new Notification("🌱 Water Your Plant!", {
            body: "It's time to water your plant!",
            icon: "https://cdn-icons-png.flaticon.com/512/2913/2913990.png",
        });
    } else {
        Notification.requestPermission();
    }
}

// QR Code Generator
function generateQRCode() {
    const qrUrl = document.getElementById("qrUrl").value.trim();
    if (!qrUrl) {
        alert("Please enter a URL.");
        return;
    }

    localStorage.setItem("qrUrl", qrUrl);
    loadQRCode();
}

// Load QR Code
function loadQRCode() {
    const qrUrl = localStorage.getItem("qrUrl") || "https://your-plant-tracker.com";
    document.getElementById("qrUrl").value = qrUrl;

    document.getElementById("qrCode").innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}" alt="QR Code">
    `;
}
