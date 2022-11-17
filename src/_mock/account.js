// ----------------------------------------------------------------------
const user = JSON.parse(localStorage.getItem("user"))
const firstname = user?.firstname ? user.firstname : " "

const account = {
  displayName: firstname,
  // displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
