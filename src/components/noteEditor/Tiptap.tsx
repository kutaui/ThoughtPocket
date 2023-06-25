"use client"
import {Color} from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {Editor, EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, {Ref, useEffect, useMemo, useRef} from 'react'
import {Button} from "@/components/ui/button"


const MenuBar = ({editor}:any) => {
    if (!editor) {
        return null
    }

    return (
        <>
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'bg-black text-white' : ''}
            >
                bold
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                italic
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                strike
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                code
            </Button>
            <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                clear marks
            </Button>
            <Button onClick={() => editor.chain().focus().clearNodes().run()}>
                clear nodes
            </Button>
            <Button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                paragraph
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
            >
                h1
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
            >
                h2
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
            >
                h3
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}
            >
                h4
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}
            >
                h5
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                className={editor.isActive('heading', {level: 6}) ? 'is-active' : ''}
            >
                h6
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                bullet list
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                ordered list
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                code block
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                blockquote
            </Button>
            <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                horizontal rule
            </Button>
            <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
                hard break
            </Button>
            <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                undo
            </Button>
            <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                redo
            </Button>
            <Button
                onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                className={editor.isActive('textStyle', {color: '#958DF1'}) ? 'is-active' : ''}
            >
                purple
            </Button>
        </>
    )
}

export default function Tiptap(props: any) {

    const extensions = useMemo(() => [
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        }),
    ], []);
    const editor = useEditor({
        extensions, editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm md:prose-base lg:prose-2xl focus:outline-none m-5 w-[95%] h-96 overflow-auto dark:text-white text-black break-word',
            },
        }, onUpdate: ({editor}) => {
            props.onChange(editor.getHTML())
        },
        content: props.value,

    },)
    useEffect(() => {
        if (editor && props.value !== editor.getHTML()) {
            editor.commands.setContent(props.value);
        }
    }, [editor, props.value]);


    //if I put the dependency of props.value in useEditor, the input loses focus in each keystroke,if I don't, when active note changes the value doesn't.
    // and If I do this in useEffect, you can't select the text, you can't move through elements, you can only type and delete
    // If I the dependency of activenote, the body value shows the value of the previous note


    return (
        <div className="w-[95%] min-w-[100px] md:w-[70%] mx-auto ">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="break-all border-2 border-black mt-5 w-[95%]"/>
        </div>
    )
}