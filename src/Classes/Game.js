class Game {
    // TODO: добавить необходимые параметры в конструктор 
    constructor(players, numOfPlayers) {
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
        this.currentMyth = []; // Массив карт процессов (мифов), которые действуют пока не сброшены
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
            element.takePerson();
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
        while (this.hopelessness > 0) {
            // this.startRound();
            this.firstPhase();
            this.secondPhase();
            this.thirdPhase();
            this.endRound();
        }
        // TODO: сделать и запустить методы после пробуждения древнего (если есть разница) 
    }

    startRound() {

    }
    
    firstPhase() {
        for (let i = this.lead; i < this.players.size; ++i) {
            this.suggestAction(this.players[i])
        }
        for (let i = 0; i < this.lead; ++i) {
            this.suggestAction(this.players[i])
        }
    }

    secondPhase() {
        for (let i = this.lead; i < this.players.size; ++i) {
            let monsterNearPlayer = this.currentMonster.filter(monster => monster.location == this.players[i].location);
            let isBattleContactIsSuccess = true;
            if (monsterNearPlayer.size > 0) {
                this.battleContact(this.players[i], monsterNearPlayer);
            }
            if (isBattleContactIsSuccess) {
                this.players[i].contact() // Предложить игроку выбрать контакт
            }
        }
        for (let i = 0; i < this.lead; ++i) {
            let monsterNearPlayer = this.currentMonster.filter(monster => monster.location == this.players[i].location);
            let isBattleContactIsSuccess = true;
            if (monsterNearPlayer.size > 0) {
                this.battleContact(this.players[i], monsterNearPlayer);
            }
            if (isBattleContactIsSuccess) {
                this.players[i].contact() // Предложить игроку выбрать контакт
            }
        }
    }

    thirdPhase() {
        let myth = this.decks.myth.getMyth() // return [card, Boolean], true - OK, false - нет карт => проигрыш сыщиков
        if (myth.result) {
            if (myth.card.use()) { // вернёт true если карта использована и имеет "процесс", то есть должна лежать дальше
                this.currentMyth.push(myth.card);
            }
        } 
        else {
            this.losing();
        }
    }

    endRound() {
        this.players[this.lead].switchLead(); // Предложить игроку сменить ведущего игрока 
    }


    suggestAction(player) {
        //! предложение и обработка действий, выбранных игроком
    }

    battleContact(player, monsters) {
        //! предложить игроку монстров на выбор (пока не закончатся монстры). Если всё круто, вернуть - true, иначе - false
    }

    losing() {
        //! вывести информацию о проигрыше и закончить игру
    }

}