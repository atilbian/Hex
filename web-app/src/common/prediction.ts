import { GameState, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

export function getNextPlaySuggestion(gameState: GameState, stoneColor: StoneColor): Coordinates {
  const allPotentialPlays = [];
  gameState.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value === "empty")
        allPotentialPlays.push({ x, y })
    })
  });
  if (allPotentialPlays.length === 0) throw new Error("There is no playable cell in the given board.")

  const winCostForPotentialPlays = allPotentialPlays.map(playPosition => {
    const potentialGameState = deepCloneObject(gameState) as GameState;
    potentialGameState.board[playPosition.y][playPosition.x].value = stoneColor;
    return { playPosition, cost: getNbMovesNeededToWin(potentialGameState, stoneColor) }
  });

  return winCostForPotentialPlays.reduce(function (prev, curr) {
    return prev.cost <= curr.cost ? prev : curr;
  }).playPosition;
}