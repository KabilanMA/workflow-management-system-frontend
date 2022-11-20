// ----------------------------------------------------------------------
const user = JSON.parse(localStorage.getItem("user"))
const firstname = user?.firstname ? user.firstname : " "
const id=user?.id?user.id:'';
const Email=user?.email?user.email:'';
const Roles=user?.roles?user.roles:'';
console.log(Roles);
const account = {
  displayName: firstname,
  userId:id,
  // displayName: 'Jaydon Frankie',
  email: Email,
  roles:Roles,
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
