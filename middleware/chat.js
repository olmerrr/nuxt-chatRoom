export default function({store, redirect}) {
  if (Object.keys(store.state.user).length === 0){
    redirect('/?message=noUser')
  }
};