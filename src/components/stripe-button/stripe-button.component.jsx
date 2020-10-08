import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HZyIFGQSJVIHVVZ9e7exfRn6sI2rGz7VaKloq8ehxBTynFQ3ufwdo3SZl1GPDad2IZ5FiBVQCNBRj4k6UyAjtuQ00jhXTojUz'
   const  onToken = token =>{
        alert('Payment Successfull')
    }
    return (
        <StripeCheckout
        label = 'Pay Now'
        name = 'CROWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;