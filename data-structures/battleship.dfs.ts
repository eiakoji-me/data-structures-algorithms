const EMPTY_CELL = '.';
const SHIP_CELL = '#';
const PATROL_SHIP = 1;
const DESTROYER = 2;
const SUBMARINE = 3;

// Generate arrays of random boards and test the solution against them
// Remove the duplicate function implementation

function countBattleships(boardStrings: string[]): number[] {
  let shipCounts: { [key: string]: number } = {
    [PATROL_SHIP]: 0,
    [DESTROYER]: 0,
    [SUBMARINE]: 0,
  };

  let board = boardStrings.map((row) => row.split(''));
  let m = board.length;
  let n = board[0].length;
  let shipCellCount = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === EMPTY_CELL) {
        if(shipCellCount === 2) shipCounts[DESTROYER]++;
        continue;
      }

      if (isSubmarine(board, i, j)) {
        shipCounts[SUBMARINE]++;
        continue;
      }
      if (isPatrolShip(board, i, j)) {
        shipCounts[PATROL_SHIP]++;
        continue;
      }
      if (i < m - 1 && board[i + 1][j] == SHIP_CELL) continue;
      if (j < n - 1 && board[i][j + 1] == SHIP_CELL) continue;
      shipCellCount++;
    }
  }

  return Object.values(shipCounts);
}

function getSurroundingCells(board: string[][], i: number, j: number) {
  let m = board.length;
  let n = board[0].length;
  let below = i > 0 ? board[i - 1][j] : null;
  let above = i < m - 1 ? board[i + 1][j] : null;
  let left = j > 0 ? board[i][j - 1] : null;
  let right = j < n - 1 ? board[i][j + 1] : null;
  let bottomLeft = i > 0 && j > 0 ? board[i - 1][j - 1] : null;
  let topRight = i < m - 1 && j < n - 1 ? board[i + 1][j + 1] : null;
  let bottomRight = i > 0 && j < n - 1 ? board[i - 1][j + 1] : null;
  let topLeft = i < m - 1 && j > 0 ? board[i + 1][j - 1] : null;

  return {
    left,
    right,
    above,
    below,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  };
}

const isPatrolShip = (board: string[][], i: number, j: number): boolean => {
  let { left, right, above, below } = getSurroundingCells(board, i, j);

  if (
    left === SHIP_CELL ||
    above === SHIP_CELL ||
    right === SHIP_CELL ||
    below === SHIP_CELL
  ) {
    return false;
  }
  return true;
};

const isDestroyer = (board: string[][], i: number, j: number): boolean => {
  let { left, right, above, below } = getSurroundingCells(board, i, j);

  if (left === SHIP_CELL || below === SHIP_CELL) {
    return false;
  }
  let count = 0;

  right === SHIP_CELL && above === EMPTY_CELL && count++;
  above === SHIP_CELL && right === EMPTY_CELL && count++;

  return count === 1;
};

const isSubmarine = (board: string[][], i: number, j: number): boolean => {
  let { left, right, above, below } = getSurroundingCells(board, i, j);

  return (
    (below === SHIP_CELL && above === SHIP_CELL) ||
    (left === SHIP_CELL && right === SHIP_CELL) ||
    (below === SHIP_CELL && left === SHIP_CELL) ||
    (below === SHIP_CELL && right === SHIP_CELL) ||
    (left === SHIP_CELL && above === SHIP_CELL)
  );
};

let newBoards = [];
newBoards.push(['.##.#', '#.#..', '#...#', '#.##.']);
newBoards.push(['#..#', '..##', '....', '....']);

newBoards.forEach((board) => {
  console.log(board.map((row) => row.split('')));
  console.log(countBattleships(board));
});

// let x = 3,
//   y = 2;
// const board = newBoards[0].map((row) => row.split(''));
// console.log(board[x][y], ': ', isDestroyer(board, x, y));
