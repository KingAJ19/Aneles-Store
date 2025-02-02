import React from 'react';
import { Container, Typography, Button, Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './style';
import CartItem from './CartItem/CartItem';
const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart. 
        <Link to="/" className={classes.link}>
        Go buy some stuff!
        </Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cartDetails}>
                <Typography variant="h5">
                    Subtotal: <b>{cart.subtotal.formatted_with_symbol}</b>
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
        </div>
        </>
    );

    if(!cart.line_items) return 'Loading....'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4" gutterBottom>Your Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
