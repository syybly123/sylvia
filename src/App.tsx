import React, {useEffect} from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import {BrowserRouter, Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import { HomePage, Register, SignIn ,Detail, Search, ShoppingCart, PlaceOrder} from './pages';
import { useSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute =({component, isAuthenticated, ...rest}) => {
  const routeComponent = (props)=> {
    return isAuthenticated ? (React.createElement(component,props) ): 
    (<Redirect to={{pathname:'/signIn'}}/>)
  }
  return <Route render={routeComponent} {...rest}/>
}
function App() {
  const jwt = useSelector(state=> state.user.token);
  const dispatch = useDispatch();
  useEffect(()=> {
    if(jwt) {
      dispatch(getShoppingCart(jwt));
    }
  },[jwt])
  return (
    <div className={styles.App}>
     <HashRouter>
     <Switch>
      <Route path='/' exact component={HomePage}/>
      <Route path='/signin' exact component={SignIn}/>
      <Route path='/register' exact component={Register}/>
      <Route path='/detail/:touristRouteId' exact component={Detail}/>
      <Route path='/search/:keywords?' exact component={Search}/>
      <PrivateRoute 
      isAuthenticated={ jwt!==null}
      path='/shoppingCart' component={ShoppingCart}/>
      <PrivateRoute 
      isAuthenticated={ jwt!==null}
      path='/placeOrder' component={PlaceOrder}/>
      <Route render={()=><h1>404 not found</h1>}></Route>
     
      </Switch>
     </HashRouter>
    </div>

  );
}

export default App;
