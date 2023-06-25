import styles from "@/css/dashsidebar.module.css"
import {Button} from "@/components/ui/button";
import MobileSideBar from "@/components/MobileSideBar";

export default function DashSidebar(props: any) {


    const handleNoteClick = (noteId: string) => {
        props.setActiveNote(noteId);
    };
    return <>
        <aside className="lg:hidden">
            <MobileSideBar notes={props.notes} activeNote={props.activeNote} setActiveNote={props.setActiveNote}
                           onAddNote={props.onAddNote} onDeleteNote={props.onDeleteNote}/>
        </aside>
        <aside className={styles["sidebar"]}>
            <div className={styles["sidebar-container"]}>
                <div className={styles["sidebar-header"]}>
                    <h2>Notes</h2>
                    <Button onClick={props.onAddNote} disabled={props.isAddingNote}
                            className="hover:bg-black hover:text-white h-8 mt-3">Add</Button>
                </div>
                <div className={styles["sidebar-notes"]}>
                    {props.notes.notes && props.notes.notes.map((note: any) => (
                        <div key={note && note._id}
                             className={`${styles["sidebar-note"]} ${note && note._id === props.activeNote && styles["active"]}`}
                             onClick={() => handleNoteClick(note._id)}>
                            <div className={styles["sidebar-note-title"]}>
                                <h3>{note && note.title}</h3>
                                <Button onClick={() => props.onDeleteNote(note && note._id)}
                                        className="hover:bg-red-700 hover:text-white border-red-700 text-red-700 text-xs w-12 h-6">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    </>
}