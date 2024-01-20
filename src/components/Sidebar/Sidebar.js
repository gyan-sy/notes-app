import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import './Sidebar.css';

function Sidebar(props) {

  const colors = ["#F1F0E8","#D5F0C1","#F6F7C4","#F3CCF3","#B4D4FF"];

  const [listOpen, setListOpen] = useState(false);

  return (
    <div className='sidebar'>
      <IoIosAddCircle 
        size={'4.5rem'} 
        color={props.iconColor} 
        onClick={() => setListOpen(!listOpen)}
      />
      <ul className={`sidebar-list  ${listOpen ? "sidebar-list-active" : ""}`}>
        {colors.map((item, index) => (
          <li 
            key={index} 
            className='sidebar-list-items' 
            style={{backgroundColor: item}}
            onClick={()=> props.addNote(item)}
          /> 
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;


//key is used always to uniquely identify element index is used as key here,,,item refers to here each color in color array
// without string syntax it would've have been like     <ul className='sidebar-list'>
// className={`sidebar-list  ${listOpen ? "sidebar-list-active" : ""}`} its called string tenplate syntax
// Instead of using single quotes ('), you should use backticks (`) to enable string interpolation with `${}`.
// sidebar list active class will be added and removed acc. to toggle listOpen value