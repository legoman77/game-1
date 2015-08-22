'use strict';

var game = new Phaser.Game(800,600,Phaser.AUTO,'game',
  {preload:preload,create:create,update:update,render:render});

var ship;
var cursors;
var bullet;
var background;
var enemy;

function preload() {
  game.stage.backgroundColor = '#bbbbbb';
  game.load.image('background', 'space.gif');
  game.load.image('ship', 'ship.gif');
  game.load.image('bullet', 'bullet.gif');
  game.load.image('enemy', 'enemy.gif');
}

function create() {
  background = game.add.tileSprite(0,0,800,600,'background');
  background.autoScroll(-100,0);
  bullet = game.add.sprite(60,350,'bullet');
  ship = game.add.sprite(20,300,'ship');
  enemy = game.add.sprite(600,300,'enemy');
  game.physics.enable(ship, Phaser.Physics.ARCADE);
  game.physics.enable(bullet, Phaser.Physics.ARCADE);
  game.physics.enable(enemy, Phaser.Physics.ARCADE);
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.overlap(bullet, enemy, collisionHandler, null, this);


  ship.body.velocity.x = 0;
  ship.body.velocity.y = 0;


  if (! bullet.shooting) {
    bullet.body.velocity.x = 0;
    bullet.body.velocity.y = 0;
    bullet.x = ship.x;
    bullet.y = ship.y + 7;
    bullet.renderable = true;
  }
  
  //move up
  if (cursors.up.isDown) {
    ship.body.velocity.y = -300;
    if (! bullet.shooting) {
      bullet.body.velocity.y = -300;
    }
  }

  //move down
  else if (cursors.down.isDown) {
    ship.body.velocity.y = 300;
    if (! bullet.shooting) {
      bullet.body.velocity.y = 300;
    }
  }
  
  //reset if off screen
  if (bullet.x > 800) {
    bullet.shooting = false;
    bullet.renderable = false;
    bullet.body.velocity.x = 0;
    bullet.body.velocity.y = 0;
    bullet.x = ship.x;
    bullet.y = ship.y;
  }

  //shoot
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    bullet.body.velocity.x = 1000;
    bullet.shooting = true;
  }
}

function render() {
}

function collisionHandler(bullet, enemy) {
  missileReset();
  repositionEnemy();
}

function repositionEnemy() {
  enemy.x = game.rnd.integerInRange(100, 780);
  enemy.y = game.rnd.integerInRange(20, 540);
}

function missileReset() {
  bullet.shooting = false;
  bullet.body.velocity.x = 0;
  bullet.body.velocity.y = 0;
}
