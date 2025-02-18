
      (function(modules) {
        // 魔法执行环境（模拟require）
        function magicRequire(moduleId) {
          const module = { exports: {} };
          modules[moduleId](module, module.exports, magicRequire);
          return module.exports;
        }
        // 启动入口模块
        magicRequire('./src/index.js');
      })({
        './src/index.js': function(module, exports, magicRequire) {
        "use strict";

var _spell = require("./spell.js");
console.log('魔杖已就绪！');
(0, _spell.castSpell)('Lumos!');

// 🧙 趣味交互：构建成功后控制台输入以下咒语：
// - 'Expelliarmus' 查看依赖图谱
// - 'Avada Kedavra' 清空控制台
      },'src\spell.js': function(module, exports, magicRequire) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.castSpell = castSpell;
var _magic = require("./magic.js");
function castSpell(spell) {
  if ((0, _magic.checkMagic)(spell)) {
    console.log("\uD83E\uDE84 \u5492\u8BED\u751F\u6548\uFF1A".concat(spell));
  } else {
    console.log('💥 咒语反噬！请检查拼写');
  }
}
      },'src\magic.js': function(module, exports, magicRequire) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMagic = checkMagic;
var spells = ['Lumos', 'Expelliarmus', 'Wingardium Leviosa'];
function checkMagic(spell) {
  return spells.includes(spell.replace(/!$/, ''));
}
      }
      });
    


