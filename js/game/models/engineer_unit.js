EngineerUnit = function (index, game, opts) {
  opts = opts || {};
  opts.bullet_kill_distance = 100;
  Unit.apply(this, arguments);
};

EngineerUnit.prototype = Object.create(Unit.prototype);
EngineerUnit.prototype.constructor = EngineerUnit;
