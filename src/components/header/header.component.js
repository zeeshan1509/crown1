import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.compnent';
import { createStructuredSelector } from 'reselect';
import './header.styles.scss';
import { selectCurrentHidden } from '../../redux/cart/cart.selectors';
import {  selectCurrentUser } from '../../redux/user/user.selectors';

import { connect } from 'react-redux';

const Header = ({currentUser, hidden}) =>(
    <div className='header'>
    <Link className='logo-container' to='/'>
         <Logo className='logo'/>
    </Link>
    <div className='options'>
         <Link className='option' to='/shop'>
             SHOP
         </Link>
         <Link className='option' to='/'>
             CONTACT
         </Link> 
         {
             currentUser ?
             <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
             :
             (<Link className='option'to='/signin'>
                 SIGN IN
             </Link>)
         }
         <CartIcon />
                       
    </div>{
        hidden ? null : <CartDropdown />}
</div>
)
  const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCurrentHidden
  }) 
 
export default connect(mapStateToProps)(Header);

// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCurrentHidden(state)
//   }) 