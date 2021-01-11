import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100
    const publishableKey='pk_test_51I8ODFBV4B8JBeSzstxgnZCS6qXBGNxlfYbYOLLfAzRjvnyrKIWOz23tHvogYToY4CCXRWyChi91Mfa09zWsRi1400SElL6mAK'

    const onToken=token=>{
        console.log(token)
        alert('Payment Succesful')
    }

    return(
        <StripeCheckout 
            label='Pay Now'
            name='e-commerce platform Inc.'
            billingAddress
            shippingAddress
            // image='../../assets/y.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )

}

export default StripeCheckoutButton