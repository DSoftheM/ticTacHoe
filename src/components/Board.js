import React from "react";
import Square from "./Square";
import BoardRow from './BoardRow';
import ToggleOrder from "./ToggleOrder";

export default class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            isColored={this.props.winnerLine.includes(i)}
        />
      );
    }
  
    render() {
        return (
            <>
                <BoardRow>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </BoardRow>
                <BoardRow>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </BoardRow>
                <BoardRow>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </BoardRow>
                <ToggleOrder
                    onReversingClick={() => this.props.onReversingClick}
                />
            </>
        );
    }
}