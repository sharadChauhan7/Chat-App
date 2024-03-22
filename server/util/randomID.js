export const randomId = ()=>{
    // Generate a Randome alphanumeric ID
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}