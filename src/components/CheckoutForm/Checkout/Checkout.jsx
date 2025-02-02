import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CssBaseline, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
const steps = ['Shipping address', 'Payment details'];


const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                console.log(token);

                setCheckoutToken(token);
            } catch (error) {
                // alert(error.message)
            }
        }

        generateToken();
    }, [cart]);


    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }


    let Confirmation = () => order.customer ? (
        <>
            <div> 
                <Typography variant="h5">Thank you for your purchase.</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: <b>204286</b></Typography>
                <br />
                <Button variant component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
            </div>
        </>
    ) : isFinished ? (
    <div>
        <Typography variant="h5">Thank you for your purchase.</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: <b>204286</b></Typography>
        <br />
        <Button variant component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
    </div>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ); 

    if(error) {
        <>
        <Typography variant="h5"> Error: {error}</Typography>
        <br />
        <Button variant component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    }

    const Form = () => activeStep == 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> 
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>

    return (
        <>
        <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep == steps.length ? <Confirmation /> :checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
