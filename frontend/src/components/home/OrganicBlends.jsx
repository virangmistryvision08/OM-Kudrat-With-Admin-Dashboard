import React from 'react'
import bestSpecies from "../../../public/organic/bestSpecies.svg";
import bestPulses from "../../../public/organic/bestPulses.svg";

const OrganicBlends = () => {
  return (
    <div className='w-full pb-24'>
      <div className='w-[90%] lg:w-[80%] mx-auto flex items-center justify-between flex-col lg:flex-row gap-5'>
        <div className=''>
            <img className='w-[100vw] h-auto' src={bestSpecies} alt="bestSpecies" />
        </div>
        <div className=''>
            <img className='w-[100vw] h-auto' src={bestPulses} alt="bestPulses" />
        </div>
      </div>
    </div>
  )
}

export default OrganicBlends
