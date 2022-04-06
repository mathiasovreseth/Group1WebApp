export function isValidUsername(username: string): boolean {
    return  /^[a-z]+$/.test(username);
}

export function isValidEmail(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
export function isValidPassword(password: string): boolean {
    return password.length > 6;
}