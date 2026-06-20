import { configureStore, createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        showNote: false,
        notes: JSON.parse(localStorage.getItem('nfnotes')) || [],
        currentNote: {},
        message: 'Add a note',
        selectedNotes: []
    },
    reducers: {
        setShowNote: (state, action) => {
            state.showNote = action.payload.show
        },
        setNewNotes: (state, action) => {
            state.notes.push(action.payload.newNote)

            let localNotes = JSON.parse(localStorage.getItem('nfnotes'))
            localNotes.push(action.payload.newNote)
            localStorage.setItem('nfnotes', JSON.stringify(localNotes))
        },
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload.currNote
        },
        editNote: (state, action) => {
            let noteIndex = state.notes.findIndex(notes => notes.id == state.currentNote.id)
            state.notes[noteIndex].text = action.payload.newText

            let localNotes = JSON.parse(localStorage.getItem('nfnotes'))
            localNotes[noteIndex].text = action.payload.newText
            localStorage.setItem('nfnotes', JSON.stringify(localNotes))
        },
        deleteNote:(state, action) => {
            state.notes = action.payload.filteredNotes
            localStorage.setItem('nfnotes', JSON.stringify(action.payload.filteredNotes))
        },
        searchNote: (state, action) => {
            state.notes = action.payload.searchedNotes
        },
        setMessage: (state, action) => {
            state.message = action.payload.newMessage
        },
        setSelect: (state, action) => {
            state.selectedNotes.push(action.payload.newSelect)
        },
        setUnselect: (state, action) => {
            state.selectedNotes = action.payload.newUnselect
        },
        deleteSelectedNotes: (state, action) => {
            state.notes = action.payload.filteredSelectedNotes

            localStorage.setItem('nfnotes', JSON.stringify(action.payload.filteredSelectedNotes))
        }
    }
})

export const Store = configureStore({reducer: {note: noteSlice.reducer}}) 

export const {setShowNote, setNewNotes, setCurrentNote, editNote, deleteNote, searchNote, setMessage, setSelect, setUnselect, deleteSelectedNotes} = noteSlice.actions