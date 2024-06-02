import React, { useState } from 'react';
import './Toss.css'; // Custom animations in this CSS file
import { useApp } from '../context/AppContext';

const Toss = () => {
    const { setTurn, settossDone, setFirst } = useApp();

    const [side, setSide] = useState(null);
    const [flipping, setFlipping] = useState(false);
    const [userChoice, setUserChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [gameChoice, setGameChoice] = useState(null);
    const [winner, setWinner] = useState(null);

    const flipCoin = (choice) => {
        setUserChoice(choice);
        setFlipping(true);
        setResult(null);
        setGameChoice(null);

        setTimeout(() => {
            const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
            setSide(outcome);
            setFlipping(false);
            const isUserWinner = outcome === choice;
            setWinner(isUserWinner ? 'user' : 'computer');
            setResult(isUserWinner ? 'You win!' : 'You lose!');
            if (!isUserWinner) {
                const gamechoice = Math.random()< 0.5 ? 'bat' : 'bowl';
                setGameChoice(gamechoice);
                setTurn(gamechoice === 'bowl' ? 'player' : 'computer')
                setFirst(gamechoice === 'bowl' ? 'player' : 'computer')
            }
        }, 1000);
    };

    const handleGameChoice = (choice) => {
        setGameChoice(choice);
        setTurn(choice === 'bat' ? 'player' : 'computer')
        setFirst(choice === 'bat' ? 'player' : 'computer')
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <div className="coin-container">
                <div className={`coin ${flipping ? 'flipping' : ''} ${side}`}>
                    <div className="coin-front">Heads</div>
                    <div className="coin-back">Tails</div>
                </div>
            </div>
            <div className="mt-8">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-2"
                    onClick={() => flipCoin('heads')}
                    disabled={flipping || userChoice !== null}
                >
                    Choose Heads
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-2"
                    onClick={() => flipCoin('tails')}
                    disabled={flipping || userChoice !== null}
                >
                    Choose Tails
                </button>
            </div>
            {result && !flipping && (
                <div className="mt-4 text-xl">
                    {result}
                </div>
            )}
            {!flipping && result && winner === 'user' && !gameChoice && (
                <div className="mt-4">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 m-2"
                        onClick={() => handleGameChoice('bat')}
                    >
                        Bat
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 m-2"
                        onClick={() => handleGameChoice('bowl')}
                    >
                        Bowl
                    </button>
                </div>
            )}
            {!flipping && result && winner === 'computer' && (
                <div className="mt-4 text-xl">
                    Computer chooses to {gameChoice}.
                </div>
            )}
            {!flipping && gameChoice && winner === 'user' && (
                <div className="mt-4 text-xl">
                    User chooses to {gameChoice}.
                </div>
            )}
            {!flipping && userChoice && gameChoice && (
                <button
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={() => {
                        setUserChoice(null);
                        setSide(null);
                        setResult(null);
                        setGameChoice(null);
                        setWinner(null);
                        settossDone(true);
                    }}
                >
                    Play
                </button>
            )}
        </div>
    );
};

export default Toss;
