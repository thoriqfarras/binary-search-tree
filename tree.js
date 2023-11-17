const Node = require('./node.js');

class Tree {
  constructor(array) {
    let sorted = Array.from(new Set(array)).sort((a, b) => a - b); // .sort() by default sort by alphabetical order. Hence the callback.
    this.root = this.buildTree(sorted, 0, sorted.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const root = new Node(array[middle]);

    root.left = this.buildTree(array, start, middle - 1);
    root.right = this.buildTree(array, middle + 1, end);

    return root;
  }

  find(value, root) {
    if (!root) return null;
    if (value > root.value) return this.find(value, root.right);
    if (value < root.value) return this.find(value, root.left);
    return root;
  }

  insert(value) {
    let temp = this.root;
    while (temp !== null) {
      if (value === temp.value) {
        return 'value already exists';
      } else if (value > temp.value) {
        if (temp.right === null) {
          temp.right = new Node(value);
          break;
        }
        temp = temp.right;
      } else {
        if (temp.left === null) {
          temp.left = new Node(value);
          break;
        }
        temp = temp.left;
      }
    }
  }

  findMin(root = this.root) {
    if (!root) return null;

    let temp = root;
    if (temp.left) temp = this.findMin(temp.left);
    return temp;
  }

  delete(value, root = this.root) {
    if (!root) return root;
    else if (value < root.value) root.left = this.delete(value, root.left);
    else if (value > root.value) root.right = this.delete(value, root.right);
    else {
      if (!root.left && !root.right) root = null;
      else if (!root.left) root = root.right;
      else if (!root.right) root = root.left;
      else {
        const min = this.findMin(root.right);
        root.value = min.value;
        root.right = this.delete(min.value, root.right);
      }
    }
    return root;
  }

  levelOrder(root = this.root, callback = null) {
    if (!root) return [];
    let counter = 0;
    const unvisited = [root];
    const visited = [];
    while (unvisited.length !== 0) {
      let visitedNodeVal = unvisited.shift().value;
      if (callback) visitedNodeVal = callback(visitedNodeVal, counter);
      if (root.left) unvisited.push(root.left);
      if (root.right) unvisited.push(root.right);
      visited.push(visitedNodeVal);
      root = unvisited[0];
      counter += 1;
    }
    return visited;
  }

  levelOrderRecursive(
    root = this.root,
    visited = [],
    unvisited = [this.root],
    callback = null
  ) {
    throw new Error('method not yet implemented');
  }

  preOrder(root = this.root, array = [], callback = null) {
    if (!root) return;

    let value = root.value;
    if (callback) value = callback(value);
    array.push(value);
    this.preOrder(root.left, array, callback);
    this.preOrder(root.right, array, callback);
    return array;
  }

  inOrder(root = this.root, array = [], callback = null) {
    if (!root) return;

    this.inOrder(root.left, array, callback);
    let value = root.value;
    if (callback) value = callback(value);
    array.push(value);
    this.inOrder(root.right, array, callback);
    return array;
  }

  postOrder(root = this.root, array = [], callback = null) {
    if (!root) return;

    this.postOrder(root.left, array, callback);
    this.postOrder(root.right, array, callback);
    let value = root.value;
    if (callback) value = callback(value);
    array.push(value);
    return array;
  }

  height(root = this.root) {
    if (!root) return -1;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(targetNode, currentNode = this.root, depth = 0) {
    if (!currentNode) return -1;

    if (targetNode === currentNode) return depth;

    const leftDepth = this.depth(targetNode, currentNode.left, depth + 1);
    const rightDepth = this.depth(targetNode, currentNode.right, depth + 1);

    return Math.max(leftDepth, rightDepth);
  }

  isBalanced() {
    return (
      Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1
    );
  }

  rebalance() {
    if (this.isBalanced()) return;
    const array = this.inOrder();
    this.root = this.buildTree(array, 0, array.length - 1);
  }
}

module.exports = Tree;
