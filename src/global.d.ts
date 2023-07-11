import React from 'react';

export type Note = {
  _id: string;
  title: string;
  body: string;
  user: string;
  __v: number;
};

export type SideBarProps = {
  notes: Note[];
  onAddNote: () => Promise<void>;
  setActiveNote: React.Dispatch<React.SetStateAction<string | null>>;
  activeNote: string | null;
  onDeleteNote: (noteId: string) => Promise<void>;
  isAddingNote: boolean | undefined;
};
