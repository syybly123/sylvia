import React from 'react';
import { UserLayout } from '../../layout/userLayout';
import { SignInForm } from './SignInForm'
export const SignIn : React.FC = ()=> {
    return (
        <UserLayout>
            <SignInForm/>
            
        </UserLayout>
    )
}