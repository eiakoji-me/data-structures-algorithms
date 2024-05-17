/*
Approach: 
  1 - Create board from array of strings
  2 - Create a map to store the number of ships of each type
  3 - Iterate through the board
  4 - If cell is a ship, visit all connected cells and mark them as visited
  5 - Count the number of connected cells and increment the ship type count
  6 - Return array of ship type counts in the form [patrol ship, destroyer, submarine]

  This can be tested using ts-node by running the command:
    ts-node battleship.ts
*/

function solution(B: string[]): number[] {
  // Implement your solution here
  let shipsMap = {
    p: 0,
    d: 0,
    s: 0,
  };

  let board = B.map((row) => row.split(''));

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let shipType = findShipType(board, i, j);

      if (shipType === 1) {
        shipsMap.p++;
      }
      if (shipType === 2) {
        shipsMap.d++;
      }
      if (shipType > 2) {
        shipsMap.s++;
      }
    }
  }

  return [shipsMap.p, shipsMap.d, shipsMap.s];
}



function visitConnectedCells(
  board: string[][],
  x: number,
  y: number,
  count: number,
): number {
  if (count === 3) return count; // we cannot have more than 3 connected cells
  // Scan all adjacent cells
  const N = board.length;
  const M = board[0].length;
  if (x >= 0 && y >= 0 && x < N && y < M && board[x][y] === '#') {
    // Mark the current cell as visited
    board[x][y] = 'X';
    count++;

    // Visit all adjacent cells
    count = visitConnectedCells(board, x - 1, y, count);
    count = visitConnectedCells(board, x + 1, y, count);
    count = visitConnectedCells(board, x, y - 1, count);
    count = visitConnectedCells(board, x, y + 1, count);
  }

  return count;
}

function findShipType(board: string[][], x: number, y: number): number {
  if (board[x][y] !== '#') {
    board[x][y] = 'X';
    return 0;
  }

  return visitConnectedCells(board, x, y, 0);
}


// Generate arrays of random boards and test the solution against them
function generateBoard(): string[] {
  const boardSize = Math.floor(Math.random() * 10);
  const symbols = ['.', '#'];
  let board: string[] = [];

  for (let i = 0; i < boardSize; i++) {
    let row = '';
    for (let j = 0; j < boardSize; j++) {
      row += symbols[Math.floor(Math.random() * symbols.length)];
    }
    board.push(row);
  }

  return board;
}

let boards: Array<string[]> = [];
boards.push(['.##.#', '#.#..', '#...#', '#.##.']); // Default test case: [2, 1, 2]
boards.push(['#..#', '...#', '....#', '.....']);
// for (let i = 0; i < 10; i++) {
//   boards.push(generateBoard());
// }

boards.forEach((board) => {
  console.log(board.map((row) => row.split('')));
  console.log(solution(board));
});
