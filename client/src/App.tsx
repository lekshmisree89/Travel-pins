import React from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>My MERN App</h1>
      <AddUserForm />
      <UserList />
    </div>
  );
};

export default App;
