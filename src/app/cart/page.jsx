"use client"
import { httpService } from "@/services/http.service"
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/cmps/checkout-form"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import { modalStyle } from "./modalStyles"


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const ShoppingCart = () => {

    const [cartItems, setCartItems] = useState([])
    const [clientSecret, setClientSecret] = useState("")
    const [orderAmount, setOrderAmount] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getCartItems()
    }, [])
    
    useEffect(() => {
        getPaymentData()
    }, [cartItems])

    const getCartItems = () => {
        let cart = localStorage.getItem('cartItems')
        cart = JSON.parse(cart)
        setCartItems(cart)
    }


    const getPaymentData = async () => {
        if(cartItems && cartItems.length !== 0){
            const { clientSecret, orderAmount } = await httpService.post('pay', cartItems)
            setClientSecret(clientSecret)
            setOrderAmount(orderAmount)
        }
    }

    const appearance = { theme: 'stripe' }
    const options = { clientSecret, appearance }


    // const handleQuantity = (id: string, action: string) => {
    const handleQuantity = (id, action) => {
        setCartItems(prevCart => prevCart.map(item => {
            if (item.id === id) {
                switch (action) {
                    case 'plus':
                        return { ...item, quantity: item.quantity + 1 }
                    case 'minus':
                        return { ...item, quantity: item.quantity - 1 }
                    default:
                        break;
                }
            }
            return item
        }))
    }


    return <section className='main-content flex cart'>
        <section className='left-cart'>
            {cartItems ?
                <ul>
                    {cartItems.map(item => <li key={item.id} className="flex space-between align-center card-item">
                        <img src={`https://robohash.org/${item.name}?set=set4`} alt={item.name} style={{ width: 150, height: 150 }} />
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">{item.price * item.quantity}$</p>
                        <div className="flex space-between">
                            <button className="minus-btn" onClick={() => handleQuantity(item.id, 'minus')}></button>
                            <span>{item.quantity}</span>
                            <button className="plus-btn" onClick={() => handleQuantity(item.id, 'plus')}></button>
                        </div>
                    </li>)}
                </ul>
                :
                <p>Your Cart is empty</p>
            }
        </section>
        <section className='flex justify-center right-cart'>
            <div className='flex col space-around align-center total-cart'>
                <div className="flex space-between">
                    <p>Items Price:</p>
                    <span>{orderAmount}$</span>
                </div>
                <div className="flex space-between">
                    <p>Shipping Price:</p>
                    <span>0$</span>
                </div>
                <hr />
                <div className="flex space-between total-price">
                    <p>Total Price: </p>
                    <span>{orderAmount}$</span>
                </div>
                <button className="btn-checkout" onClick={() => setShowModal(true)}>
                    Procced To Checkout
                </button>
            </div>
        </section>
        <section>
            {clientSecret && <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box sx={modalStyle}>
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderAmount={orderAmount} />
                    </Elements>
                </Box>
            </Modal>}
        </section>
    </section>

}

export default ShoppingCart