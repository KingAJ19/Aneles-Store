import React from 'react';
import { Container, Typography, Button, Grid} from '@material-ui/core';


import useStyles from './style';
import CartItem from './CartItem/CartItem';
const Cart = ({ cart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart. Go buy some stuff!</Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <CartItem item={item}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cartDetails}>
                <Typography variant="h5">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
        </div>
        </>
    );

    if(!cart.line_items) return 'Loading....'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4">Your Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
