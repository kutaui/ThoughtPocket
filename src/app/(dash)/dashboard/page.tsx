'use client';

import NoteEditor from '@/components/noteEditor/NoteEditor';
import React, { useEffect, useState } from 'react';
import DashSidebar from '@/components/DashSidebar';
import { useCreateNoteMutation } from '@/redux/slices/notesApiSlice';
import BackendURL from '@/utils/BackendURL';
import { deleteCookie, getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import { Note } from '@/global';
import NoteRequests from '@/utils/axios/axios';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/redux/slices/usersApiSlice';
import axios from 'axios';

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<string | boolean | null>(null);
  const userId = getCookie('userId') || '';
  const [notes, setNotes] = useState<{ notes: Note[] }>({ notes: [] });
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [createNote] = useCreateNoteMutation();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const { push } = useRouter();

  useEffect(() => {
    axios
      .get(`${BackendURL}/api/users/verify-token`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(async (response) => {
        const responseData = response.data;
        if (!responseData.isValid) {
          await logoutApiCall({}).unwrap();
          setUserInfo(null);
          deleteCookie('userId');
          push('/auth');
        }
      })
      .catch(async (error) => {
        if (error.response.status === 500) {
          await logoutApiCall({}).unwrap();
          setUserInfo(null);
          deleteCookie('userId');
          push('/auth');
        }
      });
  }, [activeNote]);

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
      toast.error("couldn't fetch notes");
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
      toast.error('something went wrong');
    } finally {
      setIsAddingNote(false); // Set isAddingNote to false after the request (whether it succeeds or fails)
    }
  };

  const onDeleteNote = async (noteId: string) => {
    const deleteNote = async () => {
      const response = await NoteRequests({
        url: `/api/notes/${noteId}`,
        method: 'DELETE',
      });
      if (!response.ok) {
        toast.error('Failed to update note');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  // deleting the dependency array or adding fetchNotes() to it will cause an infinite loop

  return (
    <section className="flex">
      <DashSidebar
        notes={notes.notes}
        onDeleteNote={onDeleteNote}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        isAddingNote={isAddingNote}
      />
      <NoteEditor
        activeNote={getActiveNote()}
        fetchNotes={fetchNotes}
        key={activeNote}
      />
    </section>
  );
}
