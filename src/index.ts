import * as readlineSync from "readline-sync";
import { BinarySearchTree } from "./binary-search-tree.js";
import { NodeTree } from "./node-tree.js";

function index(): void {
    const BST: BinarySearchTree <number> = new BinarySearchTree();

    while (true) {
        console.log("");
        console.log("");
        console.log("Что сделать с двоичным деревом поиска?");
        console.log("1) Добавить элемента в дерево");
        console.log("2) Извлечь элемент по ключу");
        console.log("3) Удаление элемента с заданным ключом");
        console.log("4) Вывод всего дерева");
        console.log("5) Выход");
        const сhoice = readlineSync.question("Your choice:  ");
        switch (сhoice) {
            case "1":
                const insert = readlineSync.question("Key to insert = ");
                BST.insert(+insert);
                break;
            case "2":
                const keyFind = readlineSync.question("Key to find = ");
                const tmp: NodeTree<number> | undefined = BST.search(+keyFind);
                console.log(tmp?.value);
                break;
            case "3":
                const keyDelete = readlineSync.question("Key to remove = ");
                BST.remove(+keyDelete);
                break;
            case "4":
                console.log("");
                BST.print();
                break;
            case "5":
                return;
            default:
                console.log("Введено некорректное значение");
        }
    }
}

index();
