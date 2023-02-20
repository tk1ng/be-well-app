export function calculateRemainingTime(exp) {
    const currentTime = new Date().getTime()
    const expTime = exp
    const remainingTime = expTime - currentTime
    return remainingTime
}

export function getLocalData() {
    const storedToken = localStorage.getItem('token');
    const storedExp = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExp);

    if (remainingTime <= 1000 * 60 * 30) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null
    }


    return {
        token: storedToken,
        duration: remainingTime,
    }
}