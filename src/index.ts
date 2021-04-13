import {BinarySearchTree} from "./BinarySearchTree.js";
import { Node } from "./Node.js";

const BST: BinarySearchTree <number> = new BinarySearchTree();

function index(): void {
BST.insert(11);
BST.insert(7);
BST.insert(9);
BST.insert(15);
BST.insert(6);
BST.print();

BST.insert(11);
BST.insert(3);
console.log();
console.log();
BST.print();

let searchNode1: Node<number> | undefined = BST.search(10);
let searchNode2: Node<number> | undefined = BST.search(3);
console.log();
console.log();
console.log(searchNode1?.value);
console.log(searchNode2?.value);

console.log();
console.log();
BST.remove(11);
BST.print();

console.log();
console.log();
BST.remove(6);
BST.print();
}

index();