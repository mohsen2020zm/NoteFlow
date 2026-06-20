import NotePreview from './NotePreview'
import { useSelector } from 'react-redux'

export default function Notes() {
  
  const selector = useSelector(state => state.note)

  return (
    <div className='container'>
        <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
            {selector.notes.map(note => <NotePreview key={note.id} {...note} />)}
        </div>
    </div>
  )
}
