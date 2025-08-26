import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Notes({ user, setUser }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*").eq("user_id", user.id);
    if (error) console.log(error);
    else setNotes(data);
  };

  useEffect(() => { fetchNotes(); }, [user]);

  const handleAddNote = async () => {
    if (!newNote) return;
    const { data, error } = await supabase.from("notes").insert([{ content: newNote, user_id: user.id }]).select();
    if (error) console.log(error);
    else setNotes([...notes, data[0]]);
    setNewNote("");
  };

  const handleDelete = async (id) => {
    await supabase.from("notes").delete().eq("id", id);
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="notes-container">
      <h1>{user.email}'s Notes</h1>
      <button onClick={handleLogout}>Logout</button>

      <div className="add-note">
        <input type="text" placeholder="New note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button onClick={handleAddNote}>Add</button>
      </div>

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
