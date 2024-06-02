import React, { useState } from 'react'
import { useApp } from '../context/AppContext';
// todo stars of curr players in scorecard
const Scorecard = () => {
    const { uscorecard, cscorecard, gameOver,ucurrPlayers,ccurrPlayers,turn } = useApp()
    const [scoretogg, setScoretogg] = useState(turn==='player'?1:0);
  return (
    <div className='flex flex-col p-3 w-full font-happyMonkey text-black'>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
                        <h2 className="text-xl font-bold ">SCORECARD</h2>
                        <div className='flex items-center my-1'>
                            <h2>COMPUTER</h2>
                            <label className="inline-flex mx-2 items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" checked={scoretogg} onChange={() => setScoretogg(!scoretogg)} />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                            </label>
                            {/* <Switch className='mx-2' onChange={() => setScoretogg(!scoretogg)} isChecked={scoretogg} /> */}
                            <h2>USER</h2>
                        </div>
                        <table className="w-full border-collapse table-fixed">
                            <thead>
                                <tr>
                                    <th className="p-2 border border-gray-300 w-1/4 md:w-1/5">Player</th>
                                    <th className="p-2 border border-gray-300">Runs</th>
                                    {gameOver && <th className="p-2 border border-gray-300 w-1/5">Strike Rate</th>}
                                </tr>
                            </thead>
                            {scoretogg ?
                                <tbody>
                                    {uscorecard.map((e, ind) => {
                                        return <tr key={ind} className=''>
                                            <td className="p-1 border border-gray-300"><h6>{e.name}{ind === ucurrPlayers[0] ? '*' : ""}{' '}{e.score}({e.balls})</h6></td>
                                            <td className="p-2 border border-gray-300"><div className='flex flex-wrap'>{(Math.max(...ucurrPlayers) > ind ) && ind!==ucurrPlayers[0] && ind!==ucurrPlayers[1] && e.score === 0 && 'DUCK'}{e.scorecard.map((sc,inde) => {
                                                return <div key={inde} className='rounded-full bg-blue-600 px-1 text-white mx-1'><h6>{sc}</h6></div>
                                            })}</div></td>
                                            {gameOver && <td className="p-1 border border-gray-300"><h6>{Number.parseInt(100*(e.score/e.balls)) || '--' }</h6></td>}
                                            
                                        </tr>
                                    })}
                                </tbody> :
                                <tbody>
                                    {cscorecard.map((e,ind) => {
                                        return <tr key={ind}>
                                            <td className="p-1 border border-gray-300">{e.name}{ind === ccurrPlayers[0] ? '*' : ""}{' '}{e.score}({e.balls})</td>
                                            <td className="p-2 border border-gray-300"><div className='flex flex-wrap'>{(Math.max(...ccurrPlayers) > ind ) && ind!==ccurrPlayers[0] && ind!==ccurrPlayers[1] && e.score === 0 && 'DUCK'}{e.scorecard.map((sc,inde) => {
                                                return <div key={inde} className='rounded-full bg-blue-600 px-1 text-white mx-1'>{sc}</div>
                                            })}</div></td>
                                        </tr>
                                    })}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
  )
}

export default Scorecard