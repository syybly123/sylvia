import React from 'react';
import { UserLayout } from '../../layout/userLayout';
import { RegisterForm } from './RegisterForm';
export const Register : React.FC = ()=> {
    return (
        <UserLayout>
            
            <RegisterForm />
        </UserLayout>
       
    )
}