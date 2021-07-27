class Game {
    // TODO: добавить необходимые параметры в конструктор 
    constructor() {
        // TODO: добавить необходимые параметры в конструкторы колод
        this.decks = {
            spell: new SpellDeck(),
            action: new ActionDeck(),
            artefact: new ArtefactDeck(),
            gate: new GateDeck(),
            contacts: {
                amerika: new AmerikaDeck(),
                europe: new EuropeDeck(),
                asia: new AsiaDeck(),
                сommon: new CommonDeck(),
                another: new AnotherDeck(),
                expedition: new ExpeditionDeck(),
                special: new SpecialDeck(),
                search: new SearchDeck()
            },
            myth: new MythDeck(),
            commonMonster: new Monster(),
            epicMonster: new EpicMonster(),
            secret: new SecretDeck(),
            clue: new ClueDeck(),
        },
        this.players = players;
        this.lead = 0; // Индекс ведущего сыщика в массиве this.players
        this.numOfPlayers = numOfPlayers;
        this.ctulhu = new Ctulhu();
        this.hopelessness = this.ctulhu.hopelessness;
        this.sign = 0; // 0 - верхняя, 1 - правая и тд
        this.currentPhase = 0; // 0 - фаза действий, 1 - фаза контактов, 2 - фаза мифа
        this.currentMyth = null;
        this.currentMonster = []; // массив с парами? (Где монстр, монстр)
        this.currentExpedition = null // точка с текущей экспедицией
        this.currentClue = []; // массив с точками, в какой локации находится расследование возможно ещё и id
        this.currentGate = []; // Массив с точками, где находятся врата
        this.currentSecret = null; // Текущая тайна
        this.spawnPerRound = null; 
        this.reserve = []; // Резерв карт активов (всего 4 карты)
    }

    prepareGame() {
        this.player.forEach(element => {
            element.person = element.takePerson();
        });
        this.decks.forEach(element => {
            if (element != this.decks.myth)
            element.shuffle();
        });
        this.spawnPerRound = {gate: 1, clues: 2, monster: 2}; // TODO: добавить инициализацию в зависимости от кол-ва игроков
        for (let i = 0; i < this.spawnPerRound.gate; ++i) {
            this.currentGate.push(this.decks.gate.getGate());
            this.currentMonster.push({monster: this.decks.monster.getMonster(), location: this.currentGate[i]});
        }
        for (let i = 0; i < this.spawnPerRound.clues; ++i) {
            this.currentClue.push(this.decks.clue.getClue());
        }
        for (let i = 0; i < this.spawnPerRound.monster; ++i) {
            this.currentMonster.push(this.decks.monster.getMonster());
        }
        this.currentExpedition = this.decks.expedition.checkUp();
        this.currentSecret = this.decks.secret.getSecret();
        this.currentSecret.playInEffect();
    }

    startGame() {

    }

    startRound() {

    }
    
    firstPhase() {

    }

    secondPhase() {

    }

    thirdPhase() {

    }

    endRound() {

    }
}