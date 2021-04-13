import { NodeTree } from "./node-tree.js";

export class BinarySearchTree<T> {
    rootTree: NodeTree<T> | undefined;

    constructor() {
        this.rootTree = undefined;
    }

    public insert(value: T): boolean {
        return this.insertNode(value, this.rootTree);
    }

    private insertNode(value: T, newNode: NodeTree<T> | undefined): boolean {
        // если корневой узел не существует, то новый элемент становится корневым узлом
        if (newNode === undefined) { // === сравнение на идентичность без приведения к одному типу
            this.rootTree = new NodeTree<T>(value);
            return true;
        }

        // выбираем ветвь для добавления элемента
        if (newNode.value > value) {
            if (newNode.leftNode !== undefined) {
                if (!this.insertNode(value, newNode.leftNode)) {
                    return false;
                }
            } else {
                newNode.leftNode = new NodeTree(value);
                return true;
            }
        } else {
            if (newNode.rightNode !== undefined) {
                if (!this.insertNode(value, newNode.rightNode)) {
                    return false;
                }
            } else {
                newNode.rightNode = new NodeTree(value);
                return true;
            }
        }
        return true;
    }

    // Вывод дерева (вершина-левая ветвь-правая ветвь)
    private printValue(currentNode: NodeTree<T> | undefined, level: number): void {
        if (currentNode !== undefined) {
            let i: number;
            for (i = 0; i < level; i++) {
                process.stdout.write("-");
            }
            console.log("Level = " + level + "  " + "Element = " + currentNode.value);
            this.printValue(currentNode.leftNode, level + 1);
            this.printValue(currentNode.rightNode, level + 1);

        }
    }

    public print(): void {
        this.printValue(this.rootTree, 0);
    }

    private searchValue(currentNode: NodeTree<T> | undefined, value: T): NodeTree<T> | undefined {
        if (currentNode === undefined) {
            return undefined;
        }
        if (currentNode.value > value) {
            return this.searchValue(currentNode.leftNode, value);
        }
        if (currentNode.value < value) {
            return this.searchValue(currentNode.rightNode, value);
        }
        if (value === currentNode.value) {
            return currentNode;
        }
    }

    public search(value: T): NodeTree<T> | undefined {
        return this.searchValue(this.rootTree, value);
    }

    private removeValue(currentNode: NodeTree<T> | undefined, value: T): NodeTree<T> | undefined {
        if (currentNode === undefined) {
            return undefined;
        }
        if (value < currentNode.value) {
            currentNode.leftNode = this.removeValue(currentNode.leftNode, value);
            return currentNode;
        }
        if (value > currentNode.value) {
            currentNode.rightNode = this.removeValue(currentNode.rightNode, value);
            return currentNode;
        }
        // удаляем узел без потомков
        if (currentNode.leftNode === undefined && currentNode.rightNode === undefined) {
            currentNode = undefined;
            return currentNode;
        }
        // удаляем узел с одним потомком
        if (currentNode.leftNode === undefined) {
            currentNode = currentNode.rightNode;
            return currentNode;
        }
        if (currentNode.rightNode === undefined) {
            currentNode = currentNode.leftNode;
            return currentNode;
        }
        // удаляем узел с двумя потомками
        const newNode = this.minNode(currentNode.rightNode); // минимальное значение правого поддерева хранится в новом узле
        currentNode.value = newNode.value;
        currentNode.rightNode = this.removeValue(currentNode.rightNode, currentNode.value);
        return currentNode;
    }

    // функция для нахождения минимального узла в дереве
    private minNode(currentNode: NodeTree<T>): NodeTree<T> {
        // если слева от узла ноль тогда это должен быть минимальный узел
        if (currentNode.leftNode === undefined) {
            return currentNode;
        }
        return this.minNode(currentNode.leftNode);
    }

    public remove(value: T): void {
        this.rootTree = this.removeValue(this.rootTree, value);
    }
}
