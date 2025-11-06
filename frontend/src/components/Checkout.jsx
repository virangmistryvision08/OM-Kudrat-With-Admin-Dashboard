import React, { useState } from 'react';
import Cookie from "js-cookie";
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import empty_cart from "../../public/empty-cart-image.webp";
import { useCart } from '../context/CartContext';

const countryOptions = [
    { code: "IN", name: "India" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "EG", name: "Egypt" },
];

const Checkout = () => {
    // const [carts, setCarts] = useState([]);
    const navigate = useNavigate();
    const shippingCharge = 10;
    const location = useLocation();
    const { totalAmount } = location.state || {};
    const {carts} = useCart();

    console.log(totalAmount,'totalAmount 26')

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        houseNumberAndStreetName: '',
        apartment: '',
        townOrCity: '',
        postcode: '',
        country: 'US',
        notes: '',
        shippingMethod: 'Standard Shipping',
        couponCode: '',
    });

    const [errors, setErrors] = useState({});

    // Validate a single field on change
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
                if (!value.trim()) error = 'First Name is required';
                break;
            case 'lastName':
                if (!value.trim()) error = 'Last Name is required';
                break;
            case 'phoneNumber':
                if (!value.trim()) error = 'Phone Number is required';
                break;
            case 'email':
                if (!value.trim()) error = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid';
                break;
            case 'houseNumberAndStreetName':
                if (!value.trim()) error = 'Street Address is required';
                break;
            case 'apartment':
                if (!value.trim()) error = 'Apartment is required';
                break;
            case 'townOrCity':
                if (!value.trim()) error = 'City is required';
                break;
            case 'postcode':
                if (!value.trim()) error = 'Postcode is required';
                break;
            case 'country':
                if (!value.trim()) error = 'Country is required';
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        validateField(name, value);
    };

    // Full form validation before submit
    const validateForm = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!form.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
        if (!form.houseNumberAndStreetName.trim()) newErrors.houseNumberAndStreetName = 'Street Address is required';
        if (!form.apartment.trim()) newErrors.apartment = 'Apartment is required';
        if (!form.townOrCity.trim()) newErrors.townOrCity = 'City is required';
        if (!form.postcode.trim()) newErrors.postcode = 'Postcode is required';
        if (!form.country.trim()) newErrors.country = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validateForm()) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        navigate("/place-order", {
            state: {
                deliveryDetails: form,
                cartProducts: carts[0]?.products,
                totalAmount: totalAmount ? totalAmount : carts[0]?.totalCartValue + shippingCharge
            }
        });
    };

    return (
        <>
            <section className="w-full mt-24 bg-white font-[Poppins]">
                <div className="w-[90%] lg:w-[80%] mx-auto">
                    {/* Banner Section */}
                    <section className="relative bg-white min-h-72 rounded-2xl checkout-bg">
                        <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
                            <h1 className="font-[BelfastGrotesk] text-3xl">Checkout</h1>
                            <p className="text-xs mt-2">Home &gt; Cart &gt; Checkout</p>
                        </div>
                    </section>

                    <div className='flex flex-col lg:flex-row gap-5 my-10 lg:my-20'>
                        {/* Left Side */}
                        <div className='w-full lg:w-1/2'>
                            <h1 className='font-[BelfastGrotesk] text-2xl'>Delivery</h1>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                                {[ 
                                    { label: "First Name *", name: "firstName", type: "text" },
                                    { label: "Last Name *", name: "lastName", type: "text" },
                                    { label: "Phone Number *", name: "phoneNumber", type: "number" },
                                    { label: "Email address *", name: "email", type: "email" },
                                    { label: "Street Address *", name: "houseNumberAndStreetName", type: "text" },
                                    { label: "", name: "apartment", type: "text", placeholder: "Apartment, suits, etc..." },
                                    { label: "Town / City *", name: "townOrCity", type: "text" },
                                    { label: "Postcode *", name: "postcode", type: "number" },
                                ].map((field, index) => (
                                    <div key={index} className={field.name === 'apartment' ? 'flex items-end' : ''}>
                                        {field.label && <label className='block text-sm'>{field.label}</label>}
                                        <div className='w-full'>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder || `Enter ${field.label?.replace('*', '')}`}
                                                value={form[field.name]}
                                                onChange={handleChange}
                                                className="w-full h-12 ps-4 placeholder:text-sm rounded-xl border-gray-400 border mt-2 outline-[#018D43]"
                                            />
                                            {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                                        </div>
                                    </div>
                                ))}

                                {/* Country select dropdown */}
                                <div>
                                    <label className="block text-sm">Country *</label>
                                    <select
                                        name="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        className="w-full h-12 ps-4 rounded-xl border-gray-400 border mt-2 outline-[#018D43]"
                                    >
                                        {countryOptions.map(c => (
                                            <option key={c.code} value={c.code}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                                </div>
                            </div>

                            <h1 className='font-[BelfastGrotesk] text-2xl mt-9 mb-7'>Additional Information</h1>
                            <div>
                                <label className='block text-sm'>Other Notes</label>
                                <textarea
                                    className='w-full placeholder:text-sm min-h-[130px] p-4 rounded-xl border-gray-400 border mt-2 outline-[#018D43]'
                                    name='notes'
                                    placeholder='Notes about your order, e.g. special note for delivery.'
                                    value={form.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <h1 className='font-[BelfastGrotesk] text-2xl my-7'>Shipping Method</h1>
                            <div className='relative'>
                                <input
                                    className='w-full placeholder:text-sm h-12 ps-4 rounded-xl border-gray-400 border outline-[#018D43]'
                                    type="text"
                                    name='shippingMethod'
                                    value={form.shippingMethod}
                                    onChange={handleChange}
                                />
                                <p className=' absolute right-5 top-1/4 flex items-center gap-3'>
                                    <span>$10.00</span>
                                    <input className='h-5 w-5' type="checkbox" />
                                </p>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className='w-full lg:w-1/2 lg:border-l-2 lg:border-gray-100 lg:ps-5 mt-5 lg:mt-0'>
                            <h1 className='font-[BelfastGrotesk] text-2xl'>Your Order </h1>
                            <p className='flex justify-between items-center mt-5 mb-2'>
                                <span>Products</span>
                                <span>Sub Total</span>
                            </p>
                            <Divider />

                            <div>
                                {carts.length === 0 || carts[0].products.length === 0 ? (
                                    <>
                                        <img src={empty_cart} alt="empty_cart" />
                                        <h1>Empty Cart!</h1>
                                    </>
                                ) : (
                                    <>
                                        {carts[0].products.map(product => (
                                            <div key={product._id}>
                                                <div className='flex justify-between items-center my-5 py-2'>
                                                    <div className='flex items-center gap-2 md:gap-5'>
                                                        <img className='h-24 w-24 object-contain rounded-xl' src={product.productImage} alt={product.productName} />
                                                        <span className='text-sm md:text-lg font-[BelfastGrotesk]'>{product.productName} x {product.quantity}</span>
                                                    </div>
                                                    <span className='text-sm md:text-lg text-[#018D43]'>${product.subtotal}</span>
                                                </div>
                                                <Divider />
                                            </div>
                                        ))}
                                        <p className='flex justify-between items-center text-sm md:text-lg text-[#404040] font-[400] my-4'>
                                            <span>Sub Total</span>
                                            <span>${carts[0].totalCartValue.toFixed(2)}</span>
                                        </p>
                                        <Divider />
                                        <p className='flex justify-between items-center text-lg md:text-2xl font-[500] my-5'>
                                            <span>Total</span>
                                            <span>${(totalAmount ? totalAmount : carts[0]?.totalCartValue + shippingCharge).toFixed(2)}</span>
                                        </p>
                                        <Divider />

                                        <p className='mt-10 text-sm'>Have a coupon ? <span className='text-gray-500'>enter your code</span></p>
                                        <div className='flex items-center mt-5'>
                                            <input
                                                className='border border-gray-400 rounded-full outline-[#018D43] h-14 ps-4 w-full'
                                                type="text"
                                                name='couponCode'
                                                value={form.couponCode}
                                                onChange={handleChange}
                                                placeholder='Coupon Code'
                                            />
                                            <button className='bg-[#018D43] hover:bg-[#007e3b] text-white px-4 md:px-7 rounded-full h-14'>Apply</button>
                                        </div>

                                        <button
                                            onClick={handlePlaceOrder}
                                            className='bg-[#018D43] hover:bg-[#007e3b] text-white py-4 mt-14 rounded-full w-full'
                                        >
                                            Place Order
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Checkout;
