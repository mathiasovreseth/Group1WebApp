import React from 'react';
import {User, UserAuthResponse, UserRegistrationFormValues} from "./UserModel";



export interface AuthContextType {
    signIn: (user: User) => Promise<string>;
    signUp: (user: UserRegistrationFormValues) => Promise<string>;
    signOut: () => void;
    initializeAuth: () => any;
    user: UserAuthResponse;
    isAuthenticated: boolean;
}