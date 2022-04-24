import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const emptyArray = Array(9).fill(null);
const gameSize = 3;

function Square(props) {
      return (
        <button 
            className="square"
            onClick={props.onClick}>
                {props.value}
        </button>
      );
  }
  
class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
        // for (let i = 0; i < gameSize; i++) {
        //     for (let j = 0; j < gameSize; j++) {
                
        //     }
        // }
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    static positions = [];

    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: [...emptyArray],
            }],
            stepNumber: 0,
            xIsNext : true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber  + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) 
            return;
        squares[i] = this.state.xIsNext ? 'X' : '0';
        this.setState({
            history: history.concat([{
              squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
          });
    }

    jumpTo(step) {
        this.setState({
            stepNumber : step,
            xIsNext: (step % 2) === 0,
        });
        console.log('Game.positions :>> ', Game.positions);
        Game.positions.splice(step);
        console.log('Game.positions :>> ', Game.positions);
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        Game.positions.push(getPosition(history));

        const moves = history.map((step, move) => {
            const description = move 
                ? `Go to step №${move} ${Game.positions[move]}`
                : 'To start';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            )
        });

        function getPosition(history) {
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



        const status = winner 
            ? `Winner is ${winner}` 
            : `Next player: ${this.state.xIsNext ? 'X' : '0'}`;

        return (
            <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={i => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );

        
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
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
        return squares[a];
      }
    }
    return null;
  }
  