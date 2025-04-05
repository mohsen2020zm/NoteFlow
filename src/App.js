import './App.css';
import Main from './Components/Main/Main';
import { Provider} from 'react-redux'
import { Store } from './Store'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    localStorage.getItem('nfnotes') || localStorage.setItem('nfnotes', JSON.stringify([]))
  },[])

  return (
    <>
    <Provider store={Store}>
      <Main />
    </Provider>
    </>
  );
}

export default App;