import './Main.css'
import Header from '../Header/Header';
import NoteSection from '../NoteSection/NoteSection';
import Notes from '../Notes/Notes';
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
                {selector.notes.length > 0 ? 
                <Notes /> :
                <p className='main-massage'>{selector.massage}</p>
                }
            </main>
        </>
        }
    </>
    )
}