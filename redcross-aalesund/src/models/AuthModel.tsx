import React from 'react';
import {User} from "./UserModel";



export interface AuthContextType {
    signIn: (user: User) => Promise<string>;
    signOut: () => void;
    checkAuth: () => void;
    isValidToken: boolean;
}