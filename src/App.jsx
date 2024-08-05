import { useEffect, useState } from 'react';
import AppRouter from './Confing/Router';
import { onAuthStateChanged, auth } from './Confing/Firebase';
import Header from "./Views/Header";
import { store, persistor } from "../Store/Store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user logged in', user);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <header className="App-header">
            <Header />
            <h3 className='text-center text-black'>Welcome {user?.email}</h3>
            <AppRouter />
          </header>
        </div>
      </PersistGate>
    </Provider>
  );
}



export default App;
