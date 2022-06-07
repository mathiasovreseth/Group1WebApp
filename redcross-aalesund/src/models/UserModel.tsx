import React from 'react';

export enum UserRole {
    NORMAL,
    ADMIN,
}
// change this
export interface UserAuthResponse {
    id: string,
    email: string,
    role: string,
}
export interface UserRegistrationFormValues {
    name: string,
    email: string,
    password: string;
}
export interface User {
    email: string,
    password: string,
    role?: UserRole
}
export interface getUserApiResponse {
    name: string,
    email: string;
    id: number,
    enabled: boolean;
    reviews: Array<any>;
    userRole: string;
    token: string;
    accountCreated: string
}

