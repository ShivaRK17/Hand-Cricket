import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="flex text-center font-happyMonkey items-center justify-center bg-blue-300 p-3 text-black">
                <h3 className='font-bold text-lg'>Made by <Link className='underline' to={'https://github.com/ShivaRK17'}>ShivaRK17</Link></h3>
            </div>
        </>
    )
}

export default Footer