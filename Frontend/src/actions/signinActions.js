export const signinAction = (user) => {
  return {
    type: 'true',
    user: user,
  }
  
}

export const signinfailAction = () => {
  return {
    type: 'false',
    user: {},
  }
}
