"use client"
import { useState, forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const AddToCart = ({ toy }) => {

    const [alertData, setAlertData] = useState({
        open: false,
        msg: '',
    })

    const saveToCart = () => {
        try {
            const toyToAdd = { id: toy.id, name: toy.name, price: toy.price, quantity: 1 }
            let cart = localStorage.getItem('cartItems')
            if (!cart || Object.keys(cart) === 0) {
                cart = []
            } else {
                cart = JSON.parse(cart)
            }
            cart.push(toyToAdd)
            localStorage.setItem('cartItems', JSON.stringify(cart))
            setAlertData({ open: true, msg: `Toy ${toy.id} Added to cart` })
        } catch (err) {
            setAlertData({ open: true, msg: err.message })
        }
    }


    return <>
        <div className="flex align-center">
            <button className="add-to-cart-btn" onClick={saveToCart}>Add To Cart</button>
            <p style={{ color: 'green' }}>IN STOCK</p>
        </div>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={alertData.open}
            autoHideDuration={1000} onClose={
                () => setAlertData(prev => ({ ...prev, open: false }))}>
            <Alert onClose={() => setAlertData(prev => ({ ...prev, open: false }))}
                severity="success" sx={{ width: '100%' }}>
                {alertData.msg}
            </Alert>
        </Snackbar>
    </>

}
export default AddToCart