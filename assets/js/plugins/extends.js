;(function() {

  /**
   * native拡張
   */
  // forIn: http://qiita.com/phi/items/98975e1bb4995c1f1bcf
  Object.defineProperty(Object.prototype, "forIn", {
    value: function(fn, self) {
      self = self || this;

      Object.keys(this).forEach(function(key, index) {
        var value = this[key];

        fn.call(self, key, value, index);
      }, this);
    }
  });

  Math.randint = function(n) {
    return Math.floor(Math.random() * (n + 1));
  };

  Object.defineProperty(Array.prototype, "pick", {
    value: function() {
      var r = Math.randint(this.length - 1);
      return this[r];
    }
  });


  /**
   * enchant拡張
   */
  // enchant.Group.prototype.addChildren = function(children) {
  //   if (!Array.isArray(children)) children = Array.prototype.slice.call(arguments);
  //   children.forEach(function(child) {
  //     this.addChild(child);
  //   }.bind(this))
  // };

  enchant.Entity.prototype.setOrigin = function(x, y) {
    this.originX = this.width * x || 0;
    this.originY = this.height * y || 0;
    return this;
  };

  enchant.Node.prototype.addChildTo = function(parent) {
    parent.addChild(this);
    return this;
  };

}());