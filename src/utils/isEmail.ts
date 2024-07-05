export function isValidEmail(email: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function hideEmail(email: string): string {
    const [visiblePart, hiddenPart] = email.split('@');
    const maskedVisiblePart = visiblePart.slice(0, -1).replace(/./g, '*') + visiblePart.slice(-1);
    return `${maskedVisiblePart}@${hiddenPart}`;
}
