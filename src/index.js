import * as PIXI from 'pixi.js'
import "./index.css"
import board from "./img/Base board.png"

var app
var width = window.innerWidth
var height = window.innerHeight
var boardSprite
var scale = 1
scale = height/1080
scale = Math.min(scale, width/1636)

var model = {
    createCanvas: functiopixi.js animate spriten() {
        app = new PIXI.Application()
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        document.body.appendChild(app.view)
        console.log(board)
        app.loader.add("board", board).load((loader, resources)=>{
            boardSprite = new PIXI.Sprite(resources.board.texture)
            boardSprite.height = 1080*scale
            boardSprite.width = 1636*scale
            boardSprite.x = (width - boardSprite.width)/2
            console.log(boardSprite)
            app.stage.addChild(boardSprite)
        })

    }

}

model.createCanvas()