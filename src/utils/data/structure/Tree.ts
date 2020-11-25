/**
 * 通过tree结构实现多个级联选项，如商品多个选择
 * 参考https://mp.weixin.qq.com/s/TSaFOkKek0asJqdxDr1jxg
 */
class VariationSearchMap {
  tree: {};
  constructor(apiData) {
    this.tree = this.buildTree(apiData);
  }

  // 这就是前面那个构造树的方法
  buildTree(apiData) {
    const tree = {};
    const { variations, products } = apiData;

    // 先用variations将树形结构构建出来，叶子节点默认值为null
    addNode(tree, 0);
    function addNode(root, deep) {
      const variationName = variations[deep].name;
      const variationValues = variations[deep].values;

      for (let i = 0; i < variationValues.length; i++) {
        const nodeName = `${variationName}：${variationValues[i].name}`;
        if (deep === variations.length - 1) {
          root[nodeName] = null;
        } else {
          root[nodeName] = {};
          addNode(root[nodeName], deep + 1);
        }
      }
    }

    // 然后遍历一次products给树的叶子节点填上值
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const { variationMappings } = product;
      const level1Name = `${variationMappings[0].name}：${variationMappings[0].value}`;
      const level2Name = `${variationMappings[1].name}：${variationMappings[1].value}`;
      const level3Name = `${variationMappings[2].name}：${variationMappings[2].value}`;
      tree[level1Name][level2Name][level3Name] = product;
    }

    // 最后返回构建好的树
    return tree;
  }

  // 添加一个方法来搜索商品，参数结构和API数据的variationMappings一样
  findProductByVariationMappings(variationMappings) {
    const level1Name = `${variationMappings[0].name}：${variationMappings[0].value}`;
    const level2Name = `${variationMappings[1].name}：${variationMappings[1].value}`;
    const level3Name = `${variationMappings[2].name}：${variationMappings[2].value}`;

    const product = this.tree[level1Name][level2Name][level3Name];

    return product;
  }
}
export default VariationSearchMap;
/**
 * 如下示例，通过选项显示目标price并只通过id保存该操作
 */
const merchandise = {
  variations: [
    {
      name: '颜色',
      values: [{ name: '白色' }, { name: '红色' }],
    },
    {
      name: '尺码',
      values: [{ name: '39' }, { name: '40' }],
    },
    {
      name: '性别',
      values: [{ name: '男' }, { name: '女' }],
    },
  ],
  products: [
    {
      id: 1,
      variationMappings: [
        { name: '颜色', value: '白色' },
        { name: '尺码', value: '39' },
        { name: '性别', value: '男' },
      ],
    },
    // 下面还有7个商品，我就不重复了
  ],
};
