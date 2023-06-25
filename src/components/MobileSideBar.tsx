import Hamburger from 'hamburger-react'
import {useState} from "react";
import {Button} from "@/components/ui/button";

export default function MobileSideBar({notes, onAddNote, setActiveNote, activeNote,onDeleteNote}: any) {
    const [isOpen, setOpen] = useState(false)
    const hidden = isOpen ? "w-2/3 border-2 border-black " : "w-0"


    const handleNoteClick = (noteId:number) => {
        setActiveNote(noteId);
    };
    return <>
        <div className="fixed top-3 left-7">
            <Hamburger toggled={isOpen} toggle={setOpen}/>
        </div>
        <aside className={`${hidden} fixed z-10 top-15 left-0  h-full bg-white transition-all duration-300 ease-in-out `}>
            {isOpen && <div className="flex items-center justify-around w-[100%] my-3">
                <h2 className="text-xl dark:text-black font-bold">Notes</h2>
                <Button onClick={onAddNote} className="h-6 dark:bg-black dark:hover:bg-white dark:hover:text-black">Add</Button>
            </div>}
            {isOpen && notes.notes && notes.notes.map((note: any) => (
                <div onClick={() => handleNoteClick(note && note._id)} key={note && note._id}
                     className={`h-12  flex justify-around dark:text-black items-center hover:bg-gray-700 ${note && note._id === activeNote && "bg-black text-white dark:text-white"}`}
                >
                    <h3 className="truncate  w-[70%]">{note && note.title}</h3>
                    <Button  onClick={() => onDeleteNote(note && note._id)} className="dark:bg-black dark:hover:bg-white dark:text-white dark:hover:text-black h-6 px-2">Delete</Button>
                </div>
            ))
            }
        </aside>
    </>
}