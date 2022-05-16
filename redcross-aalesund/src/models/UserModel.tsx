import React from 'react';

export enum UserRole {
    NORMAL,
    ADMIN,
}
// change this
export interface UserAuthResponse {
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