import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ELEMENT_OPTIONS = {
    style: {
        base: { fontSize: "16px", color: "#333", fontFamily: "Poppins, sans-serif", "::placeholder": { color: "#999" }, padding: "10px 14px" },
        invalid: { color: "#fa755a" },
    },
};

const countryOptions = [
    { code: "IN", name: "India", currency: "inr" },
    { code: "US", name: "United States", currency: "usd" },
    { code: "GB", name: "United Kingdom", currency: "gbp" },
    { code: "CA", name: "Canada", currency: "cad" },
    { code: "AE", name: "United Arab Emirates", currency: "aed" },
    { code: "EG", name: "Egypt", currency: "egp" },
];

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const token = cookie.get(import.meta.env.VITE_COOKIE_TOKEN_NAME);
    const user = token ? jwtDecode(token) : null;
    const { clearCart } = useCart();

    const { deliveryDetails, cartProducts, totalAmount } = location.state || {};

    const [billingDetails, setBillingDetails] = useState({
        firstName: "", lastName: "", phoneNumber: "", email: "",
        street: "", apartment: "", city: "", postcode: "", country: "US", cardName: "",
    });

    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     if (deliveryDetails) setBillingDetails({ ...deliveryDetails, street: deliveryDetails.houseNumberAndStreetName, city: deliveryDetails.townOrCity, cardName: "" });
    // }, [deliveryDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({ ...billingDetails, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.entries(billingDetails).forEach(([key, value]) => {
            if (!value.trim()) newErrors[key] = `${key} is required`;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async () => {
        if (!validateForm()) return toast.error("Please fill all required fields correctly.");
        if (!stripe || !elements) return;

        try {
            const selectedCurrency = countryOptions.find(c => c.code === billingDetails.country)?.currency || "usd";

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-payment-intent`, {
                amount: totalAmount.toFixed(2),
                currency: selectedCurrency,
                userId: user._id,
                billingDetails,
                cartProducts,
                deliveryDetails,
            });

            const { clientSecret } = data;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: billingDetails.cardName,
                        email: billingDetails.email,
                        phone: billingDetails.phoneNumber,
                        address: { line1: billingDetails.street, line2: billingDetails.apartment, city: billingDetails.city, postal_code: billingDetails.postcode, country: billingDetails.country },
                    },
                },
            });

            if (error) {
                toast.error(`Payment failed: ${error.message}`);
                navigate("/failed-payment");
            }
            else if (paymentIntent.status === "succeeded") {
                toast.success("Payment successful!");
                navigate("/success-payment");

                clearCart();
            }
        } catch (err) {
            toast.error("Something went wrong!", err);
            navigate("/failed-payment");
        }
    };


    return (
        <>
            <section className="w-full mt-24 bg-white font-[Poppins]">
                <div className="w-[90%] lg:w-[80%] mx-auto">
                    <section className="relative bg-white min-h-72 rounded-2xl place-order-bg">
                        <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
                            <h1 className="font-[BelfastGrotesk] text-3xl">Place Order</h1>
                            <p className="text-xs mt-2">Home &gt; Cart &gt; Checkout</p>
                        </div>
                    </section>

                    <div className="flex flex-col lg:flex-row gap-5 my-10 lg:my-20">
                        {/* Left Side - Billing Details */}
                        <div className="w-full lg:w-1/2">
                            <h1 className="font-[BelfastGrotesk] text-2xl">Billing Details</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
                                {[
                                    { label: "First Name *", name: "firstName", type: "text" },
                                    { label: "Last Name *", name: "lastName", type: "text" },
                                    { label: "Phone Number *", name: "phoneNumber", type: "text" },
                                    { label: "Email *", name: "email", type: "email" },
                                    { label: "Street Address *", name: "street", type: "text" },
                                    { label: "", name: "apartment", type: "text", placeholder: "Apartment, suits, etc..." },
                                    { label: "Town / City *", name: "city", type: "text" },
                                    { label: "Postcode *", name: "postcode", type: "text" },
                                ].map((field, index) => (
                                    <div key={index} className={field.name === "apartment" ? "flex items-end" : ""}>
                                        {field.label && <label className="block text-sm">{field.label}</label>}
                                        <div className="w-full">
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder || `Enter ${field.label?.replace("*", "")}`}
                                                value={billingDetails[field.name]}
                                                onChange={handleChange}
                                                className="w-full h-12 ps-4 placeholder:text-sm rounded-xl border-gray-400 border mt-2 outline-[#018D43]"
                                            />
                                            {errors[field.name] && (
                                                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Country Select */}
                                <div>
                                    <label className="block text-sm">Country *</label>
                                    <select
                                        onChange={handleChange}
                                        name="country"
                                        value={billingDetails.country}
                                        className="w-full h-12 ps-4 rounded-xl border-gray-400 border mt-2 outline-[#018D43]"
                                    >
                                        {countryOptions.map((c) => (
                                            <option key={c.code} value={c.code}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Payment */}
                        <div className="w-full lg:w-1/2 lg:ps-5 mt-5 lg:mt-0">
                            <h1 className="font-[BelfastGrotesk] text-2xl">Payment</h1>
                            <p className="flex justify-between items-center mt-5 mb-2">Credit Card Payment</p>
                            <div className="flex flex-col gap-7">
                                <div className="border border-gray-400 rounded-xl h-12 p-2">
                                    <CardNumberElement options={ELEMENT_OPTIONS} />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="border border-gray-400 rounded-xl h-12 p-2">
                                        <CardExpiryElement options={ELEMENT_OPTIONS} />
                                    </div>
                                    <div className="border border-gray-400 rounded-xl h-12 p-2">
                                        <CardCvcElement options={ELEMENT_OPTIONS} />
                                    </div>
                                </div>

                                {/* Cardholder Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="cardName"
                                        placeholder="Name On Card *"
                                        value={billingDetails.cardName}
                                        onChange={handleChange}
                                        className="w-full h-12 ps-4 placeholder:text-sm rounded-xl border-gray-400 border outline-[#018D43]"
                                    />
                                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="flex items-center justify-center bg-[#018D43] hover:bg-[#007e3b] text-white py-4 mt-10 rounded-full w-full"
                            >
                                <h1 className="text-lg inline-block me-2">${totalAmount.toFixed(2)}</h1> Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default function Place_Order() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}
