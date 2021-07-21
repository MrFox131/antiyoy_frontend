import * as PIXI from 'pixi.js'
import "./index.css"

var app
var width = window.innerWidth
var height = window.innerHeight

var model = {
    createCanvas: function() {
        app = new PIXI.Application({width, height})
        document.body.appendChild(app.view)
    }
}

model.createCanvas()