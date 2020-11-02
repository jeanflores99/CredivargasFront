

export const TOKEN = () => {
    return typeof localStorage == 'object' ? localStorage.getItem('authToken') : null;
}

export const AUTHORIZE = (ctx) => {
    console.log(ctx);
}