import './Notes.css'
import NotePreview from './NotePreview/NotePreview'
import { useSelector } from 'react-redux'

export default function Notes() {
  
  const selector = useSelector(state => state.note)

  return (
    <div className='container'>
        <div className="notes-main-div">
            {selector.notes.map(note => <NotePreview key={note.id} {...note} />)}
        </div>
    </div>
  )
}
