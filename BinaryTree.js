/**
 * 基本二叉树操作
 * */
'use strict';
class Node {

    constructor(value) {

        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    isLeaf() {

        return this.left === null && this.right === null;
    }
}

class BinaryTree {

    constructor() {

        this.root = null;
        this.size = 0;
    }

    insertRecursively(value, target) {

        const node = new Node(value);

        if (target === undefined) {

            target = this.root;
        }

        if (!this.root) {

            this.root = node;
            return this;
        }

        if (target) {

            if (target.value > value) {

                if (target.left === null) {

                    target.left = node;
                    node.parent = target;
                }
                else {

                    this.insertRecursively(value, target.left);
                }
            }
            else {

                if (target.right === null) {

                    target.right = node;
                    node.parent = target;
                }
                else {

                    this.insertRecursively(value, target.right);
                }
            }
        }

        return this;
    }

    insert(value) {

        this.size++;

        const node = new Node(value);
        let iteratee = this.root;
        let parent = null;
        let pos = null;

        if (this.root === null) {

            this.root = node;
        }
        else {

            while (iteratee !== null) {

                parent = iteratee;

                if (iteratee.value > node.value) {

                    iteratee = iteratee.left;
                    pos = 'left';
                }
                else {

                    iteratee = iteratee.right;
                    pos = 'right';
                }
            }

            parent[pos] = node;
            node.parent = parent;
        }

        return this;
    }

    iterate(type) {

        switch (type) {

            case 'middle':
                this.iterateMiddle(this.root);
                break;

            case 'first':
            default:
                this.iterateFirst(this.root);
                break;

            case 'last':
                this.iterateLast(this.root);
                break;
        }
    }

    iterateFirst(node) {

        if (node !== null) {

            console.log(node.value);
            this.iterateFirst(node.left);
            this.iterateFirst(node.right);
        }
    }

    iterateMiddle(node) {

        if (node !== null) {

            this.iterateMiddle(node.left);
            console.log(node.value);
            this.iterateMiddle(node.right);
        }
    }

    iterateLast(node) {

        if (node !== null) {

            this.iterateLast(node.left);
            this.iterateLast(node.right);
            console.log(node.value);
        }
    }

    getMin(node) {

        if (node === undefined) {

            node = this.root;
        }

        if (node.left === null) {

            return node.value;
        }
        else {

            return this.getMin(node.left);
        }
    }

    getMax(node) {

        if (node === undefined) {

            node = this.root;
        }

        if (node.right === null) {

            return node.value;
        }
        else {

            return this.getMax(node.right);
        }
    }

    getNodeByValue(value, node) {

        if (node === undefined) {

            node = this.root;
        }

        if (node.value === value) {

            return node;
        }
        else {

            if (node.value > value) {

                return this.getNodeByValue(value, node.left);
            }
            else {

                return this.getNodeByValue(value, node.right);
            }
        }

        return null;
    }

    delete(value) {

    }
}

const testTree = new BinaryTree();

testTree
    .insertRecursively(50)
    .insertRecursively(5)
    .insertRecursively(100)
    .insert(200)
    .insert(8);

testTree.iterate('first');

console.log('min:');
console.log(testTree.getMin());
console.log('max:');
console.log(testTree.getMax());
console.log(testTree.getNodeByValue(8));