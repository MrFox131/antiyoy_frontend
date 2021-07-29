import * as PIXI from 'pixi.js';
import "./index.css";
import cityGraph from "./cityMap";
import boardImg from "./img/board.jpg";
import panelImg from "./img/darkWood.png";
import arrowButton from "./img/arrow.png";
import iconsAtlas from "./img/icon.json";
import iconsAtlasImg from "./img/icon.png";
import characterList from "./img/char.png";

const points = [[0, 0, 6.3, 22.9], [1, 2, 3.5, 40.0], [2, 2, 11.0, 77.6], [3, 1, 16.3, 22.6], [4, 0, 18.4, 30.3], [5, 0, 15.4, 39.2], [6, 0, 20.3, 50.7], [7, 2, 26.7, 42.0], [8, 1, 34.6, 16.4], [9, 1, 42.4, 53.8], [10, 2, 44.0, 77.6], [11, 2, 39.2, 87.6], [12, 2, 58.1, 13.4], [13, 0, 55.0, 25.7], [14, 0, 53.9, 79.1], [15, 0, 67.4, 26.6], [16, 0, 70.7, 52.4], [17, 2, 68.9, 83.0], [18, 1, 91.8, 26.7], [19, 0, 84.6, 64.0], [20, 1, 88.1, 72.3], [21, 'San-Francisco', 10.1, 31.7], [22, 'Arckham', 27.2, 33.2], [23, 'Amazonia', 27.5, 58.6], [24, 'Buenos-Aires', 26.9, 74.0], [25, 'London', 44.2, 26.8], [26, 'Rome', 49.8, 38.9], [27, 'Istanbul', 60.4, 34.6], [28, 'Pyramids', 57.1, 50.4], [29, 'HeartofAfrica', 55.5, 65.6], [30, 'Antarctica', 59.0, 91.9], [31, 'Tunguska', 75.2, 26.8], [32, 'Himalayas', 73.2, 42.1], [33, 'Shanghai', 84.4, 49.5], [34, 'Tokio', 92.7, 40.9], [35, 'Sydney', 91.2, 82.3]];

const mainBoardWidth = 5000;
const mainBoardHeight = 3280;
const initialBoardScale = Math.min(window.innerWidth / mainBoardWidth, window.innerHeight / mainBoardHeight);
const mainBoardSceneOffset = (window.innerWidth - mainBoardWidth * initialBoardScale) / 2;

const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);

app.loader
    .add(boardImg)
    .add(panelImg)
    .add(arrowButton)
    // .add(iconsAtlas) если включить, то ничего не работает
    .add(iconsAtlasImg)
    .add(characterList)
    .load((loader, resources) => {

        // Сцена с игровой картой и элементами на ней
        const mainBoardScene = new PIXI.Container();
        mainBoardScene.x = mainBoardSceneOffset;
        mainBoardScene.y = 0;
        mainBoardScene.scale.set(initialBoardScale, initialBoardScale);
        mainBoardScene.interactive = true;
        app.stage.addChild(mainBoardScene); 

        // Игровая карта
        const boardSprite = new PIXI.Sprite(resources[boardImg].texture);
        boardSprite.interactive = true;
        mainBoardScene.addChild(boardSprite);

        // Ширина боковой панели без кнопки
        const panelWidth = window.innerWidth / 3;

        // Левая сторона, содержащая боковую панель и кнопку вызова меню
        const leftSide = new PIXI.Container();
        leftSide.dx = 20;
        app.stage.addChild(leftSide);
        
        // Кнопка вызова/сворачивания меню
        const leftSideButton = new PIXI.Sprite(resources[arrowButton].texture);
        leftSideButton.scale.set(0.2);
        leftSideButton.anchor.set(0.5);
        leftSideButton.rotation = Math.PI;
        leftSideButton.position.set(panelWidth + leftSideButton.width / 2, leftSideButton.height / 2);
        leftSideButton.interactive = true;
        leftSideButton.buttonMode = true;
        let openPanel = false, closePanel = false;
        leftSideButton.on("pointerdown", ()=>{
            if (panel.show) {
                panel.show = false;
                openPanel = false;
                closePanel = true;
            }
            else {
                panel.show = true;
                openPanel = true;
                closePanel = false;
            }
        });
        leftSide.addChild(leftSideButton);
        
        // false, если мышь наведена на боковую панель, true в ином случае
        let zoomPermission = true;

        // Левая панель и элементы на ней
        const panel = new PIXI.Container();
        panel.show = true;
        panel.interactive = true;
        panel.on('pointerover', () => {
            zoomPermission = false;
        });
        panel.on('pointerout', () => {
            zoomPermission = true;
        });
        leftSide.addChild(panel);

        // Стили для текста в кнопках
        const buttonStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 50,
            fill: "white",
            stroke: '#000000',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000"
        });

        // Кнопка вызова меню персонажа
        const charButton = new PIXI.Graphics();
        charButton.beginFill(0x3366CC);
        charButton.drawRect(0, 0, panelWidth / 3, 100);
        charButton.endFill();
        charButton.interactive = true;
        charButton.buttonMode = true;
        // charButton.on("pointerdown", ()=>{

        //     charPanel.visible = true;
        //     alliesPanel.visible = false;
        //     ancientPanel.visible = false;
        // });
        const textOffset = 20;
        const charText = new PIXI.Text("Персонаж", buttonStyle);
        charText.width = charButton.width - textOffset * 2;
        charText.height = charButton.height - textOffset * 2;
        charText.position.set(charButton.x + textOffset, charButton.y + textOffset);
        charButton.addChild(charText);
        panel.addChild(charButton);

        // Кнопка вызова меню персонажей союзников
        const alliesButton = new PIXI.Graphics();
        alliesButton.beginFill(0x55AA00);
        alliesButton.drawRect(charButton.width, 0, panelWidth / 3, 100);
        alliesButton.endFill();
        alliesButton.interactive = true;
        alliesButton.buttonMode = true;
        const alliesText = new PIXI.Text("Сыщики", buttonStyle);
        alliesText.width = charButton.width - textOffset * 2;
        alliesText.height = charButton.height - textOffset * 2;
        alliesText.position.set(charButton.x + textOffset + charButton.width, charButton.y + textOffset);
        alliesButton.addChild(alliesText);
        panel.addChild(alliesButton);

        // Кнопка вызова меню персонажей союзников
        const ancientButton = new PIXI.Graphics();
        ancientButton.beginFill(0x990000);
        ancientButton.drawRect(charButton.width * 2, 0, panelWidth / 3, 100);
        ancientButton.endFill();
        ancientButton.interactive = true;
        ancientButton.buttonMode = true;
        const ancientText = new PIXI.Text("Древний", buttonStyle);
        ancientText.width = charButton.width - textOffset * 2;
        ancientText.height = charButton.height - textOffset * 2;
        ancientText.position.set(charButton.x + textOffset + charButton.width * 2, charButton.y + textOffset);
        ancientButton.addChild(ancientText);
        panel.addChild(ancientButton);

        const charPanel = new PIXI.Container();
        charPanel.lastY = -1000; //! y при коротом достигается низ панели при прокрутке
        panel.addChild(charPanel);

        const panelSprite = new PIXI.Sprite(resources[panelImg].texture);
        panelSprite.y = charButton.height;
        panelSprite.width = panelWidth;
        charPanel.addChild(panelSprite);

        const panelElemOffset = 20;

        const charSprite = new PIXI.Sprite(resources[characterList].texture);
        charSprite.ratio = charSprite.width / charSprite.height;
        charSprite.width = panel.width - panelElemOffset;
        charSprite.height = charSprite.width / charSprite.ratio;
        charSprite.position.set(panelElemOffset / 2, charButton.height + panelElemOffset);
        charPanel.addChild(charSprite);

        // Cтили для счетчиков здоровья и рассудка
        const healthCountStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 200,
            fill: "white",
            stroke: '#000000',
            strokeThickness: 10,
            dropShadow: true,
            dropShadowColor: "#000000"
        });

        // получение доступа к атласу текстур
        const icons = new PIXI.Spritesheet(resources[iconsAtlasImg].texture, iconsAtlas);
        let icon;
        icons.parse((...args) => { icon = args[0]; });

        // Контейнер для хранения здоровья, рассудака, билетов, улик
        const statContainer = new PIXI.Container();
        statContainer.position.set(panelElemOffset / 2, charSprite.y + charSprite.height + panelElemOffset);

        // Спрайт здоровья
        const healthSprite = new PIXI.Sprite(icon["health.png"]);
        statContainer.addChild(healthSprite);
        const healthText = new PIXI.Text(5, healthCountStyle);
        healthText.position.set(healthSprite.width / 2 - healthText.width / 2, healthSprite.height / 2 - healthText.height / 2);
        healthSprite.addChild(healthText);

        // Спрайт рассудка
        const mindSprite = new PIXI.Sprite(icon["mind.png"]);
        mindSprite.x = healthSprite.width + 20;
        statContainer.addChild(mindSprite);
        const mindText = new PIXI.Text(3, healthCountStyle);
        mindText.position.set(mindSprite.width / 2 - mindText.width / 2, mindSprite.height / 2 - mindText.height / 2);
        mindSprite.addChild(mindText);

        // Стили для счетчиков билетов и улик
        const ticketCountStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 120,
            fill: "white",
            stroke: '#000000',
            strokeThickness: 10,
            dropShadow: true,
            dropShadowColor: "#000000"
        });

        // Контейнер для билетов и улик
        const ticketBlock = new PIXI.Container();
        ticketBlock.position.set(mindSprite.x + mindSprite.width + 30, -5);
        ticketBlock.scale.set(0.6);
        statContainer.addChild(ticketBlock);

        // Спрайт билета на поезд
        const trainSprite = new PIXI.Sprite(icon["train.png"]);
        ticketBlock.addChild(trainSprite);
        const trainText = new PIXI.Text("x1", ticketCountStyle);
        trainText.position.set(trainSprite.width + 20, 0);
        trainSprite.addChild(trainText);

        // Спрайт билета на корабль
        const shipSprite = new PIXI.Sprite(icon["ship.png"]);
        shipSprite.position.set(trainSprite.x, trainSprite.height + 30);
        ticketBlock.addChild(shipSprite);
        const shipText = new PIXI.Text("x1", ticketCountStyle);
        shipText.position.set(trainText.x, 0);
        shipSprite.addChild(shipText);

        // Спрайт улики
        const evidTickSprite = new PIXI.Sprite(icon["evidence.png"]);
        evidTickSprite.position.set(trainSprite.x + 35, (trainSprite.height + 30) * 2);
        evidTickSprite.scale.set(0.5);
        ticketBlock.addChild(evidTickSprite);
        const evidTickText = new PIXI.Text("x3", ticketCountStyle);
        evidTickText.position.set(trainText.x, evidTickSprite.y);
        ticketBlock.addChild(evidTickText);
        
        statContainer.ratio = statContainer.width / statContainer.height;
        statContainer.width = panelSprite.width - panelElemOffset;
        statContainer.height = statContainer.width / statContainer.ratio;
        charPanel.addChild(statContainer);
        
        // Эвент для масштабирования на карте
        window.addEventListener('wheel', (e) => {
            let delta = -e.deltaY / 100;
            if (zoomPermission && delta > 0 && boardSprite.scale.x + delta <= 2.5) {
                let initialScale = boardSprite.scale.x;
                let positionScale = 1 + delta / initialScale;
                let xRelativeToScene = (e.clientX - mainBoardSceneOffset) / (mainBoardScene.scale.x);
                let yRelativeToScene = e.clientY / (mainBoardScene.scale.x);
                boardSprite.position.x = -(positionScale * (xRelativeToScene - boardSprite.position.x) - xRelativeToScene);
                boardSprite.position.y = -(positionScale * (yRelativeToScene - boardSprite.position.y) - yRelativeToScene);
                boardSprite.scale.x += delta;
                boardSprite.scale.y += delta;
            } else if (zoomPermission && delta < 0 && boardSprite.scale.x + delta >= 1) {
                let initialScale = boardSprite.scale.x;
                let positionScale = 1 + delta / (initialScale - 1);
                boardSprite.position.x *= positionScale;
                boardSprite.position.y *= positionScale;
                boardSprite.scale.x += delta;
                boardSprite.scale.y += delta;
                if (initialScale + delta === 1) {
                    boardSprite.position.x = 0;
                    boardSprite.position.y = 0;
                }
            }
        });

        // Эвент для скролла на боковой панели
        let activePanel = charPanel;
        window.addEventListener('wheel', (e) => {
            let delta = -e.deltaY;
            if (!zoomPermission) {
                if (delta > 0) {
                    if (panel.y + delta <= 0)
                        panel.y += delta;
                    else
                        panel.y = 0;
                }
                else if (delta < 0) {
                    if (panel.y + delta >= activePanel.lastY)
                        panel.y += delta;
                    else    
                        panel.y = activePanel.lastY;
                }
            }
        });

        // Константы и эвенты для перемещения по карте
        const keyboardState = {
            LEFT: false,
            RIGHT: false,
            DOWN: false,
            UP: false
        };
        window.addEventListener('keydown', ({code}) => {
            if (code === "KeyW" || code === "ArrowUp") {
                keyboardState.UP = true;
            } else if (code === "KeyD" || code === "ArrowRight") {
                keyboardState.RIGHT = true;
            } else if (code === "KeyS" || code === "ArrowDown") {
                keyboardState.DOWN = true;
            } else if (code === "KeyA" || code === "ArrowLeft") {
                keyboardState.LEFT = true;
            } else if (code === "KeyQ") {
                if (panel.show) {
                    panel.show = false;
                    openPanel = false;
                    closePanel = true;
                }
                else {
                    panel.show = true;
                    openPanel = true;
                    closePanel = false;
                }
            }
        });
        document.addEventListener('keyup', ({code}) => {
            if (code === "KeyW" || code === "ArrowUp") {
                keyboardState.UP = false;
            } else if (code === "KeyD" || code === "ArrowRight") {
                keyboardState.RIGHT = false;
            } else if (code === "KeyS" || code === "ArrowDown") {
                keyboardState.DOWN = false;
            } else if (code === "KeyA" || code === "ArrowLeft") {
                keyboardState.LEFT = false;
            }
        });

        // Бесконечный цикл с частотой обновления 60 раз в секунду. delta содержит величину остановки между кадрами.
        app.ticker.add((delta) => {
            // Движение по карте
            if (keyboardState.UP || keyboardState.DOWN || keyboardState.LEFT || keyboardState.RIGHT) {
                boardSprite.x = Math.max(
                    Math.min(
                        0, 
                        boardSprite.x + (keyboardState.LEFT * 30 - keyboardState.RIGHT * 30) / initialBoardScale / boardSprite.scale.x * delta
                    ),
                    -boardSprite.width + boardSprite.width / boardSprite.scale.x
                );
                boardSprite.y = Math.max(
                    Math.min(
                        0, 
                        boardSprite.y + (keyboardState.UP * 30 - keyboardState.DOWN * 30) / initialBoardScale / boardSprite.scale.x * delta
                    ), 
                    -boardSprite.height + boardSprite.height / boardSprite.scale.y
                );
            }

            // Закрытие боковой панели
            if (closePanel) {
                if (leftSide.x - leftSide.dx >= -panel.width) {
                    leftSide.x -= leftSide.dx + delta;
                    leftSideButton.rotation = Math.PI * (leftSide.x + panel.width) / panel.width;
                }
                else {
                    closePanel = false;
                    leftSide.x = -panel.width;
                    leftSideButton.rotation = 0;
                }
            }
            
            // Открытие боковой панели
            if (openPanel) {
                if (leftSide.x + leftSide.dx <= 0) {
                    leftSide.x += leftSide.dx + delta;
                    leftSideButton.rotation = Math.PI * (leftSide.x + panel.width) / panel.width;
                }
                else {
                    openPanel = false;
                    leftSide.x = 0;
                    leftSideButton.rotation = Math.PI;
                }
            }
        });
    });