import { useState } from "react";
import Card from "../card/Card";

import './Grid.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { ToastContainer, toast } from "react-toastify";
//import 'react-toastify/dist/reactToastify.css';
function isWinner(board, symbol){
    if(board[0] == board[1] && board[1]== board[2] && board[2] == symbol) return symbol;
    if(board[3] == board[4] && board[4]== board[5] && board[5] == symbol) return symbol;
    if(board[6] == board[7] && board[7]== board[8] && board[8] == symbol) return symbol;
    
    if(board[0] == board[3] && board[3]== board[6] && board[3] == symbol) return symbol;
    if(board[1] == board[4] && board[4]== board[7] && board[4] == symbol) return symbol;
    if(board[2] == board[5] && board[5]== board[8] && board[5] == symbol) return symbol;

    if(board[0] == board[4] && board[4]== board[8] && board[4] == symbol) return symbol;
    if(board[2] == board[4] && board[4]== board[6] && board[4] == symbol) return symbol;


    return "";
}
function Grid({numberOfCards}){

    const [turn, setTurn] = useState(true);
    const [board , setBoard] = useState(Array(numberOfCards).fill(""));
    const [winner, setWinner] = useState(null);
   
    function play(index){

        if(turn == true){
            board[index] = "O";
        }else{
            board[index] = "X";
        }
         
        const win = isWinner(board, turn ? "O" : "X" );
        if(win){
            setWinner(win);
            toast.success(`Hurry ${win} wins`);
        }
        setBoard([...board]);
        setTurn(!turn);
    }


    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }


     return(
        <>
         {winner && (
            <>
         <h1 className="turn-highlight">Winner is {winner}</h1>
         <button className="restart" onClick={reset}>Restart</button>
         <ToastContainer position="top-center"/>
         </>
         )}

        <h1 className="turn-highlight">Current Turn : {(turn) ? 'O': 'X' }</h1>
        <div className="grid">
        {board.map((value,idx)=>{
            return <Card gameEnd={winner ? true : false} onPlay={play} player={value} key={idx} index={idx}/>
        })}
         </div>
     </>
     )
}

export default Grid;