'use client';

import NoteEditor from '@/components/noteEditor/NoteEditor';
import React, { useEffect, useState } from 'react';
import DashSidebar from '@/components/DashSidebar';
import { useCreateNoteMutation } from '@/redux/slices/notesApiSlice';
import BackendURL from '@/utils/BackendURL';
import { getCookie } from 'cookies-next';

export type Note = {
  _id: string;
  title: string;
  body: string;
  user: string;
  __v: number;
};

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const userId = getCookie('userId') || '';
  const [notes, setNotes] = useState<{ notes: Note[] }>({ notes: [] });
  const [activeNote, setActiveNote] = useState(null);
  const [createNote] = useCreateNoteMutation();
  const [isAddingNote, setIsAddingNote] = useState(false);
  useEffect(() => {
    setUserInfo(userId);
  }, [userId]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${BackendURL}/api/notes/${userInfo}`, {
        credentials: 'include',
      });
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
        user: userInfo,
      };

      const response = await createNote(newNote).unwrap();
      const addedNote = response.data;

      setNotes((prevNotes) => ({
        ...prevNotes,
        notes: [...prevNotes.notes, addedNote],
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
        const response = await fetch(`${BackendURL}/api/notes/${noteId}`, {
          credentials: 'include',
          method: 'DELETE',
        });
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
    if (!notes || !activeNote || !notes.notes || !Array.isArray(notes.notes)) {
      return null;
    }
    return (
      notes.notes.find((note: Note) => note && note._id === activeNote) || null
    );
  };

  useEffect(() => {
    if (userInfo) {
      fetchNotes();
    }
  }, [userInfo]);

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
