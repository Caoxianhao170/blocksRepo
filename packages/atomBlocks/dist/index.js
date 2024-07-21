function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var input = function input() {};
var basicBlocks = [{
  type: 'input',
  material: input
}];

// 构造一个类来管理物料市场
var BlockSuite = /*#__PURE__*/function () {
  function BlockSuite() {
    _classCallCheck(this, BlockSuite);
    _defineProperty(this, "blocks", basicBlocks);
  }
  return _createClass(BlockSuite, [{
    key: "addBlock",
    value:
    // 添加物料
    function addBlock(block) {}

    // 获取物料的类型和组件的映射表
  }, {
    key: "getBlocksMap",
    value: function getBlocksMap() {
      return Object.fromEntries(this.blocks.map(function (block) {
        return [block.type, block.material];
      }));
    }

    // 获取物料
  }, {
    key: "getBlocks",
    value: function getBlocks() {
      return this.blocks;
    }

    // 判断该物料是否存在
  }, {
    key: "hasBlocks",
    value: function hasBlocks(type) {
      return !!this.getBlocksMap()[type];
    }
  }]);
}();
var blockSuite = new BlockSuite();
var blocksMap = blockSuite.getBlocksMap();
var blocksMapSymbol = Symbol('blocksMap');
var index = {
  install: function install(app) {
    app.provide(blocksMapSymbol, blocksMap);
    app.conifg.globalProperties.$blocksMap = blocksMap;
  }
};

export { index as default };
