exports.winnerCheck = (gameState, index, numWinner, numColumnas) => {
  let linesToAnalize = [];
  let winnerArray1 = "1,1,1,1";
  let winnerArray2 = "2,2,2,2";
  
  for (let i = 0; i < 4; i++) {
    for (let aux = -numWinner + 1; aux < numWinner - 1; aux++) {
      if (i == 0 && gameState[index + aux] != undefined) {
        linesToAnalize.push(gameState[index + aux]);
      }
      if (i == 1 && gameState[index + aux + aux * numColumnas] != undefined) {
        linesToAnalize.push(gameState[index + aux + aux * numColumnas]);
      }
      if (i == 2 && gameState[index - aux + aux * numColumnas] != undefined) {
        linesToAnalize.push(gameState[index - aux + aux * numColumnas]);
      }
      if (i == 3 && gameState[index + aux * numColumnas] != undefined) {
        linesToAnalize.push(gameState[index + aux * numColumnas]);
      }
    }
    if (linesToAnalize.toString().includes(winnerArray1) || linesToAnalize.toString().includes(winnerArray2)) {
      return true;
    }
  }

  return false;
};
