export class Node<T> {
    value: T;
    leftNode: Node<T> | undefined; //добавляем возможность проверять на undefiend
    rightNode: Node<T> | undefined;

    constructor(value:T) {
        this.value = value;
        this.leftNode = undefined;
        this.rightNode = undefined;
    }

}