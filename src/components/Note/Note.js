import React from 'react'
import { MdDeleteForever } from "react-icons/md"
import './Note.css'

let timer=500,timeout;

function Note(props) {

  const formattedTime = new Date(props.note.time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = new Date(props.note.time).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short'
  });

  const debounce=(func)=>{
    clearTimeout(timeout)
    timeout=setTimeout(func,timer);
  }
  
  const updateTopic = (text, id) => {
    props.updateTopic(text, id);
  };

  const updateText=(text,id)=>{
    debounce(()=>props.updateText(text,id));
  }

  const iconSize = '1.5rem';

  return (
    <div className='note' style={{backgroundColor:props.note.color}}>
      <textarea
        className='note-topic'
        spellCheck={false}
        placeholder='Note Topic'
        value={props.note.topic} // assuming there's a 'topic' property in your note object
        onChange={(event) => updateTopic(event.target.value, props.note.id)}
      />
      <textarea 
        className='note-text' 
        placeholder='Note Content'
        defaultValue={props.note.text} 
        spellCheck={false}
        onChange={(event)=>updateText(event.target.value,props.note.id)}  
      />
      <div className='note-footer'>
      <p>{formattedTime} {formattedDate}</p>
      <MdDeleteForever className='delete-icon' size={iconSize} onClick={() => props.deleteNote(props.note.id) }/>
      </div>
    </div>
  )
}

export default Note

// () => {props.note.id} used in onClick in delete if we would've used props.note.id only 
// it would've immediately executed on compiling without click
// date format is from internet
// we'll use debounce(removing unwanted or extra inputs) to optimize and reduce re renders
