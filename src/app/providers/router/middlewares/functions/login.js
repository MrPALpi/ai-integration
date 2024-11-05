export default (next, isAuth) => {
  console.log(isAuth)
  if (isAuth) {
    return next();
  }

  next('/login')
}