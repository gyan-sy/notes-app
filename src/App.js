import React, { useEffect, useState } from 'react';
import NoteContainer from './components/NoteContainer/NoteContainer';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('notes-app-local-data')) || []
  );

  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('dark-mode'));
    return storedDarkMode !== null ? storedDarkMode : true;
  });

  const [searchTerm, setSearchTerm] = useState('');

  function addNote(color) {
    const tempNotes = [...notes];
    tempNotes.push({
      id: Date.now() + '' + Math.floor(Math.random()) * 89,
      topic: '',
      text: '',
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  }

  function deleteNote(noteId) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  }

  useEffect(() => {
    localStorage.setItem('notes-app-local-data', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  function updateTopic(topic, id) {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex(item => item.id === id);
    if (index < 0) return;
    tempNotes[index].topic = topic;
    setNotes(tempNotes);
  }

  function updateText(text, id) {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex(item => item.id === id);
    if (index < 0) return;
    tempNotes[index].text = text;
    setNotes(tempNotes);
  }

  const iconColor = darkMode ? '#40b5bc' : '#202124';

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="App">
        
        <NoteContainer
          notes={notes}
          deleteNote={deleteNote}
          updateTopic={updateTopic}
          updateText={updateText}
          handleDarkMode={setDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
        />
        <div className='sidebar'>
          <Sidebar addNote={addNote} iconColor={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default App;
