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

console.log("fichier");

var game = new Phaser.Game(config);

var playe, keyZ, keyQ, keyS, keyD, keyW, keyX, keyC, keyOne, keyTwo, test, monster, soul1, soul2, soul3, soul4, pioche, arc, coup, ting, rire, epee, switch_foot, collisionLeft, collisionRight;
var time;
var button;
var button1;
var button2;
var inv;
var occlusion;
var achat1;
var achat2;
var achat3;
var thunes;
var ground2;

//var monster;
var monstres_rand;
var gemme1 = [];
var gemme2 = [];
var gemme3 = [];
var gemme4 = [];
var walls = [];
var test_hp = 0;

var zoneSafe;

// Charger les assets
function preload ()
{
    console.log("preload");
    this.load.image('soul' + 1, 'soul' + 1 + '.png', 37, 45, 18);

    this.load.image('bg', 'img/bg.jpg');
    this.load.image('zone_safe', 'img/zone_safe.png');

    this.load.image('imgTest', 'img/player/imgTest.png');
    this.load.image('playerImg', 'img/player/player.png');
    this.load.image('player_run1', 'img/player/player_run1.png');
    this.load.image('player_run2', 'img/player/player_run2.png');
    this.load.image('player_attack1', 'img/player/player_attack1.png');
    this.load.image('player_attack2', 'img/player/player_attack2.png');
    this.load.image('player_attack3', 'img/player/player_attack3.png');

    this.load.image('playerImg_axe', 'img/player/axe/player_axe.png');
    this.load.image('player_axe_run1', 'img/player/axe/player_axe_run1.png');
    this.load.image('player_axe_run2', 'img/player/axe/player_axe_run2.png');
    this.load.image('player_axe_attack1', 'img/player/axe/player_axe_attack1.png');
    this.load.image('player_axe_attack2', 'img/player/axe/player_axe_attack2.png');
    this.load.image('player_axe_attack3', 'img/player/axe/player_axe_attack3.png');

    this.load.image('playerImg_epee', 'img/player/epee/player_epee.png');
    this.load.image('player_epee_run1', 'img/player/epee/player_epee_run1.png');
    this.load.image('player_epee_run2', 'img/player/epee/player_epee_run2.png');
    this.load.image('player_epee_attack1', 'img/player/epee/player_epee_attack1.png');
    this.load.image('player_epee_attack2', 'img/player/epee/player_epee_attack2.png');
    this.load.image('player_epee_attack3', 'img/player/epee/player_epee_attack3.png');

    this.load.image('playerImg_def', 'img/player/def/player_def.png');
    this.load.image('player_def_run1', 'img/player/def/player_def_run1.png');
    this.load.image('player_def_run2', 'img/player/def/player_def_run2.png');
    this.load.image('player_def_attack1', 'img/player/def/player_def_attack1.png');
    this.load.image('player_def_attack2', 'img/player/def/player_def_attack2.png');
    this.load.image('player_def_attack3', 'img/player/def/player_def_attack3.png');

    this.load.image('collisionLeft', 'img/collisionLeft.png');
    this.load.image('collisionRight', 'img/collisionRight.png');
    this.load.image('monster2', 'monster2.png');
    this.load.image('facade', 'img/facade.png');
    this.load.image('toiture', 'img/toiture.png');
    this.load.image('haine1', 'img/monstres/haine/haine1.png');
    this.load.image('hitbox_haine', 'img/monstres/haine/hitbox_haine.png');
    this.load.image('black', 'img/black.png');
    for(let i = 1; i <= 4; i++) {
        this.load.image('haine' + i, 'img/monstres/haine/haine' + i + '.png');
    }

    for(let i = 1; i <= 3; i++) {
        this.load.image('orb_red' + i, 'img/orbes/red/orb_red' + i + '.png');
        this.load.image('orb_bleu' + i, 'img/orbes/bleu/orb_blue' + i + '.png');
        this.load.image('orb_gris' + i, 'img/orbes/gris/orb_gris' + i + '.png');
    }

    this.load.image('nexus', 'img/NEXUS.png');
    this.load.image('ground2', 'img/sol2.png');

    this.load.image('hud', 'img/hud.png');
    this.load.image('shop', 'img/shop.png');

    this.load.image('occlusion', 'img/occlusion.png');

    this.load.image('ground', 'img/sol.png');

    // VIE
    for (let i = 0; i < 10; i++)
        this.load.image('vie' + i, 'img/player/vie/vie' + i + '.png');

    // MUSIQUES
    this.load.audio('musiqueDeFond', 'son/musiques/fond.ogg');

    //SHOP
    this.load.image('axe', 'img/equipements/hache.png');
    this.load.image('sword', 'img/equipements/epee.png');
    this.load.image('chestplate', 'img/equipements/armure.png');

    // SON
    this.load.audio('coup', 'son/effets/bruit_coup.ogg');
    this.load.audio('monster', 'son/effets/monster.ogg');
    this.load.audio('pioche', 'son/effets/coup_pioche.ogg');
    this.load.audio('rire', 'son/effets/rire_monster.ogg');
    this.load.audio('ting', 'son/effets/ting.ogg');
    this.load.audio('epee', 'son/effets/coup_epee.ogg');
    this.load.audio('hache', 'son/effets/hache.mp3');
    this.load.audio('poing', 'son/effets/poing.mp3');
}

function lose_hp() {
    if (test_hp % 90 == 0) {
        if (achat3 == 3) {
            playe.hp -= 0.5;
        } else
            playe.hp -= 1;
        setTimeout(function() {
            rire.play();
        }, 2000);
        coup.play();
        test_hp++;
    } else {
        test_hp++;
    }
}

// Creer les elements du jeu
function create ()
{
    console.log("create");

    this.input.mouse.capture = true;

    //zoneSafe = this.add.tileSprite(0, 720 * 2, 'zone_safe').setOrigin(0);
    bg = this.add.tileSprite(0, 0, 1280 * 3, 720 * 3, 'ground').setOrigin(0);

    ground2 = this.add.image(0, 3 * 720, 'ground2');
    nexus = this.add.image(0, 3 * 720, 'nexus').setScale(0.3);

    collisionLeft = this.physics.add.image(0, 0, 'collisionLeft').setScale(0.4);
    collisionRight = this.physics.add.image(0, 0, 'collisionRight').setScale(0.4);
    collisionLeft.alpha = 0;
    collisionRight.alpha = 0;

    var music = this.sound.add('musiqueDeFond');
    music.play();
    pioche = this.sound.add('pioche');
    coup = this.sound.add('coup');
    monster = this.sound.add('monster');
    ting = this.sound.add('ting');
    rire = this.sound.add('rire');
    epee = this.sound.add('epee');
    hache = this.sound.add('hache');
    poing = this.sound.add('poing');

    this.cameras.main.setBounds(0, 0, 1280 * 3, 720 * 3);
    this.physics.world.setBounds(0, 0, 1280 * 3, 720 * 3);

    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);


    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    // GEMMES
    for (var i = 0; i < 15; i++)
        gemme1[i] = new gemme(Math.random() * 900, Math.random() * 900 + 1260, 1, this, playe);
    for (var i = 0; i < 8; i++)
        gemme2[i] = new gemme(Math.random() * 2100, Math.random() * 3800, 2, this, playe);
    for (var i = 0; i < 8; i++)
        gemme3[i] = new gemme(Math.random() * 2100, Math.random() * 3800, 3, this, playe);

        // PLAYER
        playe = new Player(this.physics.add.image(100, 1800, 'playerImg'),100,2000, this.physics.add.image(0, 0, 'vie0'));
        playe.sprite.setCollideWorldBounds(true);
        this.physics.add.image(0, 0, 'hitbox_haine');
        playe.sprite.setScale(0.4);
        playe.lifeText = this.add.text(0, 0, playe.hp + " hp", {font: "20px Arial", fill: "255"}).setOrigin(0.5);
        // WALLS
        walls[0] = new wall(0, 130, this);
        walls[1] = new wall(180, 130, this);
        walls[2] = new wall(180 * 2, 130, this);
        walls[31] = new wall(180 * 2, 130 * 2, this);
        walls[32] = new wall(180 * 2, 130 * 3, this);
        walls[3] = new wall(180 * 3, 130, this);
        walls[4] = new wall(180 * 4, 130, this);
        walls[5] = new wall(180 * 5, 130, this);
        walls[6] = new wall(180 * 6, 130, this);
        walls[7] = new wall(180 * 7, 130, this);
        walls[8] = new wall(180 * 8, 130, this);
        walls[29] = new wall(180 * 8, 130 * 2, this);
        walls[30] = new wall(180 * 8, 130 * 3, this);
        walls[9] = new wall(0, 130 + 180, this);
        walls[10] = new wall(0, 130 + 180 * 2, this);
        walls[11] = new wall(0, 130 + 180 * 3, this);
        walls[12] = new wall(0, 130 + 180 * 4, this);
        walls[13] = new wall(180, 130 + 180 * 4, this);
        walls[14] = new wall(180 * 2, 130 + 180 * 4, this);
        walls[15] = new wall(180 * 4, 130 + 180 * 4, this);
        walls[16] = new wall(180 * 4, 130 + 180 * 3, this);
        walls[17] = new wall(180 * 6, 130 + 180 * 2, this);
        walls[18] = new wall(180 * 6, 130 + 180, this);
        walls[19] = new wall(180 * 5, 130 + 180 * 4, this);
        walls[20] = new wall(180 * 5, 130 + 180 * 5, this);
        walls[21] = new wall(180 * 6, 130 + 180 * 4, this);
        walls[22] = new wall(180 * 6, 130 + 180 * 6, this);
        walls[23] = new wall(180 * 8, 130 + 180 * 8, this);
        walls[24] = new wall(180 * 8, 130 + 180 * 9, this);
        walls[25] = new wall(180 * 9, 130 + 180 * 10, this);
        walls[26] = new wall(180 * 9, 130 + 180 * 11, this);
        walls[27] = new wall(180 * 7, 130 + 180 * 6, this);
        walls[28] = new wall(180 * 9, 130 + 180 * 9, this);
        /*
        walls[0] = new wall(0, 21609-720, this);
        walls[1] = new wall(0, 21609-970, this);
        walls[2] = new wall(0, 21609-1420, this);
        walls[3] = new wall(0, 21609-1670, this);
        walls[4] = new wall(0, 21609-1920, this);
        walls[5] = new wall(0, 21609-2170, this);
        walls[6] = new wall(200, 21609-850, this);
        walls[7] = new wall(200, 21609-1420, this);
        walls[8] = new wall(200, 21609-1920, this);
        walls[9] = new wall(200, 21609-2170, this);
        walls[10] = new wall(400, 21609-950, this);
        walls[11] = new wall(400, 21609-1370, this);
        walls[12] = new wall(400, 21609-1470, this);
        walls[13] = new wall(400, 21609-1650, this);
        walls[14] = new wall(400, 21609-1870, this);
        walls[15] = new wall(400, 21609-180, this);
        walls[16] = new wall(200 * 5, 180, this);
        walls[17] = new wall(200 * 5, 180 * 2, this);
        walls[18] = new wall(200 * 5, 180 * 3, this);
        walls[19] = new wall(200 * 5, 180 * 4, this);
        walls[20] = new wall(200 * 5, 180 * 4, this);
        walls[21] = new wall(200 * 2 + 400 * 5, 180 * 6, this);
        walls[22] = new wall(200 * 2 + 400 * 5, 180, this);
        walls[23] = new wall(200 * 4 + 400 * 5, 180, this);
        walls[24] = new wall(200 * 4 + 400 * 5, 180, this);
        walls[25] = new wall(200 * 4 + 400 * 5, 180 * 2, this);
        walls[26] = new wall(200 * 4 + 400 * 5, 180 * 3, this);
        walls[27] = new wall(400 * 5, 180 * 4 * 4, this);
        walls[28] = new wall(400 * 2 + 400 * 5, 180 * 4, this);

        walls[29] = new wall(200 * 10, 180 * 12, this);
        walls[30] = new wall(200 * 13, 180 * 10, this);
        walls[31] = new wall(200 * 13, 180 * 2, this);
        walls[32] = new wall(200 * 9, 180 * 3, this);
        walls[33] = new wall(200 * 15, 180 * 5, this);
        walls[34] = new wall(200 * 15, 180 * 4, this);
        walls[35] = new wall(200 * 15 + 400 * 5, 180 * 6, this);
        walls[36] = new wall(200 * 5 + 400 * 5, 180, this);
        walls[37] = new wall(200 * 9 + 400 * 5, 180, this);
        walls[38] = new wall(200 * 10 + 400, 180, this);
        walls[39] = new wall(200 * 2 + 400 * 5, 180 * 2, this);
        walls[40] = new wall(200 * 4 + 400 * 5, 180 * 3, this);
        walls[41] = new wall(400 * 5, 180 * 7, this);
        walls[42] = new wall(400 * 2 + 400 * 5, 180 * 4, this);
        */

        // MONSTRES
        monster = [];
        for (let i = 0; i < 50; i++) {
            let k = Math.random() * 10000 + 3847;
            let j = Math.random() * k;
            monster[i] = new shadow(j, 2160-Math.sqrt((k*k)-(j * j)), 1, this.physics.add.image(0, 0, 'haine1'), 0, 720*3, this);
            animateSprite(monster[i].img, 'haine', 4, 500);
            this.physics.add.overlap(collisionLeft, monster[i].img, readyToAttack, null, this);
            this.physics.add.overlap(collisionRight, monster[i].img, readyToAttack, null, this);
            this.physics.add.overlap(playe.sprite, monster[i].img, lose_hp, null, this);
        }

        monstres_rand = [];
        for (let i = 0; i < 10; i++) {
            monstres_rand[i] = new shadow(Math.random*3740,Math.random*1440,1,this.physics.add.image(0, 0, 'haine1'),Math.random*3740,Math.random*1440, this);
            animateSprite(monster[i].img, 'haine', 4, 500);
            this.physics.add.overlap(collisionLeft, monstres_rand[i].img, readyToAttack, null, this);
            this.physics.add.overlap(collisionRight, monstres_rand[i].img, readyToAttack, null, this);
            this.physics.add.overlap(playe.sprite, monstres_rand[i].img, lose_hp, null, this);
        }

        //inventaire
        inv = new inventory();

        // Proprietes gemmes
        gemme1.forEach((g) => {
            this.physics.add.overlap(playe.sprite, g.img, collectSoul, null, this);
        });
        gemme2.forEach((g) => {
            this.physics.add.overlap(playe.sprite, g.img, collectSoul, null, this);
    });
    gemme3.forEach((g) => {
        this.physics.add.overlap(playe.sprite, g.img, collectSoul, null, this);
    });
    /*walls.forEach((w)=> {
        this.physics.add.overlap(playe.sprite, w.hitbox, my_collision(playe.mv), null, this);
        //this.physics.add.collider(playe, w);
    });*/
    // NEXUS
    brain = new nexusClass(0, 2160);

    // CAMERA
    this.cameras.main.startFollow(playe.sprite, true, 0.5, 0.5);

    occlusion = this.add.image(0, 0, 'occlusion').setOrigin(0.5);
    //occlusion = this.add.image(0, 0, 'occlusion').setOrigin(-100);

    hud = this.add.image(0, 0, 'hud').setOrigin(0).setScrollFactor(0);
    soul1 = new soul(800, 43, 1, this);
    soul2 = new soul(905, 43, 2, this);
    soul3 = new soul(1015, 43, 3, this);
    soul4 = new soul(1120, 43, 4, this);

    shop = this.add.image(0, 0, 'shop').setOrigin(0).setScrollFactor(0);
    shop.alpha = 0;

    time = new timer(this);
    time.settime(30, 7, this);
}

function actionButton(game) {
    //if ((playe.sprite.x >= 0 && playe.sprite.x <= 720) && (playe.sprite.y >= 2 * 720 && playe.sprite.y <= 3 * 720)) {
    if (get_vector() < 900) {
        shop.alpha = 1;
        if (keyW.isDown && soul1.compt.compt >= 50 && achat1 != 1) {
            sword = game.add.image(75, 592, 'sword').setOrigin(0).setScrollFactor(0);
            soul1.compt.compt -= 50;
            playe.weapon = "epee";
            inv.epee = true;
            ting.play();
            achat1 = 1;
        }
        if (keyX.isDown && soul1.compt.compt >= 30 && achat2 != 2) {
            axe = game.add.image(145, 597, 'axe').setOrigin(0).setScrollFactor(0);
            soul1.compt.compt -= 30;
            playe.weapon = "axe";
            inv.axe = true;
            ting.play();
            achat2 = 2;
        }
        if (keyC.isDown && ((soul1.compt.compt + soul2.compt.compt + soul3.compt.compt) >= 35) && achat3 != 3) {
            thunes = 35;
            armor = game.add.image(220, 595, 'chestplate').setOrigin(0).setScrollFactor(0);
            if (soul3.compt.compt < 35) {
                thunes -= soul3.compt.compt;
                soul3.compt.compt = 0;
            } else {
                soul3.compt.compt -= thunes;
                thunes = 0;
            }
            if (soul2.compt.compt < thunes) {
                thunes -= soul2.compt.compt;
                soul2.compt.compt = 0;
            } else {
                soul2.compt.compt -= thunes;
                thunes = 0;
            }
            if (soul1.compt.compt < thunes) {
                thunes -= soul1.compt.compt;
                soul1.compt.compt = 0;
            } else {
                soul1.compt.compt -= thunes;
                thunes = 0;
            }
            ting.play();
            achat3 = 3;
        }
    } else {
        shop.alpha = 0;
    }
    soul1.add(0, game);
    soul2.add(0, game);
    soul3.add(0, game);
}

// p = player; m = monster
var lifeTextMonster = [];
function readyToAttack(p, m) {
    if(playe.attackDelay <= 0) {
        if(keyRight.isDown || keyLeft.isDown) {
            if(playe.getWeaponType() == "epee") {
                playe.attackDelay = 100;
            } else if(playe.getWeaponType() == "hache") {
                playe.attackDelay = 75;
            }
            else {
                playe.attackDelay = 50;
            }
            m.life -= playe.damage;
            playe.isAnimated = true;
            playe.sprite.setTexture("player"+playe.getType()+"_attack1");
            setTimeout(() => {
                lifeTextMonster.push(this.add.text((m.x - 30) + Math.random()*60, (m.y - 30) + Math.random()*60, playe.damage, {font: "20px Arial", fill: "#fff"}));
                playe.sprite.setTexture("player"+playe.getType()+"_attack2");
                if(playe.getType()) {
                    hache.play();
                } else {
                    poing.play();
                }
                setTimeout(() => {
                    playe.sprite.setTexture("player"+playe.getType()+"_attack3");
                    setTimeout(() => {
                        playe.isAnimated = false;
                    }, 150);
                }, 150);
            }, 150);
        }
    }
}

function collectSoul(player, gemme)
{
    gemme.hp -= 1;
    if (gemme.hp <= 0) {
        gemme.disableBody(true, true);
    }
}

// Boucle du jeu (60 fois par sec)
//donc pas besoin de time: un int suffit! lol
var tempInterv = 0;
function modify_player_mvt(vitesse) {
    playe.sprite.isMoving = false;
    playe.sprite.setVelocity(0);
    var blocked = false;
    if (keyQ.isDown) {
        if(my_check_block(0, 20, 0, 0) == 1) {
            playe.sprite.isMoving = true;
            playe.sprite.setFlipX(true);
            playe.sprite.setVelocityX(-vitesse);
            blocked = true;
        } else {
            //console.log("Q");
            blocked = false;
            //playe.sprite.setVelocityX(vitesse);
            //playe.sprite.setPosition(playe.sprite.x + 2, playe.sprite.y);
        }
    }
    if (keyD.isDown) {
        if(my_check_block(20, 0, 0, 0) == 1) {
            playe.sprite.isMoving = true;
            playe.sprite.setFlipX(false);
            playe.sprite.setVelocityX(vitesse);
            blocked = true;
        } else {
            //console.log("D");
            blocked = false;
            //playe.sprite.setVelocityX(-vitesse);
            //playe.sprite.setPosition(playe.sprite.x - 2, playe.sprite.y);
        }
    }
    if (keyZ.isDown) {
        if(my_check_block(0, 0, 0, 20) == 1) {
            playe.sprite.isMoving = true;
            playe.sprite.setVelocityY(-vitesse);
            blocked = true;
        } else {
            //console.log("Z");
            blocked = false;
            //playe.sprite.setVelocityY(vitesse);
            //playe.sprite.setPosition(playe.sprite.x, playe.sprite.y + 2);
        }
    }
    if (keyS.isDown) {
        if(my_check_block(0, 0, 20, 0) == 1) {
            playe.sprite.isMoving = true;
            playe.sprite.setVelocityY(vitesse);
            blocked = true;
        } else {
            //console.log("S");
            blocked = false;
            //playe.sprite.setVelocityY(-vitesse);
            //playe.sprite.setPosition(playe.sprite.x, playe.sprite.y - 2);
        }
    }
    if(playe.sprite.isMoving) {
        tempInterv++;
        if(tempInterv % 20 == 0) {
            playe.sprite.setTexture("player"+playe.getType()+"_run1");
        } else if(tempInterv % 10 == 0) {
            playe.sprite.setTexture("player"+playe.getType()+"_run2");
        }
    } else if(!playe.isAnimated) {
        playe.sprite.setTexture("playerImg"+playe.getType());
    }
}

function update()
{
    // Occlusion
    //console.log(get_vector());
    if(get_vector() < 800) {
        occlusion.aplha = 0;
    }
    if(get_vector() > 1000) {
        occlusion.aplha = 1;
    } else {
        occlusion.alpha = rangeMap(get_vector(), 800, 1000, 0, 1);
    }

    actionButton(this);
    //this.physics.add.collider(playe.sprite, monster.img);
    /*if (time.sec == 0 && time.min == 0) {
        for (let i = 0; i < 50; i++) {
            monster.life = 2;
            monster.img.enableBody(true, true);
            console.log("ils arrivent");
        }
    }*/
    if (time.min < 5 && time.min > 3)
        for (let i = 0; i < 10; i++) {
            monstres_rand[i].xobj = 0;
            monstres_rand[i].yobj = 2160;
        }
    for (let i = 0; i < 10; i++)
        if (monstres_rand[i].x == monstres_rand[i].xobj && monstres_rand[i].y == monstres_rand[i].yobj && monstres_rand[i].img.life > 0) {
            monstres_rand[i].xobj = Math.random() * 3740;
            monstres_rand[i].yobj = Math.random() * 1440;
        }
    for (let i = 0; i < 50 && time.min < 5; i++)
        monster[i].Move();
    for (let i = 0; i < 10; i++)
        monstres_rand[i].Move();
    for (let i = 0; i < 50; i++) {
        if (monster[i].img.life > 0 && ((monster[i].xobj-monster[i].x)*(monster[i].xobj-monster[i].x)+(monster[i].yobj-monster[i].y)*(monster[i].yobj-monster[i].y)) <= 10000) {
            monster[i].img.life = 0;
            brain.Dgt();
        }
        else if (monster[i].img.life > 0) {
            monster[i].img.setPosition(monster[i].x, monster[i].y);
        }
        if (monster[i].img.life <= 0) {
            //console.log("Le monstre numero " + i + " est mort.");
            monster[i].img.disableBody(true, true);
        }
    }
    for (let i = 0; i < 10; i++) {
        if (monstres_rand[i].img.life > 0 && ((monstres_rand[i].xobj-monstres_rand[i].x)*(monstres_rand[i].xobj-monstres_rand[i].x)+(monstres_rand[i].yobj-monstres_rand[i].y)*(monstres_rand[i].yobj-monstres_rand[i].y)) <= 10000) {
            monstres_rand[i].img.life = 0;
            brain.Dgt();
        }
        else if (monstres_rand[i].img.life > 0) {
            monstres_rand[i].img.setPosition(monstres_rand[i].x, monstres_rand[i].y);
        }
        if (monstres_rand[i].img.life <= 0) {
            monstres_rand[i].img.disableBody(true, true);
        }
    }
    if (brain.life == 0) {
        alert("Game Over: 10 spectres de haine sont parvenus au cerveau");
        brain.life--;
    }
    modify_player_mvt(400);
    //modify_player_angle();
    //playe.sprite.setPosition(playe.x + playe.mv.x, playe.x + playe.mv.y);

    // ETAT DES GEMMES
    gemme1.forEach((g)=> {
        g.img.break_indicator();
    });
    gemme2.forEach((g)=> {
        g.img.break_indicator();
    });
    gemme3.forEach((g)=> {
        g.img.break_indicator();
    });

    // Collisions
    collisionLeft.setPosition(playe.sprite.x - 50, playe.sprite.y);
    collisionRight.setPosition(playe.sprite.x + 50, playe.sprite.y);
    playe.update();

    occlusion.setPosition(playe.sprite.x, playe.sprite.y);

    lifeTextMonster.forEach((txt) => {
        var txtY = txt.y + 1;
        txt.setPosition(txt.x, txtY);
        txt.alpha -= 0.02;
    });

    if(keyOne.isDown && inv.epee) {
        playe.weapon = "epee";
    }
    if(keyTwo.isDown && inv.axe) {
        playe.weapon = "axe";
    }
}

let animations = [];
function animateSprite(sprite, name, indexs, delay) {
    let i = 1;
    animations[name] = setInterval(function() {
        if(i > indexs) {
            i = 1;
        }
        sprite.setTexture(name + i);
        i++;
    }, delay);
}


function my_check_block(left, right, up, down)
{
    for(var i = 0; i < walls.length; i++) {
        if (walls[i].x + 120 - left > playe.sprite.x && walls[i].x < playe.sprite.x + 120 - right && walls[i].y + 280  - up > playe.sprite.y && walls[i].y < playe.sprite.y - down) {
            return (0);
        }
    }
    return (1);
}

function get_vector()
{
    var tmp = Math.sqrt(Math.pow(playe.sprite.x, 2) + Math.pow(playe.sprite.y - 3 * 720, 2));
    return (tmp);
}

function rangeMap(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

// Autre
var a={37:"left",38:"up",39:"right",40:"down",65:"a",66:"b"},b="up up down down left right left right b a".split(" "),c=0;document.addEventListener("keydown",function(d){a[d.keyCode]==b[c]?(c++,c==b.length&&(playe.def=!0,c=0)):c=0});