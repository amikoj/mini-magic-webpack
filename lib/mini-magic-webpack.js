const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

// ================== 霍格沃茨分隔线 ==================
//                🧙 核心魔法仪式实现
// ================================================

class MiniWebpack {
  constructor(options) {
    this.entry = options.entry;  // 入口文件路径
    this.output = options.output;// 输出路径
  }

  // 魔法仪式启动！
  run() {
    const magicGraph = this.parseModule(this.entry);
    const bundleCode = this.generateBundle(magicGraph);
    fs.writeFileSync(this.output, bundleCode);
    this.showHogwartsCastle(); // 构建成功展示彩蛋
  }

  // 模块解析咒语（生成模块依赖图谱）
  parseModule(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // AST解析（相当于魔杖选择巫师）
    const ast = parser.parse(content, {
      sourceType: 'module'
    });

    // 依赖收集（召唤咒）
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });

    // ES6转ES5（变形咒）
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    });

    return {
      filePath,
      code,
      dependencies
    };
  }

  // 生成打包代码（终极咒语）
  generateBundle(entryModule) {
    return `
      (function(modules) {
        // 魔法执行环境（模拟require）
        function magicRequire(moduleId) {
          const module = { exports: {} };
          modules[moduleId](module, module.exports, magicRequire);
          return module.exports;
        }
        // 启动入口模块
        magicRequire('${entryModule.filePath}');
      })({
        ${this.buildModulesGraph(entryModule)}
      });
    `;
  }

  // 构建模块图谱（记忆魔法）
  buildModulesGraph(entry) {
    const graph = {};
    const queue = [entry];
    
    for (const module of queue) {
      graph[module.filePath] = {
        code: module.code,
        dependencies: module.dependencies
      };
      
      // 递归处理依赖（时间转换器）
      module.dependencies.forEach(depPath => {
        const absPath = path.join(path.dirname(module.filePath), depPath);
        const childModule = this.parseModule(absPath);
        queue.push(childModule);
      });
    }

    // 生成魔法契约
    return Object.keys(graph).map(filePath => {
      return `'${filePath}': function(module, exports, magicRequire) {
        ${graph[filePath].code}
      }`;
    }).join(',');
  }

  // ================== 趣味功能 ==================
  //              🎩 胖蔡的魔法彩蛋
  // ============================================
  
  showHogwartsCastle() {
    console.log(`
      ╔═╗╔╗╔╔═╗╦ ╦  ╔╗╔╔═╗╦═╗╔╦╗
      ║ ╦║║║║╣ ║║║  ║║║║ ║╠╦╝ ║ 
      ╚═╝╝╚╝╚═╝╚╩╝  ╝╚╝╚═╝╩╚═ ╩ 
    `);
    console.log('✨ 构建成功！霍格沃茨城堡已生成！');
  }
}

module.exports = MiniWebpack;