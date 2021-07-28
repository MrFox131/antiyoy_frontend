let body = document.getElementById("body");

let containerStartGame = document.createElement('div');
containerStartGame.style.width = '100%';
containerStartGame.style.height = '100%';
containerStartGame.style.background = 'red';
containerStartGame.style.flex = 'auto';
body.appendChild(containerStartGame);

let gameId = Date.now();
let buttonContainer = document.createElement('div');
let textUserId = document.createElement('p');
let textForRoom = document.createElement('p');
let input = document.createElement('input');
let buttonNewRoom = document.createElement('button');
let buttonConnect = document.createElement('button');

textUserId.textContent = "Ваш ID = " + gameId + " запомните его.";
textForRoom.textContent = "Введите ID комнаты, чтобы присоединиться или создайте свою сессию";
buttonNewRoom.textContent = "Создать новую комнату";
buttonConnect.textContent = "Присоединиться";

buttonContainer.appendChild(textUserId);
buttonContainer.appendChild(input);
buttonContainer.appendChild(document.createElement('br'));
buttonContainer.appendChild(buttonNewRoom);
buttonContainer.appendChild(buttonConnect);

containerStartGame.appendChild(buttonContainer);

buttonNewRoom.addEventListener("click", function() { /* ??? */ containerStartGame.remove(); console.log(1)})
buttonConnect.addEventListener("click", function() { gameId = input.value; /* ??? */ containerStartGame.remove(); console.log(gameId)})



