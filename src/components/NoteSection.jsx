import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { setShowNote, setNewNotes, setCurrentNote, editNote, deleteNote } from '../redux/Store'
import { useEffect, useState } from 'react';

export default function NoteSection() {
  
  const dispatch = useDispatch()
  const selector = useSelector(state => state.note)
  
  const [note, setNote] = useState(selector.currentNote.text ? selector.currentNote.text : '')
  const [isSave, setIsSave] = useState(true)

  const today = new Date()

  const setNoteHandler = e => {
    setIsSave(false)
    setNote(e.target.value)
  }

  const backHandler = () => {
    dispatch(setShowNote({show: false}))
    dispatch(setCurrentNote({currNote: {}}))
    setNote('')
  }

  const saveHandler = () => {
    if(note.length > 0){
      if(selector.currentNote.text){
        dispatch(editNote({newText: note}))
      }else{
        dispatch(setNewNotes({
          newNote: {
            id: crypto.randomUUID(),
            date: `${today.toLocaleDateString('en-US', {month: 'long'})} ${today.getDate()}`,
            text: note
          }
        }))
      }
      setIsSave(true)
    }
  }
  
  const deleteHandler = () => {
    let filterNotes = selector.notes.filter(note => note.id != selector.currentNote.id)
    dispatch(deleteNote({filteredNotes: filterNotes}))
    backHandler()
  }

  return (
    <div className='container'>
      <div className='flex items-center justify-between my-4 max-sm2:my-3'>
        <div className="w-8 h-8 cursor-pointer [&>svg]:text-[2rem] text-[#6990d8] max-md:w-[1.8rem] max-md:h-[1.8rem] max-md:[&>svg]:text-[1.8rem] max-sm2:w-[1.6rem] max-sm2:h-[1.6rem] max-sm2:[&>svg]:text-[1.6rem]" onClick={backHandler}>
          <IoMdArrowRoundBack />
        </div>
        <div className="flex items-center">
          <button className="btn mr-2" onClick={deleteHandler}>Delete</button>
          <button className="btn" onClick={saveHandler}>Save{isSave || '*'}</button>
        </div>
      </div>
      <textarea className='w-full h-screen bg-transparent border-none text-[1.3rem] leading-8 text-(--text-color) p-0 resize-none overflow-y-hidden max-md:text-[1.1rem] max-md:leading-[1.7rem] max-sm2:text-[0.9rem]' autoFocus value={note} onChange={setNoteHandler}></textarea>
    </div>
  )
}
