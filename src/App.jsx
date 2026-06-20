import { Provider } from 'react-redux'
import { Store } from './redux/Store'
import { useEffect } from 'react'
import Main from './components/Main'

function App() {

  useEffect(() => {      
    localStorage.getItem('nfnotes') || localStorage.setItem('nfnotes', JSON.stringify([]))
  },[])

  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  )
}

export default App
