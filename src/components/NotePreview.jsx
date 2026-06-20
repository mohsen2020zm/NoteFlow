import { useEffect, useState } from 'react'
import { setCurrentNote, setShowNote, setSelect, setUnselect } from '../redux/Store'
import { useDispatch, useSelector } from 'react-redux'

export default function NotePreview({id: currId, text: currText, date: currDate}) {

  const [isSelectedNote, setIsSelectedNote] = useState(false)

  const dispatch = useDispatch()
  const selector = useSelector(state => state.note)

  useEffect(() => {
    let isSelected = selector.selectedNotes.some(note => note.id == currId)
    setIsSelectedNote(isSelected)
  },[selector.selectedNotes])

  const editHandler = () => {
    dispatch(setCurrentNote({currNote: {
      id: currId,
      date: currDate,
      text: currText
    }}))
    dispatch(setShowNote({show: true}))
    dispatch(setUnselect({newUnselect: []}))
  }

  const selectHandler = e => {
    if(e.target.checked){
      dispatch(setSelect({newSelect: {
        id: currId,
        date: currDate,
        text: currText
      }}))
    }else{
      let filteredSelectedNotes = selector.selectedNotes.filter(note => note.id != currId)
      dispatch(setUnselect({newUnselect: filteredSelectedNotes}))
    }
  }

  return (
    <div className='w-56 h-42 bg-(--elems-color) rounded-[10px] my-[0.3rem] mx-auto max-lg:w-34 max-lg:my-[0.4rem] max-md:w-32 max-md:h-38 max-sm:w-44 max-sm:h-34 max-sm:my-[0.3rem] max-sm2:w-36'>
        <div className="w-56 h-32 bg-gradient absolute z-20 cursor-pointer max-lg:w-34 max-md:w-32 max-md:h-28 max-sm:w-44 max-sm:h-24 max-sm2:w-34" onClick={() => editHandler()}></div>
        <p className='h-28 overflow-hidden text-[1rem] text-(--text-color) wrap-break-word mx-4 mt-4 mb-2 relative z-10 max-md:h-25 max-md:text-[0.9rem] max-sm:h-21 max-sm2:text-[0.8rem]'>{currText}</p>
        <div className='flex items-center justify-between'>
        <p className="text-[1rem] text-(--text-color) ml-4 max-md:text-[0.9rem] max-sm2:text-[0.8rem]">{currDate}</p>
        <input type="checkbox" className='check-box mr-4' checked={isSelectedNote} onChange={selectHandler} />
        </div>
    </div>
  )
}
