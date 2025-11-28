import './NoteSection.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { setShowNote, setNewNotes, setCurrentNote, editNote, deleteNote } from '../../Store'
import { useState } from 'react';

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
      <div className='note-section-header'>
        <div className="note-section-back-btn" onClick={() => backHandler()}>
          <IoMdArrowRoundBack />
        </div>
        <div className="note-section-head-right-div">
          <button className="note-section-del-btn" onClick={() => deleteHandler()}>Delete</button>
          <button className="note-section-save-btn" onClick={() => saveHandler()}>Save{isSave || '*'}</button>
        </div>
      </div>
      <textarea className='note-section-text' autoFocus value={note} onChange={e => setNoteHandler(e)}></textarea>
    </div>
  )
}
