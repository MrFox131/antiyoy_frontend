import {Card} from  "./Card.js"


const app = new PIXI.Application({
    width: 1024,
    height: 1024,
    backgroundColor: "#eee"
});

document.body.appendChild(app.view);

class Deck {
    constructor(type, atlas) {
        this.type = type;
        this.atlas = atlas;
        this.cards = [];
    }

    async start() {
        PIXI.loader
        .add(this.atlas)
        .load(() => {
            let id = PIXI.loader.resources[this.atlas].textures;
            for(let i = 1; i <= 40; ++i) {
                let sprite = new PIXI.Sprite(id[(i + ".png")]);
                this.cards.push(new Card("Пусть так", this.type, "Тип описание", sprite));
            }
            console.log(this.cards)
        })
    }

}

let myDeck = new Deck("каллода", "./actives.json");

myDeck.start();
setTimeout(() => {
    myDeck.cards.forEach(element => {
        app.stage.addChild(element.sprite)
    })
}, 3000)
