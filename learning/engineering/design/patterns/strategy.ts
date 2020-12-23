const TYPE = {
  JUICE: 'juice',
  SALAD: 'salad',
  JAM: 'jam',
};

const strategies = {
  [TYPE.JUICE]: function(fruits) {
    console.log('榨果汁中...');
    return '果汁';
  },
  [TYPE.SALAD]: function(fruits) {
    console.log('做沙拉中...');
    return '沙拉';
  },
  [TYPE.JAM]: function(fruits) {
    console.log('做果酱中...');
    return '果酱';
  },
};

function enjoy({ type = TYPE.JUICE, fruits }) {
  if (!type) {
    console.log('请直接享用！');
    return;
  }
  if (!fruits || !fruits.length) {
    console.log('请先采购水果！');
    return;
  }
  return strategies[type](fruits);
}

enjoy({ type: 'juice', fruits });
