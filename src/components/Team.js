import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
const Team = () => {
    const {uscorecard} = useApp();
      const handleSave = () => {
        // Save players' names
        console.log(uscorecard);
      };
  return (
    // <div className='flex flex-col items-center w-full'>
    //     <h1 className='text-white text-2xl font-bold font-happyMonkey m-4'>PLAYING XI</h1>
    //     <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
    //         {uscorecard.map((e,ind)=>{
    //             return <input key={ind} value={e.name} className='m-2' variant='filled' _placeholder={{ color: 'gray' }} _focus={{bgColor:'white'}} placeholder={`Enter Player ${ind+1}`}/>
    //         })}
    //     </div>
    //     <div>
    //         <Link to={'/'}><button className='m-3' colorScheme='green' variant='solid'>Save</button></Link>
    //     </div>
    // </div>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-8">Playing 11</h1>
      <div className="grid grid-cols-3 gap-4">
        {uscorecard.map(player => (
          <input
            key={player.id}
            type="text"
            value={player.name}
            className="px-4 py-2 bg-gray-600 rounded"
          />
        ))}
      </div>
      <button onClick={handleSave} className="mt-8 px-4 py-2 bg-green-500 hover:bg-green-600 rounded font-bold">
        <Link to={'/'}>Save</Link>
      </button>
    </div>
  )
}

export default Team