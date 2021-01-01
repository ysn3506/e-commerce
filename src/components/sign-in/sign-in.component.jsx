import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'

import './sign-in.styles.scss'


class SignIn extends React.Component{
    constructor(props){
        super(props)

        this.state={
            email:'',
            password:''


        }

    }
    handleSubmit= async event=>{
        event.preventDefault();
        const {email,password}=this.state
        try {
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email:'',password:''})
        } catch (error) {
            console.error(error)
        }
    
    }


    //Bu fonksiyon bizim inputlarda tek bir fonksiyon ile password ya da emaili direk state e almamızı sağlıyor.Y
    //Yani birden fazla onChange eventi için tek fonksiyon yazmış olduk.
    handleChange=event=>{
        const {value, name}=event.target
        this.setState({[name]:value})

    }
    render(){
        return (
            
            <div className='sign-in'>
                 <h2 className='title'>I already have an account  </h2>
                 <span>Sign in with your email and password</span>
                
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        handleChange={this.handleChange}  
                        value={this.state.email} 
                        label='E-Mail'
                        required/>

                    <FormInput 
                        name='password' 
                        type='password' 
                        handleChange={this.handleChange}  
                        value={this.state.password}
                        label='Password'
                        required/>
          
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>

            </div>




        )

        
    }




}



export default SignIn