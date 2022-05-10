import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";



function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [active, setActive] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
    
  }
  function handleActive(){
    return setActive(true);
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    axios.post("http://localhost:5000", note)
      .then(res => console.log(res.data));
    // window.location = "/";
    setNote({
      title: "",
      content: ""
    });
     
  }

  return (
    <div>
      <form className="create-note">
      
        {
          active &&
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"  
          />
        }
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleActive}
          value={note.content}
          placeholder="Take a note..."
          // rows="(active? 3: 1)"
          rows={active? 3: null}
        />
        <Zoom in={active}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
