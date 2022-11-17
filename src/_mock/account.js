// ----------------------------------------------------------------------
const user = JSON.parse(localStorage.getItem("user"))

const account = {
  displayName: user.firstname,
  // displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
