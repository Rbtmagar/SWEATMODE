import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { FaCcPaypal, FaCcVisa } from 'react-icons/fa'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');

  const[formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    postcode:'',
    country:'',
    phone:'',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event. target.value

    setFormData(data => ({...data,[name]:value}))
  }
  const { navigate } = useContext(ShopContext)!;
  return (
    <form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY '} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value= {formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email Address'/>
        <input required onChange={onChangeHandler} name='street' value={formData.street}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={formData.state}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='postcode' value={formData.postcode}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text, number' placeholder='Postcode'/>
          <input required onChange={onChangeHandler} name='country' value={formData.country}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone'/>
      </div>   
      {/* Right Side  */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT '} text2={'METHOD'}/>
          {/* Payment Method Selection */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            {/* VISA */}
            <div
              onClick={() => setMethod('visa')}
              className={`flex items-center gap-4 border p-3 rounded-md cursor-pointer transition ${
                method === 'visa' ? 'border-black shadow-md' : 'border-gray-300 hover:shadow-sm'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border ${
                method === 'visa' ? 'bg-green-500 border-green-500' : 'border-gray-400'
              }`}></span>
              <FaCcVisa className="text-blue-600 text-3xl" />
              <p className="text-gray-700 font-medium">Visa</p>
            </div>

            {/* PayPal */}
            <div
              onClick={() => setMethod('paypal')}
              className={`flex items-center gap-4 border p-3 rounded-md cursor-pointer transition ${
                method === 'paypal' ? 'border-black shadow-md' : 'border-gray-300 hover:shadow-sm'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border ${
                method === 'paypal' ? 'bg-green-500 border-green-500' : 'border-gray-400'
              }`}></span>
              <FaCcPaypal className="text-blue-500 text-3xl" />
              <p className="text-gray-700 font-medium">PayPal</p>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-4 border p-3 rounded-md cursor-pointer transition ${
                method === 'cod' ? 'border-black shadow-md' : 'border-gray-300 hover:shadow-sm'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border ${
                method === 'cod' ? 'bg-green-500 border-green-500' : 'border-gray-400'
              }`}></span>
              <p className="text-gray-700 font-medium">Cash on Delivery</p>
            </div>
          </div>
            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
