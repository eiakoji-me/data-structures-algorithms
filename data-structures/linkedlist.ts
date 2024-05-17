import { randomInt } from "./helpers";

type node = {
  value: number;
  next: node;
};

const NULL_NODE: node = null as unknown as node;

class linkedList {
  public head!: node;
  public tail!: node;
  public length!: number;

  constructor(value: number) {
    this.initialize(value);
  }

  private initialize(value: number): void {
    const newNode: node = {
      value: value,
      next: NULL_NODE,
    };
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  printList(): void {
    const array: number[] = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode?.value);
      currentNode = currentNode?.next;
    }
    console.log(array);
  }

  getHead(): void {
    console.log(this.head.value ?? 'null');
  }

  getTail(): void {
    console.log(this.tail.value ?? 'null');
  }

  getLength(): void {
    console.log(this.length);
  }

  makeEmpty(): void {
    this.head = NULL_NODE;
    this.tail = NULL_NODE;
    this.length = 0;
  }

  push(value: number): void {
    const newNode: node = {
      value: value,
      next: NULL_NODE,
    };

    if (this.length === 0) {
      this.initialize(value);
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
  }

  pop(): void {
    if (this.length === 0) {
      return;
    }

    let pre = this.head;
    let current = this.head.next;

    while (current.next !== null) {
      pre = current;
      current = current.next;
    }

    this.tail = pre;
    this.tail.next = NULL_NODE;
    this.length--;
  }

  pushRandomValues(): void {
    for (let i = 0; i < 10; i++) {
      this.push(randomInt());
    }
  }

  removeAll(): void {
    let nextNode = this.head.next;
    while (this.head !== null) {
      this.head = nextNode;
      nextNode = nextNode?.next;
      this.length--;
    }
  }

  unshift(value: number): void {
    if (this.length === 0) {
      this.initialize(value);
      return;
    }

    const newNode: node = {
      value,
      next: this.head,
    };

    this.head = newNode;
    this.length++;
  }

  shift(): void {
    if (this.length === 0) {
      return;
    }

    this.head = this.head.next;
    this.length--;

    if (this.length === 0) {
      this.tail = NULL_NODE;
    }

    this.printList();
  }

  findMiddleNode(): void {
    let slow = this.head;
    let fast = this.head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    console.log(slow.value);
  }

  hasLoop(): void {
    let slow = this.head;
    let fast = this.head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        console.log('loop detected');
        return;
      }
    }

    console.log('no loop detected');
  }

  findKthFromEnd(k: number): void {
    if (!this.head) {
      console.log(null);
      return;
    }

    if (k > this.length) {
      console.log('k is greater than length');
      return;
    }

    let slow = this.head;
    let fast = this.head;

    for (let i = 0; i < k; i++) {
      fast = fast.next;
    }

    while (fast !== null) {
      slow = slow.next;
      fast = fast.next;
    }

    console.log(slow.value);
  }

  partitionList(value: number): void {
    let lessThanValue!: linkedList;
    let greaterThanValue!: linkedList;
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value < value) {
        if (!lessThanValue) {
          lessThanValue = new linkedList(currentNode.value);
        } else {
          lessThanValue.push(currentNode.value);
        }
      } else {
        if (!greaterThanValue) {
          greaterThanValue = new linkedList(currentNode.value);
        } else {
          greaterThanValue.push(currentNode.value);
        }
      }
      currentNode = currentNode.next;
    }

    // let partionNode:node = {
    //   value: value,
    //   next: greaterThanValue.head,
    // };
    lessThanValue.tail.next = greaterThanValue.head;
    this.head = lessThanValue.head;
    this.printList();
  }

  removeDuplicates(): void {
    let currentNode = this.head;
    let seenValues: number[] = [];

    while (currentNode !== null) {
      if (seenValues.includes(currentNode.value)) {
        this.shift();
      } else {
        seenValues.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }
  }

  reverseList(): void {
    let currentNode = this.head;
    let prevNode = NULL_NODE;

    while (currentNode !== null) {
      let nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;
  }

  reverseBetween(m: number, n: number): void {
    if(!this.head) return;

    let headRef:node = {
      value: 0,
      next: this.head,
    }
    let prev = headRef;

    for(let i = 0; i < m; i++) {
      prev = prev.next;
    }

    let current = prev.next;
    for(let i = 0; i < n - m; i++) {
      let temp = current.next;
      current.next = temp.next;
      temp.next = prev.next;
      prev.next = temp;
    }

    this.head = headRef.next;
  }
}

const myLinkedList = new linkedList(randomInt());

//test init & destroy linked list
// myLinkedList.getHead();
// myLinkedList.getTail();
// myLinkedList.getLength();
// myLinkedList.printList();
// myLinkedList.makeEmpty();

//test push
myLinkedList.pushRandomValues();
myLinkedList.printList();

// //test unshift
// myLinkedList.unshift(randomInt());
// myLinkedList.printList();

// //test pop
// myLinkedList.pop();

// //test shift
// myLinkedList.shift();
// myLinkedList.shift();

// myLinkedList.findMiddleNode();
// myLinkedList.hasLoop();
// myLinkedList.findKthFromEnd(3);
//myLinkedList.makeEmpty();
//myLinkedList.findKthFromEnd(1);
// myLinkedList.partitionList(50);

// let binaryList = new linkedList(1);
// binaryList.push(0);
// binaryList.push(1);
// binaryList.push(1);
// binaryList.push(0);
// binaryList.push(1);


// (function binaryToDecimal(binaryString: linkedList): void {
//   let decimal = 0;
//   let n = binaryString.length;
//   let currentNode = binaryString.head;

//   while (currentNode !== null) {
//     decimal = decimal + currentNode.value * Math.pow(2, --n);
//     currentNode = currentNode.next;
//     console.log(decimal);
//   }
// })(binaryList);
myLinkedList.reverseBetween(1,4);
myLinkedList.printList();