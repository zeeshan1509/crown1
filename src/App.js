import React from 'react';
import { Switch , Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import CheckOutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';
import {setCurrentUser} from './redux/user/user.action';
import {  selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {

  unSubscribeFromAuth = null;

componentDidMount(){
    const { setCurrentUser } = this.props;

  this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      
      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          
        });
        
      });
      
    }
       setCurrentUser( userAuth )
   });
}

componentWillUnmount(){
  this.unSubscribeFromAuth();
}
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckOutPage}/>
          <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) } />
        </Switch>
      </div>
    );
  }
 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
 
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
}) 

export default connect(mapStateToProps, mapDispatchToProps )(App);
