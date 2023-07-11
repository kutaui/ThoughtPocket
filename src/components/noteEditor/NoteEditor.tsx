'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import Tiptap from '@/components/noteEditor/Tiptap';
import BackendURL from '@/utils/BackendURL';
import { Button } from '@/components/ui/button';
import { Note } from '@/global';

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});

// fix props types, add onclick event for save, fix the automatic save code

type NoteEditorProps = {
  activeNote: Note | null;
  fetchNotes: () => Promise<void>;
};

export default function NoteEditor({
  activeNote,
  fetchNotes,
}: NoteEditorProps) {
  const [updatedTitle, setUpdatedTitle] = useState(activeNote?.title || '');
  const [updatedBody, setUpdatedBody] = useState(activeNote?.body || '');
  const [savingState, setSavingState] = useState<number>(SavingState.NOT_SAVED);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const pendingBodyRef = useRef<string | undefined>();
  const pendingTitleRef = useRef<string | undefined>();

  // pendingRef's are used to store the values of the title and body while the user is typing
  // updatedTitle and updatedBody are used to store the values of the title and body that are displayed in the input fields

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
    }, 1500);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedTitle(value);
    scheduleSave(value, pendingBodyRef.current || updatedBody);
    pendingTitleRef.current = value;
  };

  const handleBody = (value: string) => {
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
      <div className="flex justify-around w-[70%] mt-10 md:ml-14 mb-10">
        <h3 className="ml-4 text-2xl">Autosave is on:</h3>
        {savingState === SavingState.NOT_SAVED && (
          <p className="ml-4 text-2xl text-red-700">Not Saved</p>
        )}
        {savingState === SavingState.SAVING && (
          <p className="ml-4 text-2xl text-red-700">Saving...</p>
        )}
        {savingState === SavingState.SAVED && (
          <p className="ml-4 text-2xl text-red-700">Saved</p>
        )}
        <Button
          disabled={savingState === SavingState.SAVING}
          className="w-20 ml-8 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
