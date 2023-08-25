import { useState,useRef} from 'react';
import classes from './AuthForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';




const AuthForm = () => {

  const navigate =useNavigate();
 
const dispatch =useDispatch();
 
  const emailInputRef = useRef("");
  const passwardInputRef = useRef("");
  const confirmPasswardInputRef = useRef("");

  
  

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandeler = async(event) =>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword  = passwardInputRef.current.value;


    // setIsLoading(true);
     let url;
       if(isLogin){
      url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnS1sBtXU_cb7jWgJTT1Yj6fN0w5oaA8o'



   }
  
 else{
  const enteredConfirmPassword  = confirmPasswardInputRef.current.value;
  if(enteredPassword !== enteredConfirmPassword){
    alert('passward does not match!!')
    setIsLoading(false);
    return;
  }
  url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnS1sBtXU_cb7jWgJTT1Yj6fN0w5oaA8o'
  }
try {
  const res=await axios.post(url,{
    email:enteredEmail,
    password: enteredPassword ,
    returnSecureToken:true,
  })
  console.log(res);
  dispatch(authActions.updateAuth({
    token:res.data.idToken,email:res.data.email,
  }))
  navigate('/expenseStore');

} catch (error) {
  
}
  };
   
     //add validation 
  
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandeler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwardInputRef}
          />
        </div>
        {!isLogin &&<div className={classes.control}>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
           
            required ref={confirmPasswardInputRef}
          />
        </div>}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' :'Create Account'}</button>}
          {isLoading && <p>Sending Request</p>}
          <div>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Dont have an account? SignUp' : 'Login with existing account'}
          </button>
        
         { isLogin && <Link to='/forgetPassword'>ForgetPassword!!!!</Link>}
      
          </div>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;