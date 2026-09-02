const w = 20, h = 20;
const grid = Array(h).fill().map(() => Array(w).fill('.'));
function rect(x, y, w, h, char) {
  for(let i=y; i<y+h; i++) {
    for(let j=x; j<x+w; j++) {
      if(i>=0 && i<20 && j>=0 && j<20) grid[i][j] = char;
    }
  }
}
// L
rect(2, 2, 3, 16, 'L');
rect(2, 15, 7, 3, 'L');
// P
rect(11, 2, 7, 10, 'P');
rect(11, 2, 3, 16, 'P');
// Hole
rect(14, 5, 2, 4, '.');

grid.forEach(row => console.log(row.join('')));
