// Immediately invoked function
const result = (function add(n1: number, n2: number) {
  return n1 + n2;
})(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));

console.log(result);

// Funtion types and callbacks
(function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
})(
  Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 1000),
  (result) => {
    console.log(result);
  },
);


// Array destructuring
(
    function testArrayDestructuring(){
        const names = ['Max', 'Manuel'];
        const [first, second] = names;
        console.log(first, ",", second);
    }
)();