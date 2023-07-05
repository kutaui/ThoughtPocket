'use client';

import NoteEditor from '@/components/noteEditor/NoteEditor';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DashSidebar from '@/components/DashSidebar';
import { useCreateNoteMutation } from '@/redux/slices/notesApiSlice';

export type Note = {
  _id: string;
  title: string;
  body: string;
  user: string;
  __v: number;
};

export default function Dashboard() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState(null);

  const [createNote] = useCreateNoteMutation();

  const [isAddingNote, setIsAddingNote] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${userInfo._id}`,
        {
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
      if (activeNote && data.notes && data.notes.length > 0) {
        const updatedActiveNote = data.notes.find(
          (note: Note) => note._id === activeNote
        );
        if (updatedActiveNote) {
          setActiveNote(updatedActiveNote._id);
        }
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const onAddNote = async () => {
    if (!userInfo) {
      return; // Return early if userInfo is undefined
    }
    try {
      setIsAddingNote(true); // Set isAddingNote to true before the request

      const newNote = {
        title: 'Untitled Note',
        body: '',
        user: userInfo._id,
      };

      const response = await createNote(newNote).unwrap();
      const addedNote = response.data;

      setNotes((prevNotes) => ({
        notes: [...prevNotes.notes, addedNote],
        length: prevNotes.notes.length + 1,
      }));

      await fetchNotes();
    } catch (error) {
      // Handle error
    } finally {
      setIsAddingNote(false); // Set isAddingNote to false after the request (whether it succeeds or fails)
    }
  };
  const onDeleteNote = async (noteId: string) => {
    const deleteNote = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${noteId}`,
          {
            credentials: 'include',
            method: 'DELETE',
          }
        );
        if (!response.ok) {
          throw new Error('Failed to delete notes');
        }
      } catch (error) {
        // Handle error
      }
    };
    await deleteNote();
    await fetchNotes();
  };
  const getActiveNote = () => {
    if (!notes) {
      return null;
    }
    return notes.find((note: Note) => note && note._id === activeNote);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <section className="flex">
      <DashSidebar
        notes={notes}
        onDeleteNote={onDeleteNote}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        isAddingNote={isAddingNote}
      />
      <NoteEditor
        activeNote={getActiveNote()}
        fetchNotes={fetchNotes}
        setActiveNote={setActiveNote}
      />
    </section>
  );
}
