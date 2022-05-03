import React from 'react';

export enum UserRole {
    NORMAL,
    ADMIN,
}
export interface User {
    email: string,
    password: string,
    role?: UserRole
}