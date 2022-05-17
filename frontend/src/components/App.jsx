import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const API_ENDPOINT = process.env.NODE_ENV || "https://arcane-cove-98465.herokuapp.com/";

function App() {
  const [notes, setNotes] = useState([]);
  
 
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }


  useEffect(() => {
    axios.get("https://arcane-cove-98465.herokuapp.com/")
    // axios.get(API_ENDPOINT )
      .then(res => {
        setNotes(res.data)
        
      }) 
      .catch(err => console.log(err));
  })

  function deleteNote(id) {
    
    axios.delete("https://arcane-cove-98465.herokuapp.com/" + id);
    // axios.delete(API_ENDPOINT  + id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    
    <div>  
      <Header />
        
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            _id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
        
      <Footer />
    </div>

  );
}





export default App;
