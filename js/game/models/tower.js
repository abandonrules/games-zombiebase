// game, x, y, key, frame
var Tower = function (game, x, y, key, frame) {
  Phaser.Sprite.apply(this, arguments);
  this.game = game;
  this.weapon = null;
  this.units = [];
  this.unit_capacity = 1;

  this.angular_move_velocity = 100;

  this.initWeapon();
};
Tower.prototype = Object.create(Phaser.Sprite.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.update = function() {

};

Tower.prototype.canUnitJoin = function() {
  return this.units.length < this.unit_capacity;
};

Tower.prototype.addUnit = function(unit) {
  var joined = this.canUnitJoin();
  if (joined) {
    this.units.push(unit);
  }
  return joined;
};

Tower.prototype.removeUnit = function(unit) {

};

Tower.prototype.initWeapon = function() {
  this.weapon = this.game.add.weapon(30, 'bullet');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
  this.weapon.bulletKillDistance = UNIT_SPECS.BULLET_DISTANCE.HIGH;
  this.weapon.fireLimit = UNIT_SPECS.AMMO.HIGH;
  this.weapon.fireRate = UNIT_SPECS.FIRE_RATE.MEDIUM;
  this.weapon.trackSprite(this, 0, 0, true);
  this.weapon.onFireLimit.add(this.onFireLimit.bind(this));
};

Tower.prototype.onFireLimit = function() {
  this.game.physics.arcade.velocityFromAngle(this.angle, 0, this.body.velocity);
};

Tower.prototype.onMove = function(data) {
  if (data.left) {
    this.body.angularVelocity = -this.angular_move_velocity;
  } else if (data.right) {
    this.body.angularVelocity = this.angular_move_velocity;
  }
};

Tower.prototype.onShoot = function(data) {
  this.weapon.fire();
};

Tower.prototype.onUnitLeave = function(unit) {
  this.removeUnit(unit);
};
