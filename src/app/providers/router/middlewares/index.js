import login from "./functions/login";
import entered from "./functions/entered";

const middlewares = {
  login, entered
}

export const middlewareTypes = {
  LOGIN: 'login',
  ENTERED: 'entered'
}

export const middleware = (to, from, next, isAuth) => {
  const usedMiddleware = to?.meta?.middleware || false;

  if (!usedMiddleware) {
    return next();
  }

  middlewares[usedMiddleware](next, isAuth);
}