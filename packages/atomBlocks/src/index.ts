const input = () => {};

interface Block {
  type: string,
  material: any,
}

const basicBlocks: Block[] = [
  {
    type: 'input',
    material: input,
  },
];

// 构造一个类来管理物料市场
class BlockSuite {
  private blocks = basicBlocks;
  // 添加物料
  addBlock(block: Block)  {}

  // 获取物料的类型和组件的映射表
  getBlocksMap() {
    return Object.fromEntries(this.blocks.map(block => [block.type, block.material]));
  }

  // 获取物料
  getBlocks() {
    return this.blocks;
  }

  // 判断该物料是否存在
  hasBlocks(type:string):boolean {
    return !!this.getBlocksMap()[type]
  }
}


const blockSuite = new BlockSuite();

const blocksMap = blockSuite.getBlocksMap();

const blocksMapSymbol = Symbol('blocksMap');

export default {
  install(app: any)  {
      app.provide(blocksMapSymbol, blocksMap);
      app.conifg.globalProperties.$blocksMap =  blocksMap;
  }
}