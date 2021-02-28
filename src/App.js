import React, { useState } from 'react'
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
} from 'reactstrap'
import './App.css'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const Note = ({ id, note, createdAt = 'today', deleteNote }) => (
  <div className="note-container" key={id}>
    {/* Header */}
    <div className="note-container-header">
      <p className="note-container-header-text">{createdAt}</p>

      <Button
        size="sm"
        className="note-container-header-button"
        color="danger"
        onClick={(e) => deleteNote(e, createdAt)}
      >
        Delete
      </Button>
    </div>
    <div className="note-container-note-text">
      <ReactMarkdown plugin={[gfm]} children={note} />
    </div>
  </div>
)

function App() {
  const [state, setState] = useState({
    notes: [
      {
        id: 0,
        note: '# Hello World',
        createdAt: `Created At: ${new Date().toLocaleString('en-US')}`,
      },
    ],
    newNote: '',
  })
  const [modal, setModal] = useState(false)
  const deleteNote = (e, createdAt) => {
    const newNotesArray = state.notes.filter(
      (note) => note.createdAt !== createdAt
    )
    setState((ps) => ({ ...ps, notes: newNotesArray }))
  }
  const toggle = () => setModal(!modal)
  const Notes = state.notes.map((note) => (
    <Note
      key={note.id}
      note={note.note}
      createdAt={note.createdAt}
      deleteNote={deleteNote}
    />
  ))

  const idGenerator = () => {
    const newId = state.notes.length
    return newId
  }

  const saveNote = (e) => {
    e.preventDefault()
    const newNote = {
      id: idGenerator(),
      note: state.newNote,
      createdAt: `Created At: ${new Date().toLocaleString('en-US')}`,
    }

    setState((ps) => ({ ...ps, notes: [...ps.notes, newNote] }))
  }

  const updateNewNote = (e) => {
    setState((prevState) => ({ ...prevState, newNote: e.target.value }))
  }

  return (
    <>
      <Container className="themed-container" fluid="md">
        <div className="main-container">
          <div className="header">
            <h1 className="header-text">React Markdown Notes Taker</h1>
            <Button
              color="primary"
              size="sm"
              className="add-note-button"
              onClick={toggle}
            >
              Add Note
            </Button>
          </div>
          <div className="notes-container">{Notes}</div>
        </div>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>New Note</ModalHeader>
          <ModalBody>
            <Form id="modalForm" onSubmit={saveNote}>
              <Input onChange={updateNewNote} type="textarea" rows="20"></Input>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              form="modalForm"
              onClick={(e) => {
                toggle()
                saveNote(e)
              }}
            >
              Save Note
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default App
