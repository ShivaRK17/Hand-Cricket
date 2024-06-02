import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-800 font-happyMonkey">
                <div className="flex flex-col justify-center items-center w-1/2">
                    <h1 className="text-5xl font-bold text-center text-white mb-8">Hand Cricket</h1>
                    <div className="grid grid-rows-3 gap-4">
                        <Link className="bg-blue-500 text-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow" to={'play'}>Play</Link>
                        <Link to={'team'} className="bg-green-500 text-center hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow">
                            Team Selection
                        </Link>
                        <Link to={'play'} className="bg-yellow-500 text-center hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow">
                            Multiplayer
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home