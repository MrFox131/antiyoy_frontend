import {SilasMarsh} from "./Heroes/SilasMarsh";
import silasSpriteF from "../../img/Heroes/1-0.png";
import silasSpriteB from "../../img/Heroes/1-1.png";

import {DianaStanley} from "./Heroes/DianaStanley";
import dianaSpriteF from '../../img/Heroes/2-0.png';
import dianaSpriteB from '../../img/Heroes/2-1.png';

import {LiliChen} from "./Heroes/LiliChen";
import liliSpriteF from '../../img/Heroes/3-0.png';
import liliSpriteB from '../../img/Heroes/3-1.png';

import {TrishScarborough} from "./Heroes/TrishScarborough";
import trishSpriteF from "../../img/Heroes/4-0.png";
import trishSpriteB from "../../img/Heroes/4-1.png";

import {MarkHarrigan} from "./Heroes/MarkHarrigan";
import markSpriteF from '../../img/Heroes/5-0.png';
import markSpriteB from '../../img/Heroes/5-1.png';

import {LeoAnderson} from "./Heroes/LeoAnderson";
import leoSpriteF from '../../img/Heroes/6-0.png';
import leoSpriteB from '../../img/Heroes/6-1.png';

class Player {
    constructor() {
        this.hero = takeHero();
        this.hp = this.hero.maxHp;
        this.mind = this.hero.maxMind;
        this.numOfClue = this.hero.numOfClue;
        this.numberOfTickets = this.hero.numberOfTickets;
        this.stats = this.hero.stats;
        this.actives = this.hero.actives;
        this.spells = this.hero.spells;
    }

    takeHero() {
        // происходит выбор, приходит id героя

        //! Проверить правильность
        if (id == 1) {
            app.Loader.add("SilasF", silasSpriteF)
            .Loader.add("SilasB", silasSpriteB)
            .load((loader, resources) => {
                SilasMarsh.spriteFront = new PIXI.Sprite(resources.SilasF.texture);
                SilasMarsh.spriteBack = new PIXI.Sprite(resources.SilasB.texture);
            })
            return SilasMarsh;
        }
        if (id == 2) {
            app.Loader.add("DianaF", dianaSpriteF)
            .Loader.add("DianaB", dianaSpriteB)
            .load((loader, resources) => {
                DianaStanley.spriteFront = new PIXI.Sprite(resources.DianaF.texture);
                DianaStanley.spriteBack = new PIXI.Sprite(resources.DianaB.texture);
            })
            return DianaStanley;
        }
        if (id == 3) {
            app.Loader.add("LiliF", liliSpriteF)
            .Loader.add("LiliB", liliSpriteB)
            .load((loader, resources) => {
                LiliChen.spriteFront = new PIXI.Sprite(resources.LiliF.texture);
                LiliChen.spriteBack = new PIXI.Sprite(resources.LiliB.texture);
            })
            return LiliChen;
        }

        if (id == 4) {
            app.Loader.add("TrishF", trishSpriteF)
            .Loader.add("TrishB", trishSpriteB)
            .load((loader, resources) => {
                TrishScarborough.spriteFront = new PIXI.Sprite(resources.TrishF.texture);
                TrishScarborough.spriteBack = new PIXI.Sprite(resources.TrishB.texture);
            })
            return TrishScarborough;
        }
        if (id == 5) {
            app.Loader.add("MarkF", markSpriteF)
            .Loader.add("MarkB", markSpriteB)
            .load((loader, resources) => {
                MarkHarrigan.spriteFront = new PIXI.Sprite(resources.MarkF.texture);
                MarkHarrigan.spriteBack = new PIXI.Sprite(resources.MarkB.texture);
            })
            return MarkHarrigan;
        }
        if (id == 6) {
            app.Loader.add("LeoF", leoSpriteF)
            .Loader.add("LeoB", leoSpriteB)
            .load((loader, resources) => {
                LeoAnderson.spriteFront = new PIXI.Sprite(resources.LeoF.texture);
                LeoAnderson.spriteBack = new PIXI.Sprite(resources.LeoB.texture);
            })
            return LeoAnderson;
        }
        
    }

    lossHP() {
        
    }

    lossMind() {
        
    }


    
}