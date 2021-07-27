class Player {
    constructor(
        nickname,
        nickname,
        spriteFront,
        spriteBack,
        defHp,
        defMind,
        defEvidence,
        defKnowledges,
        defComunications,
        defVision,
        defStrenght,
        defVolition,
        defActives = [],
        defSpells = [],
        ) {
        this.nickname = nickname;
        this.spriteFront = spriteFront;
        this.spriteBack = spriteBack;
        this.hp = this.maxHp = defHp;
        this.mind = this.maxMind = defMind;
        this.numberOfEvidence = defEvidence;
        this.numberOfTickets = {train: 0, sheep: 0};
        this.stats = {
            knowleges: defKnowledges,
            comuncations: defComunications,
            vision: defVision,
            strenght: defStrenght,
            volition: defVolition
        }
        this.actives = defActives;
        this.spells = defSpells;
    }

    lossHP() {

    }

    lossMind() {
        
    }


    useCard(card) {
        if (card.type == "actives") {


            return true;
        } else if (card.type == "spells") {


            return true;
        } else {
            return false;
        }
    }
}