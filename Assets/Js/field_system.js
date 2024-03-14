document.addEventListener('DOMContentLoaded', function () {
  const players = document.querySelectorAll('.player, .enemy');
  const field = document.getElementById('field');
  const playerDescription = document.getElementById('player-description');

  players.forEach(player => {
    player.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', player.id);
    });
  });

  field.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  field.addEventListener('drop', function (e) {
    e.preventDefault();
    const playerId = e.dataTransfer.getData('text/plain');
    const draggedPlayer = document.getElementById(playerId);

    const rect = field.getBoundingClientRect();
    const x = e.clientX - rect.left - draggedPlayer.clientWidth / 2;
    const y = e.clientY - rect.top - draggedPlayer.clientHeight / 2;

    draggedPlayer.style.left = `${x}px`;
    draggedPlayer.style.top = `${y}px`;
  });

  field.addEventListener('dragend', function (e) {
    const playerId = e.dataTransfer.getData('text/plain');
    const draggedPlayer = document.getElementById(playerId);

    if (!field.contains(e.relatedTarget) && draggedPlayer) {
      // Eliminar el jugador si se ha soltado fuera del campo
      draggedPlayer.remove();
      playerDescription.textContent = '';
    }
  });

  field.addEventListener('mouseover', function (e) {
    const playerId = e.target.id;
    const playerName = e.target.dataset.name;
    const playerDescriptionText = e.target.dataset.description;

    if (playerId && playerName && playerDescriptionText) {
      showDescription(playerName, playerDescriptionText);
    }
  });

  field.addEventListener('mouseout', function () {
    hideDescription();
  });
});

function showDescription(playerName, description) {
  const playerDescription = document.getElementById('player-description');
  playerDescription.textContent = `${playerName}: ${description}`;
}

function hideDescription() {
  const playerDescription = document.getElementById('player-description');
  playerDescription.textContent = '';
}

function showDescription(playerName, description) {
  const playerDescription = document.getElementById('player-description');
  playerDescription.textContent = `${playerName}: ${description}`;
}

function hideDescription() {
  const playerDescription = document.getElementById('player-description');
  playerDescription.textContent = '';
}

// Nueva función para habilitar el arrastre de jugadores
function habilitarArrastre() {
  var players = document.querySelectorAll(".player");

  players.forEach(function (player) {
    player.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", player.id);
    });

    player.addEventListener("dragend", function () {
      // Obtener la posición inicial del jugador
      var initialPosition = player.dataset.initialPosition.split(",");
      var x = initialPosition[0] + "px";
      var y = initialPosition[1] + "px";

      // Devolver el jugador a su posición inicial
      player.style.left = x;
      player.style.top = y;
    });
  });
}


// ...
