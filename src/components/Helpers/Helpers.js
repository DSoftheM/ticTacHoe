export default class Helpers {
    static getPosition(history) {
        if (history.length > 1) {
            const lastMap = history[history.length - 1].squares;
            const prevMap = history[history.length - 2].squares;
            for (let i = 0; i < lastMap.length; i++)
                if (lastMap[i] !== prevMap[i])
                    return getPairByI(i);
        }
    
        function getPairByI(index) {
            const matrix3x3 = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ];
    
            for (let i = 0; i < matrix3x3.length; i++)
                for (let j = 0; j < matrix3x3.length; j++) {
                    if (index === matrix3x3[i][j]) {
                        return `(${i}, ${j})`;
                    }
                }
        }
    }

    static calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [
                squares[a], 
                lines[i]
            ];
          }
        }
        return null;
    }

    static getCurrentStatus(winner, stepNumber, xIsNext) {
        if (winner) {
            return `Winner is ${winner}`;
        } else if (stepNumber === 9) {
            return `Draw won`;
        } else {
            return `Next player: ${xIsNext ? 'X' : '0'}`;
        }
    }
}