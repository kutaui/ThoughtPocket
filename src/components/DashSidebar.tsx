import styles from '@/css/dashsidebar.module.css';
import { Button } from '@/components/ui/button';
import MobileSideBar from '@/components/MobileSideBar';
import React from 'react';
import { Note, SideBarProps } from '@/global';

export default function DashSidebar({
  notes,
  onAddNote,
  setActiveNote,
  activeNote,
  onDeleteNote,
  isAddingNote,
}: SideBarProps) {
  const handleNoteClick = (noteId: string) => {
    setActiveNote(noteId);
  };
  return (
    <>
      <aside className="lg:hidden">
        <MobileSideBar
          notes={notes}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          isAddingNote={isAddingNote}
        />
      </aside>
      <aside className={styles.sidebar}>
        <div className={styles['sidebar-container']}>
          <div className={styles['sidebar-header']}>
            <h2>Notes</h2>
            <Button
              onClick={onAddNote}
              disabled={isAddingNote}
              className="hover:bg-black hover:text-white h-8 mt-3"
            >
              Add
            </Button>
          </div>
          <div className={styles['sidebar-notes']}>
            {notes &&
              notes.map((note: Note) => (
                <div
                  key={note && note._id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => handleNoteClick(note._id)}
                  className={`${styles['sidebar-note']} ${
                    note && note._id === activeNote && styles.active
                  }`}
                  onClick={() => handleNoteClick(note._id)}
                >
                  <div className={styles['sidebar-note-title']}>
                    <h3>{note && note.title}</h3>
                    <Button
                      onClick={() => onDeleteNote(note && note._id)}
                      className="hover:bg-red-700 hover:text-white border-red-700 text-red-700 text-xs w-12 h-6"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </aside>
    </>
  );
}
