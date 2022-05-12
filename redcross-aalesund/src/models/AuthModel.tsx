import React from 'react';
import {User} from "./UserModel";



export interface AuthContextType {
    signIn: (user: User) => Promise<string>;
    signOut: () => void;
    getAuthUser: () => void;
    isValidToken: boolean;
}