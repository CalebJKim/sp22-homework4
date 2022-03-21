import React from "react";
import './styles/Square.css';

function Square({ value, onClick }) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;