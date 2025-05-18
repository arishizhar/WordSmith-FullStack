import { TextField } from "@mui/material";
import { EditorProvider, EditorContent, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import React from "react";
import "./tiptap.scss";

// MenuBar
const MenuBar = ({ onOpenCoverPicker, onOpenContentPicker }) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className="control-group">
      <div className="button-group">
        {/* Formatting Buttons */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          Strike
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()}>
          Code
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code Block
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          HR
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          BR
        </button>
        <button onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        >
          Purple
        </button>

        {/* Image Buttons */}
        <button onClick={(e) => onOpenCoverPicker(e)}>Add Cover Image</button>
        <button onClick={(e) => onOpenContentPicker(e)}>Add Image</button>
      </div>
    </div>
  );
};

// Add `Image` here!
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true },
    orderedList: { keepMarks: true },
  }),
  Image,
];

const content = `<p>Start writing your content here... Tip - (Enter = new paragraph & Shift+Enter = line break)</p>`;

const Tiptap = ({ editorRef, onOpenCoverPicker, onOpenContentPicker }) => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={
        <MenuBar
          onOpenCoverPicker={onOpenCoverPicker}
          onOpenContentPicker={onOpenContentPicker}
        />
      }
      onUpdate={({ editor }) => {
        if (editorRef) {
          editorRef.current = editor;
        }
      }}
    >
      <EditorContent />
    </EditorProvider>
  );
};

export default Tiptap;
