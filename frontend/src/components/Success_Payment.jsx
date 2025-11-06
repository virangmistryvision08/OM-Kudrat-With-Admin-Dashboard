import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const Success_Payment = () => {
    return (

        <div className="min-h-[100vh] min-w-full flex justify-center items-center">
            <div class="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
                {/* <!-- Top Banner --> */}
                <div class="bg-green-600 p-6 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* <!-- Content --> */}
                <div class="p-6 text-center">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                    <p class="text-gray-600 mb-6">
                        Your payment has been processed successfully. Thank you for your order!
                    </p>

                    {/* <!-- Buttons --> */}
                    <div class="flex flex-col gap-3">
                        <Link to="/products" class="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                            {/* <!-- Shopping Bag Icon --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14l-1 12H6L5 8z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 8a4 4 0 10-8 0" />
                            </svg>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success_Payment;
