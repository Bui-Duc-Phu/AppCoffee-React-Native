export function timeout(time: number, callback: () => void): number {
    const startTime = Date.now(); 
    setTimeout(() => {
        callback();
    }, time);
    return startTime; 
}