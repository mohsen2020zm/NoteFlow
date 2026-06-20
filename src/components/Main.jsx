import Header from './Header';
import NoteSection from './NoteSection';
import Notes from './Notes';
import { useSelector } from 'react-redux'

export default function Main() {

    const selector = useSelector(state => state.note)

  return (
    <>
        {
        selector.showNote ? 
        <NoteSection /> :
        <>
            <Header />
            <main>
                {
                selector.notes.length > 0 ? 
                <Notes /> :
                <p className='text-center text-[2.3rem] text-(--text-color) my-24 max-md:text-[1.9rem] max-md:my-16 max-sm:text-[1.6rem] max-sm:my-14 max-sm2:text-[1.3rem] max-sm2:my-12'>{selector.message}</p>
                }
            </main>
        </>
        }
    </>
  )
}
