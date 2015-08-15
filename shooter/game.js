'use strict';

var game = new Phaser.Game(800,600,Phaser.AUTO,'game',
  {preload:preload,create:create,update:update,render:render});

var ship;
var cursors;
var missile;
var background;
var enemy;

function preload() {
  game.stage.backgroundColor = '#bbbbbb';
  game.load.image('background', 'space.gif');
  game.load.image('ship', 'ship.gif');
  game.load.image('missile', 'missile.gif');
  game.load.image('enemy', 'enemy.gif');
}

function create() {
  background = game.add.tileSprite(0,0,800,600,'background');
  background.autoScroll(-100,0);
  missile = game.add.sprite(60,350,'missile');
  ship = game.add.sprite(20,300,'ship');
  enemy = game.add.sprite(600,300,'enemy');
  game.physics.enable(ship, Phaser.Physics.ARCADE);
  game.physics.enable(missile, Phaser.Physics.ARCADE);
  game.physics.enable(enemy, Phaser.Physics.ARCADE);
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.overlap(missile, enemy, collisionHandler, null, this);


  ship.body.velocity.x = 0;
  ship.body.velocity.y = 0;


  if (! missile.shooting) {
    missile.body.velocity.x = 0;
    missile.body.velocity.y = 0;
    missile.x = ship.x;
    missile.y = ship.y + 7;
    missile.renderable = true;
  }
  
  //move up
  if (cursors.up.isDown) {
    ship.body.velocity.y = -300;
    if (! missile.shooting) {
      missile.body.velocity.y = -300;
    }
  }

  //move down
  else if (cursors.down.isDown) {
    ship.body.velocity.y = 300;
    if (! missile.shooting) {
      missile.body.velocity.y = 300;
    }
  }
  
  //reset if off screen
  if (missile.x > 800) {
    missile.shooting = false;
    missile.renderable = false;
    missile.body.velocity.x = 0;
    missile.body.velocity.y = 0;
    missile.x = ship.x;
    missile.y = ship.y;
  }

  //shoot
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    missile.body.velocity.x = 1000;
    missile.shooting = true;
  }
}

function render() {
}

function collisionHandler(missile, enemy) {
  missileReset();
  repositionEnemy();
}

function repositionEnemy() {
  enemy.x = game.rnd.integerInRange(100, 780);
  enemy.y = game.rnd.integerInRange(20, 540);
}

function missileReset() {
  missile.shooting = false;
  missile.body.velocity.x = 0;
  missile.body.velocity.y = 0;
}
