export class NodeTree<T> {
    value: T;
    leftNode: NodeTree<T> | undefined; // добавляем возможность проверять на undefiend
    rightNode: NodeTree<T> | undefined;

    constructor(value: T) {
        this.value = value;
        this.leftNode = undefined;
        this.rightNode = undefined;
    }

}
