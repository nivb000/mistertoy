"use client"
import Link from "next/link"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderConfirm = () => {
    return (
        <div className="columns">
            <div className="column main">
                <input name="form_key" type="hidden" value="PefvQbePmuX6e2ZN" />
                <div id="authenticationPopup" data-bind="scope:'authenticationPopup'">
                    <div className="success-extras">
                        <p>Thanks for your order <CheckCircleOutlineIcon /></p>
                        <p className="success-lrg">
                            Sit back, relax or even better...go for a run! We&apos;ll take care of the rest.
                        </p>
                        <hr className="divider"/>
                    </div>
                </div>
                <div className="checkout-success">
                    <div className="actions-toolbar">
                        <div className="primary">
                            <Link className="action primary continue" href="/">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm