exports.winnerCheck = (gameState, index, numWinner, numColumnas) => {
  let linesToAnalize = [];
  let winnerArray = "1,1,1,1";
  console.log(index);
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
    if (linesToAnalize.toString().includes(winnerArray)) {
      console.log("Anduvooooo");
      return true;
    }
  }
  console.log("Anda pero no gano");
  return false;
};
