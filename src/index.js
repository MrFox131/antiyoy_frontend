import * as PIXI from 'pixi.js';
import "./index.css";
import cityGraph from "./cityMap";
import boardImg from "../src/img/board.jpg"
import panelImg from "../src/img/darkWood.png"

const points = [[0, 0, 6.3, 22.9], [1, 2, 3.5, 40.0], [2, 2, 11.0, 77.6], [3, 1, 16.3, 22.6], [4, 0, 18.4, 30.3], [5, 0, 15.4, 39.2], [6, 0, 20.3, 50.7], [7, 2, 26.7, 42.0], [8, 1, 34.6, 16.4], [9, 1, 42.4, 53.8], [10, 2, 44.0, 77.6], [11, 2, 39.2, 87.6], [12, 2, 58.1, 13.4], [13, 0, 55.0, 25.7], [14, 0, 53.9, 79.1], [15, 0, 67.4, 26.6], [16, 0, 70.7, 52.4], [17, 2, 68.9, 83.0], [18, 1, 91.8, 26.7], [19, 0, 84.6, 64.0], [20, 1, 88.1, 72.3], [21, 'San-Francisco', 10.1, 31.7], [22, 'Arckham', 27.2, 33.2], [23, 'Amazonia', 27.5, 58.6], [24, 'Buenos-Aires', 26.9, 74.0], [25, 'London', 44.2, 26.8], [26, 'Rome', 49.8, 38.9], [27, 'Istanbul', 60.4, 34.6], [28, 'Pyramids', 57.1, 50.4], [29, 'HeartofAfrica', 55.5, 65.6], [30, 'Antarctica', 59.0, 91.9], [31, 'Tunguska', 75.2, 26.8], [32, 'Himalayas', 73.2, 42.1], [33, 'Shanghai', 84.4, 49.5], [34, 'Tokio', 92.7, 40.9], [35, 'Sydney', 91.2, 82.3]];

const mainBoardWidth = 5000;
const mainBoardHeight = 3280;
const initialBoardScale = Math.min(window.innerWidth / mainBoardWidth, window.innerHeight / mainBoardHeight);
const mainBoardSceneOffset = (window.innerWidth - mainBoardWidth * initialBoardScale) / 2;

const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);

app.loader
    .add("board", boardImg)
    .add("panel", panelImg)
    .load((loader, resources) => {

        // Сцена с игровой картой
        const mainBoardScene = new PIXI.Container();
        mainBoardScene.x = mainBoardSceneOffset;
        mainBoardScene.y = 0;
        mainBoardScene.scale.set(initialBoardScale, initialBoardScale);
        mainBoardScene.interactive = true;

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x114444);
        graphics.drawRect(mainBoardSceneOffset, 0, mainBoardWidth * initialBoardScale, mainBoardHeight * initialBoardScale);
        graphics.endFill();
        mainBoardScene.mask = graphics;

        const boardSprite = new PIXI.Sprite(resources.board.texture);
        mainBoardScene.addChild(boardSprite);
        boardSprite.interactive = true;
        app.stage.addChild(mainBoardScene);

        let zoomPermission = true;

        const leftPanel = new PIXI.Container();
        leftPanel.interactive = true;
        leftPanel.on('pointerover', () => {
            zoomPermission = false;
        });
        leftPanel.on('pointerout', () => {
            zoomPermission = true;
        });
        app.stage.addChild(leftPanel);

        const leftPanelSprite = new PIXI.Sprite(resources.panel.texture);
        leftPanelSprite.width = window.innerWidth / 5;
        leftPanel.addChild(leftPanelSprite);

        window.addEventListener('wheel', (e) => {
            let delta = -e.deltaY / 100;
            if (zoomPermission && delta > 0 && boardSprite.scale.x + delta <= 2.5) {
                let initialScale = boardSprite.scale.x;
                let positionScale = 1 + delta / initialScale;
                let xRelativeToImage = (e.clientX - mainBoardSceneOffset) / (initialScale * initialBoardScale);
                let yRelativeToImage = e.clientY / (initialScale * initialBoardScale);
                boardSprite.position.x = -(positionScale * (xRelativeToImage - boardSprite.position.x) - xRelativeToImage);
                boardSprite.position.y = -(positionScale * (yRelativeToImage - boardSprite.position.y) - yRelativeToImage);
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
        window.addEventListener('wheel', (e) => { console.log("123")});

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

        app.ticker.add((delta) => {
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
        });
    });