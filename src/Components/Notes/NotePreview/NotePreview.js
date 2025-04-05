import './NotePreview.css'
import { setCurrentNote, setShowNote } from '../../../Store'
import { useDispatch } from 'react-redux'

export default function NotePreview({id: currId, text: currText, date: currDate}) {
  
  const dispatch = useDispatch()

  const editHandler = () => {
    dispatch(setCurrentNote({currNote: {
      id: currId,
      date: currDate,
      text: currText
    }}))
    dispatch(setShowNote({show: true}))
  }

  return (
    <div className='note-pre-main-div' onClick={() => editHandler()}>
        <div className="note-pre-shadow-div"></div>
        <p className='note-pre-value'>{currText}</p>
        <p className="note-pre-date">{currDate}</p>
    </div>
  )
}
