import './Header.css'
import { IoSearchSharp } from "react-icons/io5";
import { MdNightlight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNote, searchNote, setMassage } from '../../Store'

export default function Header() {

  const [search, setSearch] = useState('')
  const [mode, setMode] = useState(true)

  const dispatch = useDispatch()
  const selector = useSelector(state => state.note)

  useEffect(() => {
    if(localStorage.getItem('nfmode') == 'light'){
      lightHandler()
      setMode(true)
    }else{
      setMode(false)
      darkHandler()
    }
  },[])

  const darkHandler = () => {
    document.documentElement.style.setProperty('--bg-color', '#232931')
    document.documentElement.style.setProperty('--elems-color', '#393e46')
    document.documentElement.style.setProperty('--text-color', '#eeeeee')
  }
  const lightHandler = () => {
    document.documentElement.style.setProperty('--bg-color', '#dbe0eb')
    document.documentElement.style.setProperty('--elems-color', '#f4f8ff')
    document.documentElement.style.setProperty('--text-color', '#303438')
  }

  const changeMode = () => {
    if(mode){
      darkHandler()
      localStorage.setItem('nfmode', 'dark')
      setMode(false)
    }else{
      lightHandler()
      localStorage.setItem('nfmode', 'light')
      setMode(true)
    }
  }

  const searchHandler = () => {
    let locNotes = JSON.parse(localStorage.getItem('nfnotes'))
    let filterNotes = locNotes.filter(note => note.text.toLowerCase().includes(search.toLowerCase()))
    dispatch(searchNote({searchedNotes: filterNotes}))
    dispatch(setMassage({newMassage: search.length > 0 ? 'Not Found' : 'Add a note'}))
  }

  return (
    <header>
      <div className='container'>
        <div className='header-main-div'>
          <div className="d-l-div" onClick={() => changeMode()}>
            {mode ? <MdNightlight /> : <MdLightMode />}
          </div>
          <div className='header-r-div'>
            <div className="header-search-input-div">
              <div className="header-search-input-icon-div">
                <IoSearchSharp />
              </div>
              <input
              type="text" 
              placeholder="Search..." 
              className='header-search-input'
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyUp={() => searchHandler()}/>
            </div>
            <button className='header-add-btn' onClick={() => dispatch(setShowNote({show: true}))}>Add</button>
          </div>
        </div>
      </div>
    </header>
  )
}
