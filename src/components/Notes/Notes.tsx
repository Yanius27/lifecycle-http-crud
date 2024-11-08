import { useState, useEffect } from 'react';
import axios from 'axios';

import './Notes.css';

interface INote {
  id: number,
  content: string,
}

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3040/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Ошибка при получении заметок:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!content) return; 
    try {
      await axios.post('http://localhost:3040/notes', {
        id: 0,
        content,
      });
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3040/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  return (
    <div className="Notes">
      <h1>Notes</h1>

      <div className="notes-list">
        {notes.length > 0 ? (
          notes.map((note: INote) => (
            <div key={note.id} className="note-card">
              <p>{note.content}</p>
              <button onClick={() => deleteNote(note.id)}>X</button>
            </div>
          ))
        ) : (
          <p>Заметок нет</p>
        )}
      </div>
      <div className='note-card__input-group'>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <button onClick={addNote} />
      </div>
    </div>
  );
}
