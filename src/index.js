import * as PIXI from 'pixi.js'
import "./index.css"
import cityGraph from "./cityMap"


const width = window.innerWidth;
const height =  window.innerWidth;
let scale = 1;
const points = [[0, 0, 6.3, 22.9], [1, 2, 3.5, 40.0], [2, 2, 11.0, 77.6], [3, 1, 16.3, 22.6], [4, 0, 18.4, 30.3], [5, 0, 15.4, 39.2], [6, 0, 20.3, 50.7], [7, 2, 26.7, 42.0], [8, 1, 34.6, 16.4], [9, 1, 42.4, 53.8], [10, 2, 44.0, 77.6], [11, 2, 39.2, 87.6], [12, 2, 58.1, 13.4], [13, 0, 55.0, 25.7], [14, 0, 53.9, 79.1], [15, 0, 67.4, 26.6], [16, 0, 70.7, 52.4], [17, 2, 68.9, 83.0], [18, 1, 91.8, 26.7], [19, 0, 84.6, 64.0], [20, 1, 88.1, 72.3], [21, 'San-Francisco', 10.1, 31.7], [22, 'Arckham', 27.2, 33.2], [23, 'Amazonia', 27.5, 58.6], [24, 'Buenos-Aires', 26.9, 74.0], [25, 'London', 44.2, 26.8], [26, 'Rome', 49.8, 38.9], [27, 'Istanbul', 60.4, 34.6], [28, 'Pyramids', 57.1, 50.4], [29, 'HeartofAfrica', 55.5, 65.6], [30, 'Antarctica', 59.0, 91.9], [31, 'Tunguska', 75.2, 26.8], [32, 'Himalayas', 73.2, 42.1], [33, 'Shanghai', 84.4, 49.5], [34, 'Tokio', 92.7, 40.9], [35, 'Sydney', 91.2, 82.3]];

scale = height/imageHeight
scale = Math.min(scale, width/imageWidth)
const offsetFromLeft = (width - imageWidth * scale) / 2;

const app = new PIXI.Application({width: window.innerWidth,  height: window.innerWidth});
document.body.appendChild(app.view);

app.loader
    .add("board", "../src/img/board.jpg")
    .load((loader, resources) => {
        boardSprite = new PIXI.Sprite(resources.board.texture)
        boardSprite.height = imageHeight * scale
        boardSprite.width = imageWidth * scale
        boardSprite.x = offsetFromLeft
        console.log(boardSprite)
        app.stage.addChild(boardSprite)
    });