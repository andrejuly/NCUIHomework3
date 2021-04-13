import {Node} from "./Node.js";

export class BinarySearchTree<T> {
    rootTree: Node<T> | undefined;

    constructor() {
        this.rootTree = undefined;
    }

    public insert(value: T) : boolean {
       return  this.insertNode(value, this.rootTree);
    }

    private insertNode(value: T, newNode: Node<T> | undefined): boolean {
        //если корневой узел не существует, то новый элемент становится корневым узлом
        if (newNode === undefined) { //=== сравнение на идентичность без приведения к одному типу
            this.rootTree = new Node<T>(value);
            return true;
        }

        //выбираем ветвь для добавления элемента
        if (newNode.value > value) {
            if (newNode.leftNode !== undefined) {
                if (!this.insertNode(value, newNode.leftNode)) {
                    return false;
                }
            } else {
                newNode.leftNode = new Node(value);
                return true;
            }
        } else {
            if (newNode.rightNode !== undefined) {
                if (!this.insertNode(value, newNode.rightNode)) {
                    return false;
                }
            } else {
                newNode.rightNode = new Node(value);
                return true;
            }
        }
        return true;
    }

    // Вывод дерева (вершина-левая ветвь-правая ветвь)
    private printKey(Node: Node<T> | undefined, level: number): void {
        if (Node !== undefined) {
            let i: number;
            for (i = 0; i < level; i++) {
                process.stdout.write("-");
            }
            console.log("Level = " + level +"  "+  "Element = " + Node.value);
            this.printKey(Node.leftNode, level + 1);
            this.printKey(Node.rightNode,level+1);

        }
    }
    public print(): void {
        this.printKey(this.rootTree, 0);
    }

    private searchValue(Node: Node<T> | undefined, value: T): Node<T> | undefined {
        if (Node === undefined) {
            return undefined;
        }
        else if (Node.value > value) {
            return this.searchValue(Node.leftNode,value);
        }
        else if (Node.value < Node.value) {
            return this.searchValue(Node.rightNode, value);
        }
        else if (value === Node.value) return Node;
    }

    public search(value: T): Node<T> | undefined {
        return this.searchValue(this.rootTree, value);
    }

    private removeValue(Node: Node<T> | undefined, value: T): Node<T> | undefined {
        if (Node === undefined) {
            return undefined;
        }
        // если данные, которые нужно удалить, меньше, чем значение корня, переходим к левому поддереву
        else if (value < Node.value) {
            Node.leftNode = this.removeValue(Node.leftNode, value);
            return Node;
        }
        // если данные, которые нужно удалить, больше, чем значение корня, переходим к правому поддереву
        else if (value > Node.value) {
            Node.rightNode = this.removeValue(Node.rightNode, value);
            return Node;
        } else // если значение равно значению корня, то удаляем узел
        // удаляем узел без потомков
            if (Node.leftNode === undefined && Node.rightNode === undefined) {
                Node = undefined;
                return Node;
            }
        // удаляем узел с одним потомком
            if (Node.leftNode === undefined) {
                Node = Node.rightNode;
                return Node;
            }
            else if (Node.rightNode === undefined) {
                Node = Node.leftNode;
                return Node;
            }
        // удаляем узел с двумя потомками
        let newNode = this.minNode(Node.rightNode); // минимальное значение правого поддерева хранится в новом узле
        Node.value = newNode.value;
        Node.rightNode = this.removeValue(Node.rightNode, Node.value);
        return Node;
    }

    // функция для нахождения минимального узла в дереве
    private minNode (curNode: Node<T>): Node<T> {
        // если слева от узла ноль тогда это должен быть минимальный узел
        if (curNode.leftNode === undefined) {
            return curNode;
        }
        return this.minNode(curNode.leftNode);
    }

    public remove(value: T): void {
        this.rootTree = this.removeValue(this.rootTree, value);
    }

}