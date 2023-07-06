'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import Tiptap from '@/components/noteEditor/Tiptap';
import BackendURL from '@/utils/BackendURL';

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

export default function NoteEditor({
  activeNote,
  fetchNotes,
  setActiveNote,
}: any) {
  const [updatedTitle, setUpdatedTitle] = useState(activeNote?.title || '');
  const [updatedBody, setUpdatedBody] = useState(activeNote?.body || '');
  const [savingState, setSavingState] = useState<number>(SavingState.NOT_SAVED);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const pendingBodyRef = useRef<string | undefined>();
  const pendingTitleRef = useRef<string | undefined>();

  useEffect(() => {
    setUpdatedTitle(activeNote?.title || '');
    setUpdatedBody(activeNote?.body || '');

    pendingTitleRef.current = activeNote?.title || '';
    pendingBodyRef.current = activeNote?.body || '';
    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [activeNote]);

  const updateNote = async (title: string, body: string) => {
    try {
      const updatedNote = {
        ...activeNote,
        title,
        body,
      };

      const response = await fetch(`${BackendURL}/api/notes`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      setSavingState(SavingState.SAVED);
      await fetchNotes(); // Fetch the updated notes without resetting the state
    } catch (error) {
      // Handle the error
    }
  };

  const scheduleSave = (title: string, body: string) => {
    clearTimeout(typingTimeoutRef.current);
    setSavingState(SavingState.NOT_SAVED);

    // Set a timeout of 1 second after the user stops typing
    typingTimeoutRef.current = setTimeout(async () => {
      setSavingState(SavingState.SAVING);
      await updateNote(title, body); // Pass the updated values to the updateNote function
    }, 3000);
  };

  const handleTitle = (event: any) => {
    const { value } = event.target;
    setUpdatedTitle(value);
    scheduleSave(value, pendingBodyRef.current || updatedBody);
    pendingTitleRef.current = value;
  };

  const handleBody = (value: any) => {
    setUpdatedBody(value);
    scheduleSave(pendingTitleRef.current || updatedTitle, value);
    pendingBodyRef.current = value;
  };

  if (!activeNote) {
    return (
      <div className="mx-auto mt-36 text-3xl text-gray-500">No Active Note</div>
    );
  }

  return (
    <div className="flex flex-col w-full mt-10">
      <Input
        type="text"
        id="title"
        placeholder="Note Title"
        value={updatedTitle}
        autoFocus
        onChange={handleTitle}
        className="w-[50%] mx-auto text-2xl mb-12 focus:border-2"
      />

      <Tiptap
        value={updatedBody}
        onChange={handleBody}
        activeNote={activeNote}
      />
      {savingState === SavingState.SAVING && (
        <div className="ml-4 text-2xl">Saving...</div>
      )}
      {savingState === SavingState.SAVED && (
        <div className="ml-4 text-2xl">Note Saved</div>
      )}
    </div>
  );
}
