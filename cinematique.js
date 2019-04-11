var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'test',
    physics: {
        default: 'arcade',
    },
    scene: [
    {
        preload: preload,
        create: create,
        update: update
    }
    ]
};

var text = [
    "It's upon a time... Hum... Mince excusez-moi je n’ai... je n'ai plus toute ma tête.",
    "Pourtant tout allait bien jusqu’à ce jour, ce.. hum... moment... ",
    "Vous vous demandez ce qu’il s'est passé ?",
    "Euuh je ne vous le dirai pas... Pardon ?",
    "Oui oui bien sur je vous le raconte.",
    "Je ne me souviens pas exactement des circonstances mais c’était un soir de pluie.",
    "J’étais dans ma voiture à écouter la radio.",
    "Je... je fus surpris d’y prêter attention, moi-même ne sachant pas pourquoi elle était... elle était allumé...pourquoi elle attira mon oreille.",
    "Ce soir-là, une jeune femme parlait de ses disputes incessantes avec son mari alors qu’elle était enceinte...",
    "Enfin rien de spécial même si je ne pensais qu'à ma femme... Aurore, enceinte-t-elle aussi.",
    "J’écoutais donc cette émission jusqu’à ce que le présentateur redemandât l’identité de l’auditrice...",
    "Elle s’appelait Aurore...",
    "Dans un élan d’angoisse j’attrapa mon téléphone pour appeler ma femme...",
    "A ce moment une ombre surgit de la route m’obligeant à l’esquiver..."];

var fond;
var fondY;
var fondMenu;
var sonVoiture, sonPluie, sonOrage;
var voix;
var crash;
var keyEnter;
var started = false;

console.log("fichier cinematique");
var game = new Phaser.Game(config);

function preload() {
    this.load.image('menu', 'cinematique/JACKET.png');

    this.load.image('illustration', 'cinematique/illustration1.png');

    this.load.image('voiture1', 'cinematique/voiture1.png');
    this.load.image('voiture2', 'cinematique/voiture2.png');
    this.load.image('voiture3', 'cinematique/voiture3.png');
    this.load.image('voiture4', 'cinematique/voiture4.png');

    this.load.audio('sonVoiture', 'cinematique/son/voiture.mp3');
    this.load.audio('sonPluie', 'cinematique/son/pluie.mp3');
    this.load.audio('sonOrage', 'cinematique/son/orage.mp3');

    this.load.audio('voix', 'cinematique/son/voix.wav');
    this.load.audio('crash', 'cinematique/son/crash.mp3');
    //this.load.audio('begin', 'cinematique/son/debut_du_jeu.mp3')
}

function create() {
    loreText = this.add.text(config.height - 100, config.width / 2, "", {font: "30px Arial", fill: "#fff"}).setOrigin(0.5).setScrollFactor(0);

    keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    fondMenu = this.add.tileSprite(0, 0, 1029, 720, 'menu').setOrigin(0);
}

function update() {
    if(keyEnter.isDown && !started) {
        started = true;
        fondMenu.alpha = 0;
        start(this);
    }
}

function start(game) {
    voix = game.sound.add('voix');
    crash = game.sound.add('crash');

    fond = game.add.tileSprite(0, 0, 1280, 720, 'illustration').setOrigin(0);

    setTimeout(function() {

        setTimeout(function() {
            sonVoiture.setVolume(0.2);
            sonOrage.setVolume(0.2);
            sonPluie.setVolume(0.02);
            voix.play();
            setTimeout(function() {
                crash.setVolume(0.8);
                crash.play();
                setInterval(function() {
                    fond.alpha -= 0.1;
                    if(fond.alpha <= 0) {
                        setTimeout(function() {
                            //begin.play();
                            location.href = "link.html";
                        }, 3000);
                    }
                }, 100);
            }, 1000 * 52);
        }, 2000);

        fondY = fond.y;
        let orageCount = 3;
        let i = 1;
        setInterval(function() {
            if(i > 2) {
                i = 1;
                orageCount++;
            }
            if(orageCount >= 3) {
                fond.setTexture("voiture" + (i+2));
                setTimeout(function() {
                    fond.setTexture("voiture" + i);
                    setTimeout(function() {
                        fond.setTexture("voiture3");
                    }, 120);
                }, 120);
                orageCount = 0;
            } else {
                fond.setTexture("voiture" + i);
            }
            i++;
        }, 1000);
    }, 3000);

    sonVoiture = game.sound.add('sonVoiture');
    sonVoiture.setLoop(true);
    sonVoiture.play();

    sonPluie = game.sound.add('sonPluie');
    sonPluie.setVolume(0.2);
    sonPluie.setLoop(true);
    sonPluie.play();

    sonOrage = game.sound.add('sonOrage');
    sonOrage.setLoop(true);
    sonOrage.play();


    /* var i = 0;
    setInterval(function() {
        //loreText.setText(text[i]);
        i++;
    }, 1000); */

    setInterval(function() {
        fond.setPosition(fond.x, fond.y += (Math.random()*20)-10);
        if(Math.abs(fond.y - fondY) > 10) {
            fond.setPosition(fond.x, fondY);
        }
    }, 100);
}
