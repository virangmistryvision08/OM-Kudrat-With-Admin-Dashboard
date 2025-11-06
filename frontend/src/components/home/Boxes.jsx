import React from 'react'
import box from "../../../public/boxes/box.svg"
import shipping from "../../../public/boxes/shipping.svg"
import message_3 from "../../../public/boxes/messages-3.svg"
import card from "../../../public/boxes/card.svg"

const Boxes = () => {

  const boxes = [
    {
      img: box,
      name: "Free Shipping",
      description: "Free Shipping for order over $130."
    },
    {
      img: shipping,
      name: "Returns",
      description: "Within 30 days for an exchanges."
    },
    {
      img: message_3,
      name: "Online Support",
      description: "24 Hours a day, 7 Days a week"
    },
    {
      img: card,
      name: "Flexible Payment",
      description: "Pay with Multiple Credit cards"
    },
  ]

  return (
    <div className='w-full pb-20'>
      <div className='w-[90%] lg:w-[80%] font-[Poppins] mx-auto grid justify-between gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
          boxes.map((box) => {
            return (
              <div className='text-center p-3 bg-gray-100 rounded-2xl h-[200px] flex flex-col justify-center items-center'>
                <img className='mx-auto mb-3' src={box.img} alt={box.name} />
                <p className='font-semibold font-[BelfastGrotesk]'>{box.name}</p>
                <span className='text-sm mt-1 text-gray-600'>{box.description}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Boxes
