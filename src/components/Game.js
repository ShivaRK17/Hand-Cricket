import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import commentary from './commentary';
import { useNavigate } from 'react-router-dom';

const Game = () => {
    const {
        uscorecard, setUscorecard,
        cscorecard, setCscorecard,
        ucurrPlayer, setUcurrPlayer,
        ccurrPlayer, setCcurrPlayer,
        currUserRuns, setCurrUserRuns,
        currCompRuns, setCurrCompRuns,
        userChoice, setUserChoice,
        computerChoice, setComputerChoice,
        uovers, setuOvers,
        covers, setcOvers,
        uoverruns, setuOverruns,
        coverruns, setcOverruns,
        ucurrPlayers, setucurrPlayers,
        ccurrPlayers, setccurrPlayers,
        turn, setTurn,
        first,resetGame,
        gameOver, setGameOver
    } = useApp();
    
    const [btndisable, setBtndisable] = useState(false);
    const [currBall, setcurrBall] = useState('Safe');
    const [commentaryLine, setCommentaryLine] = useState("");
    const navigate = useNavigate();

    const handleUserChoice = (choice) => {
        const compChoice = Math.floor(Math.random() * 7);
        // const compChoice = 1;
        setUserChoice(choice);
        setComputerChoice(compChoice);
        updateOvers();
        updateBalls();
    };

    const getLastOvers = (array) => {
        const numChunks = Math.ceil(array.length / 6);
        const startIndex = (numChunks - 1) * 6;
        let lastChunk = array.slice(startIndex);
        while (lastChunk.length < 6) {
            lastChunk.push(-1);
        }
        return lastChunk;
    };

    const updateBalls = () => {
        if (turn === 'player') {
            const playerIndex = ucurrPlayers[0];
            setUscorecard(prevState => {
                const updatedScorecard = [...prevState];
                updatedScorecard[playerIndex] = {
                    ...updatedScorecard[playerIndex],
                    balls: updatedScorecard[playerIndex].balls + 1
                };
                return updatedScorecard;
            });
        } else {
            const playerIndex = ccurrPlayers[0];
            setCscorecard(prevState => {
                const updatedScorecard = [...prevState];
                updatedScorecard[playerIndex] = {
                    ...updatedScorecard[playerIndex],
                    balls: updatedScorecard[playerIndex].balls + 1
                };
                return updatedScorecard;
            });
        }
    };

    const updateScorecard = (playerIndex, newScore) => {
        if (turn === 'player') {
            setCurrUserRuns(currUserRuns + newScore);
            setUscorecard(prevState => {
                const updatedScorecard = [...prevState];
                updatedScorecard[playerIndex] = {
                    ...updatedScorecard[playerIndex],
                    scorecard: [...updatedScorecard[playerIndex].scorecard, newScore],
                    score: updatedScorecard[playerIndex].score + newScore,
                };
                return updatedScorecard;
            });
        } else {
            setCurrCompRuns(currCompRuns + newScore);
            setCscorecard(prevState => {
                const updatedScorecard = [...prevState];
                updatedScorecard[playerIndex] = {
                    ...updatedScorecard[playerIndex],
                    scorecard: [...updatedScorecard[playerIndex].scorecard, newScore],
                    score: updatedScorecard[playerIndex].score + newScore,
                };
                return updatedScorecard;
            });
        }
    };

    const updateOvers = () => {
        if (turn === 'player') {
            if (uovers[0] === '' && uovers[1] === '') {
                setuOvers([0, 0]);
            } else {
                if (uovers[1] + 1 === 6) {
                    setuOvers([uovers[0] + 1, 0]);
                } else {
                    setuOvers([uovers[0], uovers[1] + 1]);
                }
            }
        } else {
            if (covers[0] === '' && covers[1] === '') {
                setcOvers([0, 0]);
            } else {
                if (covers[1] + 1 === 6) {
                    setcOvers([covers[0] + 1, 0]);
                } else {
                    setcOvers([covers[0], covers[1] + 1]);
                }
            }
        }
    };

    const handleCommentary = (score) => {
        const randomNo = Math.floor(Math.random() * 10);
        let currComm = commentary[score][randomNo];
        if (turn === 'player') {
            currComm = currComm.replace("Smith", uscorecard[ucurrPlayers[0]].name);
        } else {
            currComm = currComm.replace("Smith", cscorecard[ccurrPlayers[0]].name);
        }
        setCommentaryLine(currComm);
    };

    const handlePlayAgain = ()=>{
        resetGame();
        navigate('/')
    }

    useEffect(() => {
        const checkOut = async () => {
            setBtndisable(true);
            setTimeout(() => {
                setBtndisable(false);
            }, 2000);

            if (userChoice !== '' && computerChoice !== '') {
                let newCurrUserRuns = currUserRuns;
                let newCurrCompRuns = currCompRuns;

                if (parseInt(userChoice) === parseInt(computerChoice)) {
                    setcurrBall('Out');
                    handleCommentary("out");
                    if (turn === 'player') {
                        setuOverruns(prev => [...prev, 'W']);
                        setUcurrPlayer(ucurrPlayer + 1);
                        setucurrPlayers([ucurrPlayers.reduce((i, j) => Math.max(i, j)) + 1, ucurrPlayers[1]]);
                        if (ucurrPlayer === 9) {
                            if (turn !== first) {
                                setGameOver(true);
                            } else {
                                setTurn(turn === 'player' ? 'computer' : 'player');
                            }
                        }
                    } else {
                        setcOverruns(prev => [...prev, 'W']);
                        setCcurrPlayer(ccurrPlayer + 1);
                        setccurrPlayers([ccurrPlayers.reduce((i, j) => Math.max(i, j)) + 1, ccurrPlayers[1]]);
                        if (ccurrPlayer === 9) {
                            if (turn !== first) {
                                setGameOver(true);
                            } else {
                                setTurn(turn === 'player' ? 'computer' : 'player');
                            }
                        }
                    }
                } else {
                    if (turn === 'player') {
                        handleCommentary(userChoice);
                        newCurrUserRuns += parseInt(userChoice);
                        if (userChoice % 2 !== 0) {
                            if (uovers[1] !== 0) {
                                await setucurrPlayers([ucurrPlayers[1], ucurrPlayers[0]]);
                            }
                        } else {
                            if (uovers[1] === 0) {
                                await setucurrPlayers([ucurrPlayers[1], ucurrPlayers[0]]);
                            }
                        }
                        setuOverruns(prev => [...prev, userChoice]);
                        setcurrBall(userChoice);
                        updateScorecard(ucurrPlayers[0], userChoice);
                    } else {
                        handleCommentary(computerChoice);
                        newCurrCompRuns += parseInt(computerChoice);
                        if (computerChoice % 2 !== 0) {
                            if (covers[1] !== 0) {
                                await setccurrPlayers([ccurrPlayers[1], ccurrPlayers[0]]);
                            }
                        } else {
                            if (covers[1] === 0) {
                                await setccurrPlayers([ccurrPlayers[1], ccurrPlayers[0]]);
                            }
                        }
                        setcOverruns(prev => [...prev, computerChoice]);
                        setcurrBall(computerChoice);
                        updateScorecard(ccurrPlayers[0], computerChoice);
                    }
                }

                if (turn === 'player' && first === 'computer' && newCurrUserRuns > currCompRuns) {
                    setGameOver(true);
                }
                if (turn === 'computer' && first === 'player' && newCurrCompRuns > currUserRuns) {
                    setGameOver(true);
                }
            }
        };
        checkOut();
        // eslint-disable-next-line
    }, [userChoice, computerChoice, uovers, covers]);

    return (
        <div className="container mx-auto py-8">
            {!gameOver? <div className="flex flex-col md:flex-row justify-evenly items-center mb-3 bg-blue-600">
                {/* <div className="flex flex-col mt-4 md:mt-0 justify-center items-center w-1/2">
                    <h2 className="text-lg font-semibold mb-2">Computer</h2>
                    {computerChoice!=='' && <img className='md:w-10 md:h-10 w-5 h-5' src={require(`../assets/${computerChoice}.png`)} alt={''} />}
                    <p className="text-lg">Computer Choice: {computerChoice}</p>
                </div> */}
                {/* <div className='bg-gray-800 h-[90%] w-[1px]'></div> */}
                <div className="flex flex-col mr-8 w-1/2 items-center">
                    <h2 className="text-lg font-semibold mb-2">User ({turn === 'player' ? 'Batting' : 'Bowling'})</h2>
                    <div className="mb-2 flex justify-center items-center">
                        {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                            <button disabled={btndisable} key={num} onClick={() => handleUserChoice(num)} className={`shadow cursor-pointer text-white font-bold py-2 px-4 rounded mr-2 ${btndisable ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-8  00'}`}>
                                <img className='md:w-10 md:h-10 w-5 h-5' src={require(`../assets/${num}.png`)} alt={''} />
                                <p>{num}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div> : <div>

            </div>}
            {userChoice !== '' && <div className={`w-full h-20 bg-${currBall === 'Out' ? 'red' : 'blue'}-500 py-5 flex items-center overflow-hidden`}>
                <div className='flex flex-col w-1/2 items-center'>
                    <h2 className='font-bold m-3'>Computer</h2>
                    <div className="flex items-center justify-center m-2 ">
                        {computerChoice !== '' && <img className='md:w-10 md:h-10 w-5 h-5' src={require(`../assets/${computerChoice}.png`)} alt={''} />}
                        <p className="text-white text-lg md:text-3xl font-bold z-10 relative">{currBall === 'Out' ? 'OUT' : computerChoice}</p>
                    </div>
                </div>
                <div className='bg-gray-800 h-[90%] w-[1px]'></div>
                <div className='flex flex-col w-1/2 items-center'>
                    <h2 className='font-bold m-3'>User</h2>
                    <div className=" flex items-center  justify-center m-2">
                        {userChoice !== '' && <img className='md:w-10 md:h-10 w-5 h-5' src={require(`../assets/${userChoice}.png`)} alt={''} />}
                        <p className="text-white text-lg md:text-3xl font-bold z-10 relative">{currBall === 'Out' ? 'OUT' : userChoice}</p>
                    </div>
                </div>
            </div>}
            <div className="container bg-green-900 text-white w-full p-3 flex md:flex-row flex-col md:justify-between">
                <div className='flex items-center my-2 md:my-0  '>
                    <h2 className='text-lg md:text-3xl mx-3'>User {turn === 'player' ? '🏏' : '⚾'}</h2>
                    <h2 className='text-lg md:text-3xl mx-3 bg-blue-400 p-1 px-3 rounded flex items-center justify-center'>{currUserRuns}/{ucurrPlayer}</h2>
                    <div className='flex flex-col md:mx-4'>
                        {/* {<h2 className='text-base'>{uscorecard[ucurrPlayer].name}{'*'}({uscorecard[ucurrPlayer].score})</h2>} */}
                        {ucurrPlayer < 10 ? turn === 'player' && <>
                            <h2 className='text-base'>{uscorecard[ucurrPlayers[0]].name}{'*'}{'  '}{uscorecard[ucurrPlayers[0]].score}({uscorecard[ucurrPlayers[0]].balls})</h2>
                            <hr />
                            <h3 className='text-sm'>{uscorecard[ucurrPlayers[1]].name}{' '}{uscorecard[ucurrPlayers[1]].score}({uscorecard[ucurrPlayers[1]].balls})</h3>
                        </> : <></>}
                        {/* <h3 className='text-sm'>{ucurrPlayer <= 11 && uscorecard[ucurrPlayer + 1].name}</h3> */}
                    </div>
                </div>
                <div className='flex items-center flex-row-reverse'>
                    <h2 className='text-lg md:text-3xl mx-3'>Computer {turn === 'computer' ? '🏏' : '⚾'}</h2>
                    <h2 className='text-lg md:text-3xl mx-3 bg-blue-400 p-1 px-3 rounded flex items-center justify-center'>{currCompRuns}/{ccurrPlayer}</h2>
                    <div className='flex flex-col md:mx-4'>
                        {ccurrPlayer < 10 ? turn === 'computer' && <>
                            <h2 className='text-base'>{cscorecard[ccurrPlayers[0]].name}{'*'}{'  '}{cscorecard[ccurrPlayers[0]].score}({cscorecard[ccurrPlayers[0]].balls})</h2>
                            <hr />
                            <h3 className='text-sm'>{cscorecard[ccurrPlayers[1]].name}{' '}{cscorecard[ccurrPlayers[1]].score}({cscorecard[ccurrPlayers[1]].balls})</h3>
                        </> : <></>}
                    </div>
                </div>
            </div>
            <div className='text-white container bg-green-800 p-2 flex items-center flex-col md:flex-row justify-between'>
                {turn === 'player' ?
                    <h2 className='mx-3 px-3 font-semibold text-lg'>Overs: {uovers[0]}.{uovers[1]}</h2> :
                    <h2 className='mx-3 px-3 font-semibold text-lg'>Overs: {covers[0]}.{covers[1]}</h2>}
                {turn === 'player' && first === 'computer' && gameOver===false && <h5>You need {currCompRuns - currUserRuns + 1} runs to win</h5>}
                {turn === 'computer' && first === 'player' && gameOver===false && <h5>Computer need {currUserRuns - currCompRuns + 1} runs to win</h5>}
                {gameOver && currUserRuns>currCompRuns && <h2 className='uppercase text-xl font-semibold bg-green-500 drop-shadow-xl p-1 rounded'>You Won!!!</h2>}
                {gameOver && currCompRuns>currUserRuns && <h2 className='uppercase text-xl font-semibold bg-red-500 drop-shadow-xl p-1 rounded'>Computer Won!!!</h2>}
                {gameOver && currCompRuns===currUserRuns && <h2 className='uppercase text-xl font-semibold bg-green-500 drop-shadow-xl p-1 rounded'>Tie Match</h2>}
                {turn === 'player' ?
                    <div className='flex items-center'>
                        {getLastOvers(uoverruns).map((e, ind) => {
                            if (e === 'W') {
                                return <div key={ind} className='bg-red-400 rounded m-1 p-1'>{e}</div>;
                            }
                            else if (e === -1) {
                                return <div key={ind} className='bg-blue-400 rounded m-1 p-3'></div>;
                            }
                            else {
                                return <div key={ind} className='bg-blue-400 px-2 rounded m-1 p-1'>{e}</div>;
                            }
                        })}
                    </div> :
                    <div className='flex items-center'>
                        {getLastOvers(coverruns).map((e, ind) => {
                            if (e === 'W') {
                                return <div key={ind} className='bg-red-400 rounded m-1 p-1'>{e}</div>;
                            }
                            else if (e === -1) {
                                return <div key={ind} className='bg-blue-400 rounded m-1 p-3'></div>;
                            }
                            else {
                                return <div key={ind} className='bg-blue-400 px-2 rounded m-1 p-1'>{e}</div>;
                            }
                        })}
                    </div>}
            </div>
            {commentaryLine !== "" && <div className="container my-2 flex text-center font-sedan items-center justify-center bg-blue-300 p-3 text-black">
                <h3 className='font-bold text-lg'>{commentaryLine}</h3>
            </div>}
            {gameOver && <div className="container my-2 flex text-center font-sedan items-center justify-center bg-blue-300 p-3 text-black">
                <button onClick={handlePlayAgain} className='bg-gray-500 p-2 rounded-lg text-white font-bold'>Play Again</button>
            </div>}
        </div>
    );
};

export default Game;
