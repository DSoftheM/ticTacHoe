import React from "react";

import Board from "./Board";
import Helpers from "./Helpers/Helpers";

const emptyArray = Array(9).fill(null);

export default class Game extends React.Component {
    static positions = [];

    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: [...emptyArray],
            }],
            stepNumber: 0,
            xIsNext: true,
            isOrderReversed: false,
            indexColoredBtn: 0,
        };

        this.reverseOrder = this.reverseOrder.bind(this);
        this.paintFirstBtn = this.paintFirstBtn.bind(this);
    }

    reverseOrder() {
        this.setState({isOrderReversed : !this.state.isOrderReversed});
    }

    paintFirstBtn() {
        const btnsList = document.querySelector('.btns-list');
        const index = this.state.isOrderReversed ? this.state.stepNumber - 1 : 0;
        btnsList.querySelectorAll('button')[index].style.background = 'rgba(34, 27, 249, 0.355)';
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber  + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const calculateWinnerResult = Helpers.calculateWinner(squares);
        const [winner] = calculateWinnerResult ? calculateWinnerResult : [null, null];
        if (winner || squares[i]) 
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
        Game.positions.splice(step);
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const calculateWinnerResult = Helpers.calculateWinner(current.squares);
        const [winner, line] = calculateWinnerResult ? calculateWinnerResult : [null, null];
        Game.positions.push(Helpers.getPosition(history));

        const moves = history.map((step, move) => {
            const description = move 
                ? `Go to step №${move} ${Game.positions[move]}`
                : 'To start';
            const indexColoredBtn = this.state.history.length - 1;
            const color = indexColoredBtn === move ? "rgba(34, 27, 249, 0.355)" : "#ccc";
            return (
                <li key={move}>
                    <button 
                        style={{background: color}}
                        onClick={() => this.jumpTo(move)}
                    >
                        {description}
                    </button>
                </li>
            )
        });

        const status = Helpers.getCurrentStatus(winner, this.state.stepNumber, this.state.xIsNext);

        return (
            <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={i => this.handleClick(i)}
                    onReversingClick={this.reverseOrder}
                    indexColoredBtn={this.state.indexColoredBtn}
                    winnerLine = {line || []}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol className='btns-list'>{this.state.isOrderReversed ? moves.reverse() : moves}</ol>
            </div>
            </div>
        );
    }
}