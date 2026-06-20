import { IoSearchSharp } from "react-icons/io5";
import { MdNightlight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNote, searchNote, setMessage, setUnselect, deleteSelectedNotes } from '../redux/Store'

export default function Header() {
  
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('light')
  const [isAllSelectedNote, setIsAllSelectedNote] = useState(false)
  const [toggleSearchBar, setToggleSearchBar] = useState(false)

  const searchInputRef = useRef(null)

  const dispatch = useDispatch()
  const selector = useSelector(state => state.note)

  const locNotes = JSON.parse(localStorage.getItem('nfnotes')) || []

  const themes = {
    dark: {
      "--bg-color": "#232931",
      "--elems-color": "#393e46",
      "--text-color": "#eeeeee"
    },
    light: {
      "--bg-color": "#dbe0eb",
      "--elems-color": "#f4f8ff",
      "--text-color": "#303438"
    }
  }

  window.addEventListener('resize', () => window.innerWidth >= 768 && setToggleSearchBar(false))

  useEffect(() => {
    if(localStorage.getItem('nfmode') == 'light'){
      setMode('light')
      applyTheme('light')
    }else{
      setMode('dark')
      applyTheme('dark')
    }
  },[])

   useEffect(() => {
    selector.selectedNotes.length == locNotes.length &&  selector.selectedNotes.length > 0 ? setIsAllSelectedNote(true) : setIsAllSelectedNote(false)
   },[selector.selectedNotes])

   useEffect(() => {
    search || searchHandler()
   },[toggleSearchBar])

  const applyTheme = themeMode => {
    const root = document.documentElement
    Object.entries(themes[themeMode]).forEach(([Key, value]) => root.style.setProperty(Key, value))
  }

  const changeMode = () => {
    if(mode === 'light'){
      applyTheme('dark')
      localStorage.setItem('nfmode', 'dark')
      setMode('dark')
    }else{
      applyTheme('light')
      localStorage.setItem('nfmode', 'light')
      setMode('light')
    }
  }

  const addHandler = () => {
    dispatch(setShowNote({show: true}))
    dispatch(setUnselect({newUnselect: []}))
  }

  const searchHandler = () => {
    let filterNotes = locNotes.filter(note => note.text.toLowerCase().includes(search.toLowerCase()))
    dispatch(searchNote({searchedNotes: filterNotes}))
    dispatch(setMessage({newMessage: search.length > 0 ? 'Not found' : 'Add a note'}))
  }

  const onToggleSearchBar = () => {
    if(window.innerWidth < 768){
      if(toggleSearchBar){
        setSearch('')
        searchInputRef.current.blur()
      }else{
        searchInputRef.current.focus()
      }
      setToggleSearchBar(!toggleSearchBar)
    }
  }

  const selectAllHandler = e => e.target.checked ? dispatch(setUnselect({newUnselect: selector.notes})) : dispatch(setUnselect({newUnselect: []}))

  const deleteSelectedHandler = () => {
    const selectedIds = new Set(selector.selectedNotes.map(note => note.id))
    const filteredNotes = selector.notes.filter(note => !selectedIds.has(note.id))
    dispatch(deleteSelectedNotes({filteredSelectedNotes: filteredNotes}))
    dispatch(setUnselect({newUnselect: []}))
  }

  return (
    <header>
      <div className='container'>
        <div className='flex justify-between items-center my-4 max-sm2:my-3'>
          <div className="w-8 h-8 rounded-[50%] cursor-pointer [&>svg]:text-[2rem] text-[#6990d8] max-md:w-[1.8rem] max-md:h-[1.8rem] max-md:[&>svg]:text-[1.8rem] max-sm2:w-[1.6rem] max-sm2:h-[1.6rem] max-sm2:[&>svg]:text-[1.6rem]" onClick={() => changeMode()}>
            {mode === 'light' ? <MdNightlight /> : <MdLightMode />}
          </div>
          <div className='flex items-center'>
            <div className={`flex items-center ${toggleSearchBar ? 'hidden' : 'block'}`}>
              {
              selector.selectedNotes.length > 0 &&
              <>
              <button className="btn mr-1" onClick={deleteSelectedHandler}>Delete</button>
              <p className="text-[1rem] mr-3 max-md:text-[0.9rem] max-sm2:text-[0.8rem] max-sm2:mr-2">{selector.selectedNotes.length} Selected</p>
              </>
              }
              {
              selector.notes.length > 0 &&
              <div className="flex items-center mr-2 max-sm2:mr-1">
                <p className="text-[1rem] mr-1 max-md:text-[0.9rem] max-sm2:text-[0.8rem]">Select All</p>
                <input type="checkbox" className='check-box' checked={isAllSelectedNote} onChange={selectAllHandler} />
              </div>
              }
            </div>
            <div className={`w-54 h-[1.8rem] flex items-center flex-wrap rounded-[10px] bg-(--elems-color) overflow-hidden max-md:h-[1.6rem] ${toggleSearchBar ? 'max-md:w-48 max-sm:w-40' : 'max-md:w-8 max-sm:w-8'} max-sm2:h-[1.4rem]`}>
              <div className="w-8 h-[1.8rem] flex justify-center items-center cursor-pointer [&>svg]:text-[1.5rem] text-[#6990d8] max-md:h-[1.6rem] max-md:[&>svg]:text-[1.4rem] max-sm2:h-[1.4rem] max-sm2:[&>svg]:text-[1.3rem]" onClick={onToggleSearchBar}>
                {toggleSearchBar ? <IoClose /> : <IoSearchSharp />}
              </div>
              <input
              type="text" 
              placeholder="Search..." 
              className='w-46 h-[1.8rem] border-none bg-(--elems-color) pr-2 text-(--text-color) text-[1rem] placeholder:text-(--text-color) placeholder:text-[1rem] max-md:w-40 max-md:h-[1.6rem] max-md:text-[0.9rem] max-md:placeholder:text-[0.9rem] max-sm:w-32 max-sm2:h-[1.4rem] max-sm2:text-[0.8rem] max-sm2:placeholder:text-[0.8rem]'
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyUp={searchHandler}
              ref={searchInputRef}/>
            </div>
            <button className='btn ml-2 max-sm2:ml-1' onClick={addHandler}>Add</button>
          </div>
        </div>
      </div>
    </header>
  )
}
