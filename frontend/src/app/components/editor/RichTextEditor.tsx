import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}
