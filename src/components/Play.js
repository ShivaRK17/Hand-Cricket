import React from 'react'
import { useApp } from '../context/AppContext'
import Game from './Game'
import Scorecard from './Scorecard'
import Toss from './Toss'

const Play = () => {
    const { tossDone } = useApp();
    return (
        <>
            <div className='bg-gray-800 text-white'>
                {tossDone?<>
                    <Game />
                    <Scorecard />
                </>:
                <Toss/>
                }
            </div>
        </>
    )
}

export default Play