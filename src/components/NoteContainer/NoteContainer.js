import React, { useState } from 'react';
import Note from '../Note/Note';
import './NoteContainer.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function NoteContainer(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const reversedArray = [...props.notes].reverse();

  const filteredNotes = reversedArray.filter((note) =>
    note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='note-container'>
      <div className='app-header'>
        <h1>Keep Notes</h1>
        <DarkModeSwitch
          onChange={() => props.handleDarkMode((prevDarkMode) => !prevDarkMode)}
          checked={props.darkMode}
          size={30}
        />
      </div>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search your notes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='note-container-notes custom-scroll'>
        {filteredNotes.length > 0 ? filteredNotes.map((eachNote) => (
          <Note
            key={eachNote.id}
            note={eachNote}
            deleteNote={props.deleteNote}
            updateTopic={props.updateTopic}
            updateText={props.updateText}
          />
        )) : <div className='no-notes-label'><h3>Notes you add appear here</h3></div>}
      </div>
    </div>
  );
}

export default NoteContainer;

// one more in note in Note  {} because we are sending details as objects
// we're reversing the notes array received so that new added note is placed in starting
//const reversedArray = [...props.notes].reverse();
//props.notes.map((eachNote, index) if dont want to reverse

// reversedArray.length>0 ? used this in starting to use tertinary opeator
