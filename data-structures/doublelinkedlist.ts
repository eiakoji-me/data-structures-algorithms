import { randomInt } from './helpers';

class ListNode {
  public next!: ListNode;
  public previous!: ListNode;

  constructor(public value: number) {
    this.value = value;
    this.next = null as unknown as ListNode;
    this.previous = null as unknown as ListNode;
  }
}

const NULL_NODE: ListNode = null as unknown as ListNode;

class DoublyLinkedList {
  public head!: ListNode;
  public tail!: ListNode;
  public length!: number;

  constructor(public value: number) {
    this.head = new ListNode(value);
    this.tail = this.head;
    this.length = 1;
  }

  push(value: number): DoublyLinkedList {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop(): ListNode | undefined {
    if(this.length === 0) return undefined;
    let temp = this.tail;
    if(this.length === 1) {
      this.head = NULL_NODE;
      this.tail = NULL_NODE;
    } else {    
      this.tail = temp.previous as ListNode;
      this.tail.next = NULL_NODE;
      temp.previous = NULL_NODE;
    }
    this.length--;
    return temp;
  }

  unshift(value: number): DoublyLinkedList {
    const newNode = new ListNode(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  shift(): ListNode {
    if(this.length === 0) return undefined as unknown as ListNode;
    const temp = this.head;
    if(this.length === 1) {
      this.head = NULL_NODE;
      this.tail = NULL_NODE;
    } else {
      this.head = temp.next;
      this.head.previous = NULL_NODE;
      temp.next = NULL_NODE;
    }
    this.length--;
    return temp;
  }

  printList(): void {
    const array: number[] = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next as ListNode;
    }
    console.log(array);
  }

  get(index: number): ListNode | undefined {
    if (index < 0 || index >= this.length) return undefined;
    let currentNode: ListNode;
    if (index < this.length / 2) {
      currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
    } else {
      currentNode = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        currentNode = currentNode.previous;
      }
    }
    return currentNode;
  }

  set(index: number, value: number): boolean {
    const node = this.get(index);
    if (node) {
      node.value = value;
      return true;
    }
    return false;
  }

  insert(index: number, value: number): boolean {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new ListNode(value);
    const prevNode = this.get(index - 1) as ListNode;
    const nextNode = prevNode.next;
    prevNode.next = newNode;
    newNode.previous = prevNode;
    newNode.next = nextNode;
    nextNode.previous = newNode;
    this.length++;
    return true;
  }

  remove(index: number): ListNode | undefined {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const removedNode = this.get(index) as ListNode;
    const prevNode = removedNode.previous;
    const nextNode = removedNode.next;
    prevNode.next = nextNode;
    nextNode.previous = prevNode;
    removedNode.next = NULL_NODE;
    removedNode.previous = NULL_NODE;
    this.length--;
    return removedNode;
  }
}

let myDoublyLinkedList = new DoublyLinkedList(randomInt());
for (let i = 0; i < 5; i++) {
  myDoublyLinkedList.push(randomInt());
}
console.log('Test create list and add 5 elements: ');
myDoublyLinkedList.printList();

console.log('Test Popped element: ');
const node = myDoublyLinkedList.pop();
console.log(node);

console.log('Test Unshift and Shift methods: ');
myDoublyLinkedList.unshift(randomInt()).printList();
myDoublyLinkedList.shift();
myDoublyLinkedList.printList();

console.log('Test Get element: ');
console.log(myDoublyLinkedList.get(2));

console.log('Test Set element: ');
myDoublyLinkedList.set(2, 100);
myDoublyLinkedList.printList();