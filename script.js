// Simulated wallet balance and tournaments joined
let walletBalance = 0;
let tournamentsJoined = 0; // Track the number of tournaments joined

// Tournament Data (for Free Fire and BGMI)
const tournaments = {
    freefire: [
        { id: 1, name: "Free Fire Tournament 1", fee: 10 },
        { id: 2, name: "Free Fire Tournament 2", fee: 20 },
        { id: 3, name: "Free Fire Tournament 3", fee: 15 }
    ],
    bgmi: [
        { id: 4, name: "BGMI Tournament 1", fee: 15 },
        { id: 5, name: "BGMI Tournament 2", fee: 25 },
        { id: 6, name: "BGMI Tournament 3", fee: 10 }
    ]
};

// Simulate Google Login
function googleLogin() {
    // In a real app, this would call Google API
    alert("Logged in with Google!");
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

// Show Tournament List for selected game
function showTournaments(game) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('tournament-list').style.display = 'block';

    const tournamentList = tournaments[game];
    const tournamentItems = document.getElementById('tournament-items');
    tournamentItems.innerHTML = ''; // Clear previous list

    tournamentList.forEach(tournament => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${tournament.name} - ₹${tournament.fee}`;
        const joinButton = document.createElement('button');
        joinButton.innerHTML = 'Join';
        joinButton.onclick = () => showUIDModal(tournament);
        listItem.appendChild(joinButton);
        tournamentItems.appendChild(listItem);
    });
}

// Show UID Input Modal
function showUIDModal(tournament) {
    document.getElementById('uid-modal').style.display = 'block';
    document.getElementById('uid-input').value = ''; // Clear previous input
    document.getElementById('game-name-input').value = ''; // Clear previous input
    sessionStorage.setItem("currentTournament", JSON.stringify(tournament));
}

// Submit UID and Game Name
function submitUID() {
    const uid = document.getElementById('uid-input').value;
    const gameName = document.getElementById('game-name-input').value;
    
    if (!uid || !gameName || isNaN(uid)) {
        alert("Please enter valid UID and Game Name.");
        return;
    }

    const tournament = JSON.parse(sessionStorage.getItem("currentTournament"));
    if (walletBalance >= tournament.fee) {
        walletBalance -= tournament.fee;
        tournamentsJoined += 1;
        alert(`Successfully joined ${tournament.name}!`);
        document.getElementById('wallet-balance').innerText = walletBalance;
        document.getElementById('uid-modal').style.display = 'none';
    } else {
        alert('Insufficient funds! Please add cash to your wallet.');
    }
}

// Go back to home page from tournament list
function goBack() {
    document.getElementById('tournament-list').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

// Go to wallet page
function goToWallet() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('wallet-page').style.display = 'block';
}

// Back to home page from wallet
function goBackHome() {
    document.getElementById('wallet-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

// Add Cash to Wallet
function addCash() {
    const cashToAdd = prompt('Enter the amount to add to wallet:', '0');
    walletBalance += parseInt(cashToAdd);
    document.getElementById('wallet-balance').innerText = walletBalance;
}

// Show notifications (number of tournaments joined)
function showNotifications() {
    alert(`You have joined ${tournamentsJoined} tournaments.`);
}
