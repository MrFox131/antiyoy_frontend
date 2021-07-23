import * as PIXI from 'pixi.js'
import "./index.css"
import cityGraph from "./cityMap"

const points = [[0, 0, 6.3, 22.9], [1, 2, 3.5, 40.0], [2, 2, 11.0, 77.6], [3, 1, 16.3, 22.6], [4, 0, 18.4, 30.3], [5, 0, 15.4, 39.2], [6, 0, 20.3, 50.7], [7, 2, 26.7, 42.0], [8, 1, 34.6, 16.4], [9, 1, 42.4, 53.8], [10, 2, 44.0, 77.6], [11, 2, 39.2, 87.6], [12, 2, 58.1, 13.4], [13, 0, 55.0, 25.7], [14, 0, 53.9, 79.1], [15, 0, 67.4, 26.6], [16, 0, 70.7, 52.4], [17, 2, 68.9, 83.0], [18, 1, 91.8, 26.7], [19, 0, 84.6, 64.0], [20, 1, 88.1, 72.3], [21, 'San-Francisco', 10.1, 31.7], [22, 'Arckham', 27.2, 33.2], [23, 'Amazonia', 27.5, 58.6], [24, 'Buenos-Aires', 26.9, 74.0], [25, 'London', 44.2, 26.8], [26, 'Rome', 49.8, 38.9], [27, 'Istanbul', 60.4, 34.6], [28, 'Pyramids', 57.1, 50.4], [29, 'HeartofAfrica', 55.5, 65.6], [30, 'Antarctica', 59.0, 91.9], [31, 'Tunguska', 75.2, 26.8], [32, 'Himalayas', 73.2, 42.1], [33, 'Shanghai', 84.4, 49.5], [34, 'Tokio', 92.7, 40.9], [35, 'Sydney', 91.2, 82.3]];

const app = new PIXI.Application({width: window.innerWidth,  height: window.innerHeight});
document.body.appendChild(app.view);

app.loader
    .add("board", "../src/img/board.jpg")
    .add("test", "../src/img/up.png")
    .load((loader, resources) => {
        // Сцена с игровой картой
        const mainScene = new PIXI.Container();
        mainScene.dx = 0;
        mainScene.dy = 0;
        mainScene.interactive = true;
        let zoomPremission = false;
        // mainScene.on("pointerover", ()=>{zoomPremission = true; console.log("true");});
        app.stage.addChild(mainScene);

        window.addEventListener("wheel", (e)=>{
            let delta = -e.deltaY;
            if (zoomPremission && mainScene.scale.x + delta / 1000 >= 1 && mainScene.scale.x + delta / 1000 <= 2.5) {
                mainScene.scale.x += delta / 1000;
                mainScene.scale.y += delta / 1000;
            }
        });

        const boardSprite = new PIXI.Sprite(resources.board.texture);
        boardSprite.scale.set(0.3);
        mainScene.addChild(boardSprite);

        // TODO: 1) перемещение на карте 2) увеличение только с наводкой на карту(можно по координатам попробовать, зная заранее края боковых панелей)
        const scene = new PIXI.Container();
        scene.position.set(window.innerWidth / 2, 0);
        scene.on("pointerover", ()=>{zoomPremission = false; console.log("false");});
        app.stage.addChild(scene);

        const up = new PIXI.Sprite(resources.test.texture);
        up.scale.set(1.5);
        scene.addChild(up);

        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(10, 0xFF3300, 1);
        rectangle.drawRect(scene.x, scene.y, scene.width, scene.height);
        app.stage.addChild(rectangle);

        app.ticker.add(()=>{
            zoomPremission = true;
            mainScene.x += mainScene.dx;
            mainScene.y += mainScene.dy;
        })
    });



// // функции для перетаскивания элементов
// function onDragStart(event) {
//     // store a reference to the data
//     // the reason for this is because of multitouch
//     // we want to track the movement of this particular touch
//     this.data = event.data;
//     this.dragging = true;
// }

// function onDragEnd() {
//     this.dragging = false;
//     // set the interaction data to null
//     this.data = null;
// }

// function onDragMove() {
//     if (this.dragging) {
//         const newPosition = this.data.getLocalPosition(this.parent);
//         this.x = newPosition.x;
//         this.y = newPosition.y;
//     }
// }

// // Функция для управления на клавиатуре. Параметром принимает ключ клавиши, возвращает объект для удобного отслеживания этой клавиши.
// // Key list for this function: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
// function keyboard(value) {
//     let key = {};
//     key.value = value;
//     key.isDown = false;
//     key.isUp = true;
//     key.press = undefined;
//     key.release = undefined;
//     //The `downHandler`
//     key.downHandler = event => {
//         if (event.key === key.value) {
//             if (key.isUp && key.press) key.press();
//             key.isDown = true;
//             key.isUp = false;
//             event.preventDefault();
//         }
//     };

//     //The `upHandler`
//     key.upHandler = event => {
//         if (event.key === key.value) {
//             if (key.isDown && key.release) key.release();
//             key.isDown = false;
//             key.isUp = true;
//             event.preventDefault();
//         }
//     };

//     //Attach event listeners
//     const downListener = key.downHandler.bind(key);
//     const upListener = key.upHandler.bind(key);
    
//     window.addEventListener(
//     "keydown", downListener, false
//     );
//     window.addEventListener(
//     "keyup", upListener, false
//     );
    
//     // Detach event listeners
//     key.unsubscribe = () => {
//     window.removeEventListener("keydown", downListener);
//     window.removeEventListener("keyup", upListener);
//     };
    
//     return key;
// }