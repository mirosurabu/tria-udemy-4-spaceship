export default class PreloadState extends Phaser.State {

  init() {
    // Nothing here yet
  }

  preload() {
    // Images and spritesheets path
    this.load.path = 'assets/images/';

    // Load images
    this.load.image( 'space',         'space.png'         );
    this.load.image( 'player',        'player.png'        );
    this.load.image( 'bullet',        'bullet.png'        );
    this.load.image( 'enemyParticle', 'enemyParticle.png' );

    // Load spritesheets
    this.load.spritesheet( 'yellowEnemy', 'yellow_enemy.png', 50, 46, 3, 1, 1 );
    this.load.spritesheet( 'redEnemy',    'red_enemy.png',    50, 46, 3, 1, 1 );
    this.load.spritesheet( 'greenEnemy',  'green_enemy.png',  50, 46, 3, 1, 1 );

    // Maps path
    this.load.path = 'assets/maps/';

    // Load maps
    this.load.text('map1', 'map1.json');
    this.load.text('map2', 'map2.json');
    this.load.text('map3', 'map3.json');

    // Audio path
    this.load.path = 'assets/audio/';

    // Load audio
    this.load.audio('orchestra', ['8bit-orchestra.ogg', '8bit-orchestra.ogg']);
  }

  create() {
    this.state.start('PlayState');
  }
}
