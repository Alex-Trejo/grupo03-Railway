document.addEventListener('DOMContentLoaded', function() {
    const playerList = document.getElementById('playerList');
    const addPlayerButton = document.getElementById('addPlayerButton');
    const playerFormModal = document.getElementById('playerFormModal');
    const playerForm = document.getElementById('playerForm');
    const formTitle = document.getElementById('formTitle');
    const playerIdInput = document.getElementById('playerId');
    const playerNameInput = document.getElementById('playerName');
    const playerNumberInput = document.getElementById('playerNumber');
    const playerPositionInput = document.getElementById('playerPosition');
    const closeModal = document.getElementsByClassName('close')[0];

    let players = [];

    addPlayerButton.addEventListener('click', () => {
        openFormModal('Add New Player');
    });

    closeModal.addEventListener('click', () => {
        closeFormModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target == playerFormModal) {
            closeFormModal();
        }
    });

    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const playerId = playerIdInput.value;
        const playerName = playerNameInput.value;
        const playerNumber = playerNumberInput.value;
        const playerPosition = playerPositionInput.value;

        if (playerId) {
            updatePlayer(playerId, playerName, playerNumber, playerPosition);
        } else {
            addPlayer(playerName, playerNumber, playerPosition);
        }

        closeFormModal();
    });

    function openFormModal(title, player = {}) {
        formTitle.innerText = title;
        playerIdInput.value = player.id || '';
        playerNameInput.value = player.name || '';
        playerNumberInput.value = player.number || '';
        playerPositionInput.value = player.position || '';
        playerFormModal.style.display = 'block';
    }

    function closeFormModal() {
        playerFormModal.style.display = 'none';
        playerForm.reset();
    }

    function addPlayer(name, number, position) {
        const player = {
            id: Date.now().toString(),
            name,
            number,
            position
        };
        players.push(player);
        renderPlayers();
    }

    function updatePlayer(id, name, number, position) {
        const player = players.find(p => p.id === id);
        player.name = name;
        player.number = number;
        player.position = position;
        renderPlayers();
    }

    function deletePlayer(id) {
        players = players.filter(p => p.id !== id);
        renderPlayers();
    }

    function renderPlayers() {
        playerList.innerHTML = '';
        players.forEach(player => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${player.name} (#${player.number}) - ${player.position}</span>
                <button onclick="editPlayer('${player.id}')">Edit</button>
                <button onclick="deletePlayer('${player.id}')">Delete</button>
            `;
            playerList.appendChild(li);
        });
    }

    window.editPlayer = function(id) {
        const player = players.find(p => p.id === id);
        openFormModal('Edit Player', player);
    }

    window.deletePlayer = function(id) {
        deletePlayer(id);
    }
});
