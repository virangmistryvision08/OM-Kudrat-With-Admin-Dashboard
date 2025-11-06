import React from 'react'
import { Link } from 'react-router-dom'

const Payment_Failed = () => {
    return (
        <>
            <div className='min-w-full min-h-[100vh] flex justify-center items-center'>
                {/* <!-- Modal / Card --> */}
                <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md text-center animate-fadeIn p-8 sm:p-10">

                    {/* <!-- Error Icon --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-20 w-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    {/* <!-- Title --> */}
                    <h1 class="text-3xl font-semibold text-gray-800 mb-2">Payment Failed!</h1>

                    {/* <!-- Description --> */}
                    <p class="text-gray-600 mb-6">
                        Unfortunately, your payment could not be processed. Please try again or use a different payment method.
                    </p>

                    {/* <!-- Action Buttons --> */}
                    <div class="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/checkout" class="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-all">
                            Retry Payment
                        </Link>

                        <Link to="/" class="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-all">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment_Failed