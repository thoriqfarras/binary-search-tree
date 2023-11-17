const Tree = require('./tree.js');

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const array = [];
for (let i = 0; i < 10; i += 1) {
  array.push(getRandomInt(0, 100));
}

const tree = new Tree(array);
prettyPrint(tree.root);
console.log(`\nBalanced: ${tree.isBalanced()}`);
console.log(`Level order: ${tree.levelOrder()}`);
console.log(`Pre-order: ${tree.preOrder()}`);
console.log(`In-order: ${tree.inOrder()}`);
console.log(`Post-order: ${tree.postOrder()}\n`);

console.log('Adding some new numbers...');
for (let i = 0; i < 5; i++) {
  tree.insert(getRandomInt(100, 200));
}

prettyPrint(tree.root);
console.log(`\nBalanced: ${tree.isBalanced()}`);
console.log('\nRebalancing...');
tree.rebalance();

prettyPrint(tree.root);
console.log(`\nBalanced: ${tree.isBalanced()}`);
console.log(`Level order: ${tree.levelOrder()}`);
console.log(`Pre-order: ${tree.preOrder()}`);
console.log(`In-order: ${tree.inOrder()}`);
console.log(`Post-order: ${tree.postOrder()}\n`);
