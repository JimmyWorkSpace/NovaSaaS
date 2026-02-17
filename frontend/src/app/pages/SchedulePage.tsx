import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaBold, FaItalic, FaListUl, FaHeading, FaUndo, FaRedo } from "react-icons/fa";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Platform = "facebook" | "instagram";
type RepeatType = "once" | "daily" | "weekly" | "monthly";

type SaveState = "idle" | "saving" | "saved";

const PLATFORM_META: Record<Platform, { label: string; maxChars: number }> = {
  facebook: { label: "Facebook", maxChars: 2000 },
  instagram: { label: "Instagram", maxChars: 2200 },
};

// 轻量 emoji 列表（可自己扩充）
const EMOJIS = ["🔥", "✨", "✅", "📌", "📣", "🚀", "💡", "🎯", "😍", "😂", "👍", "🎉"];

function formatWeekdayLabel(w: string) {
  const map: Record<string, string> = {
    Monday: "週一",
    Tuesday: "週二",
    Wednesday: "週三",
    Thursday: "週四",
    Friday: "週五",
    Saturday: "週六",
    Sunday: "週日",
  };
  return map[w] ?? w;
}

// 预览用：把纯文本拆成 “普通文字 / #hashtag”
function renderHashtagRichText(text: string) {
  // 支持中英文 hashtag（#科技 #ai_marketing）
  const re = /#[\p{L}\p{N}_]+/gu;
  const parts: { type: "text" | "tag"; value: string }[] = [];

  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const start = m.index;
    const end = re.lastIndex;

    if (start > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, start) });
    }
    parts.push({ type: "tag", value: text.slice(start, end) });
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  // 保留换行
  return parts.map((p, idx) => {
    const lines = p.value.split("\n");
    return (
      <span key={idx} className={p.type === "tag" ? "np-hashtag" : undefined}>
        {lines.map((ln, i) => (
          <span key={i}>
            {ln}
            {i < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    );
  });
}

export default function SchedulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 业务表单
  const [platform, setPlatform] = useState<Platform>("facebook");
  const [repeatType, setRepeatType] = useState<RepeatType>("once");
  const [dateTime, setDateTime] = useState("");
  const [weekday, setWeekday] = useState("Monday");
  const [monthDate, setMonthDate] = useState(1);

  // 平台内容隔离（每个平台单独存 HTML）
  const [contentByPlatform, setContentByPlatform] = useState<Record<Platform, string>>({
    facebook:
      "<p>📣 新品上線！</p><p>用 NovaSaaS 一鍵生成品牌短片，讓內容自動發佈、穩定成長。</p><p>#SaaS #AI #Marketing</p>",
    instagram:
      "<p>✨ 讓內容自動發佈</p><p>一鍵生成品牌短片，轉化更穩。</p><p>#AI #SaaS #內容行銷</p>",
  });

  const [saveState, setSaveState] = useState<SaveState>("idle");
  const saveTimerRef = useRef<number | null>(null);

  // TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
      }),
    ],
    content: contentByPlatform[platform],
    editorProps: {
      attributes: {
        class: "np-editor-content",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      // 1) 更新当前平台内容
      setContentByPlatform((prev) => ({ ...prev, [platform]: html }));

      // 2) 自动保存（UI 模拟：800ms debounce）
      setSaveState("saving");
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = window.setTimeout(() => {
        setSaveState("saved");
      }, 800);
    },
  });

  // 切平台：保存当前 -> 切换 editor content
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(contentByPlatform[platform] || "<p></p>", false);
    setSaveState("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, editor]);

  // 统计：字数 / hashtag
  const plainText = useMemo(() => (editor ? editor.getText() : ""), [editor, contentByPlatform, platform]);
  const charCount = plainText.length;

  const hashtags = useMemo(() => {
    const re = /#[\p{L}\p{N}_]+/gu;
    return (plainText.match(re) || []).map((s) => s.trim());
  }, [plainText]);

  const uniqueHashtags = useMemo(() => Array.from(new Set(hashtags)), [hashtags]);

  const maxChars = PLATFORM_META[platform].maxChars;
  const overLimit = charCount > maxChars;

  const handleInsertEmoji = (emoji: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(emoji).run();
  };

  const handleSubmit = () => {
    // UI 模拟（你后续可以换成真实 API）
    alert(
      `排程已設定（UI 模擬）\n平台：${PLATFORM_META[platform].label}\n模式：${repeatType}\n時間：${dateTime || "未設定"}`
    );
    navigate("/works");
  };

  const scheduleHint = useMemo(() => {
    if (repeatType === "once") return "單次發布";
    if (repeatType === "daily") return "每日發布";
    if (repeatType === "weekly") return `每週 ${formatWeekdayLabel(weekday)} 發布`;
    return `每月 ${monthDate} 號發布`;
  }, [repeatType, weekday, monthDate]);

  return (
    <div className="schedule-page">
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light me-3" onClick={() => navigate("/works")}>
              <FaArrowLeft />
            </button>
            <div>
              <h2 className="schedule-title m-0">排程發布 - 作品 #{id}</h2>
              <div className="schedule-subtitle">{scheduleHint}</div>
            </div>
          </div>

          {/* 保存状态 */}
          <div className={`save-indicator ${saveState}`}>
            {saveState === "idle" && "—"}
            {saveState === "saving" && "保存中…"}
            {saveState === "saved" && "已保存"}
          </div>
        </div>

        <div className="row g-4">
          {/* Left - Preview */}
          <div className="col-lg-7">
            <div className="schedule-card p-4">
              <div className="schedule-section-title">貼文預覽</div>

              <div className="preview-shell">
                <div className="preview-top">
                  <div className="preview-avatar" />
                  <div className="preview-meta">
                    <div className="preview-name">NovaSaaS</div>
                    <div className="preview-platform">{PLATFORM_META[platform].label} · 排程中</div>
                  </div>
                </div>

                <div className="preview-body">
                  <div className="preview-text">
                    {renderHashtagRichText(plainText || "（尚未輸入內容）")}
                  </div>

                  {/* 预览媒体（你未来可换成真实 videoUrl） */}
                  <div className="preview-media">
                    <div className="preview-media-inner">Video Preview</div>
                  </div>
                </div>

                <div className="preview-footer">
                  <div className="preview-action">👍 Like</div>
                  <div className="preview-action">💬 Comment</div>
                  <div className="preview-action">↗ Share</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Settings + Editor */}
          <div className="col-lg-5">
            <div className="schedule-card p-4">
              {/* Platform */}
              <div className="mb-4">
                <label className="form-label">發布平台</label>
                <div className="d-flex gap-2">
                  {(["facebook", "instagram"] as Platform[]).map((p) => (
                    <button
                      key={p}
                      className={`platform-btn ${platform === p ? "active" : ""}`}
                      onClick={() => setPlatform(p)}
                      type="button"
                    >
                      {PLATFORM_META[p].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Repeat Type */}
              <div className="mb-4">
                <label className="form-label">發布模式</label>
                <div className="repeat-group">
                  {(["once", "daily", "weekly", "monthly"] as RepeatType[]).map((r) => (
                    <button
                      key={r}
                      className={`repeat-btn ${repeatType === r ? "active" : ""}`}
                      onClick={() => setRepeatType(r)}
                      type="button"
                    >
                      {r === "once" && "單次"}
                      {r === "daily" && "每日"}
                      {r === "weekly" && "每週"}
                      {r === "monthly" && "每月"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date / Time */}
              <div className="mb-4">
                <label className="form-label">發布時間</label>
                <input
                  type="datetime-local"
                  className="form-control schedule-input"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>

              {/* Weekly */}
              {repeatType === "weekly" && (
                <div className="mb-4">
                  <label className="form-label">每週星期</label>
                  <select
                    className="form-select schedule-input"
                    value={weekday}
                    onChange={(e) => setWeekday(e.target.value)}
                  >
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
              )}

              {/* Monthly */}
              {repeatType === "monthly" && (
                <div className="mb-4">
                  <label className="form-label">每月日期</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    className="form-control schedule-input"
                    value={monthDate}
                    onChange={(e) => setMonthDate(Number(e.target.value))}
                  />
                </div>
              )}

              {/* Editor */}
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label className="form-label m-0">貼文內容（{PLATFORM_META[platform].label}）</label>
                  <div className={`char-counter ${overLimit ? "danger" : ""}`}>
                    {charCount} / {maxChars}
                  </div>
                </div>

                {/* Toolbar */}
                <div className="np-editor-toolbar">
                  <button
                    className={`tb-btn ${editor?.isActive("bold") ? "active" : ""}`}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    type="button"
                    title="Bold"
                  >
                    <FaBold />
                  </button>

                  <button
                    className={`tb-btn ${editor?.isActive("italic") ? "active" : ""}`}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    type="button"
                    title="Italic"
                  >
                    <FaItalic />
                  </button>

                  <button
                    className={`tb-btn ${editor?.isActive("heading", { level: 2 }) ? "active" : ""}`}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    type="button"
                    title="H2"
                  >
                    <FaHeading />
                  </button>

                  <button
                    className={`tb-btn ${editor?.isActive("bulletList") ? "active" : ""}`}
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    type="button"
                    title="Bullet List"
                  >
                    <FaListUl />
                  </button>

                  <div className="tb-divider" />

                  <button
                    className="tb-btn"
                    onClick={() => editor?.chain().focus().undo().run()}
                    type="button"
                    title="Undo"
                    disabled={!editor?.can().undo()}
                  >
                    <FaUndo />
                  </button>

                  <button
                    className="tb-btn"
                    onClick={() => editor?.chain().focus().redo().run()}
                    type="button"
                    title="Redo"
                    disabled={!editor?.can().redo()}
                  >
                    <FaRedo />
                  </button>

                  <div className="tb-divider" />

                  {/* Emoji */}
                  <div className="emoji-bar">
                    {EMOJIS.map((e) => (
                      <button key={e} className="emoji-btn" type="button" onClick={() => handleInsertEmoji(e)}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Content */}
                <div className={`np-editor-shell ${overLimit ? "danger" : ""}`}>
                  <EditorContent editor={editor} />
                </div>

                {/* Hashtag summary */}
                <div className="hashtag-summary">
                  <div className="hashtag-title">
                    Hashtag：{uniqueHashtags.length}（內容自動解析）
                  </div>
                  <div className="hashtag-chips">
                    {uniqueHashtags.length === 0 ? (
                      <span className="hashtag-empty">（尚無 hashtag）</span>
                    ) : (
                      uniqueHashtags.slice(0, 12).map((t) => (
                        <span className="hashtag-chip" key={t}>
                          {t}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <button className="btn btn-success w-100 fw-bold" onClick={handleSubmit} disabled={overLimit}>
                確認排程
              </button>

              {overLimit ? (
                <div className="limit-warning mt-2">字數超過 {maxChars}，請縮短內容後再排程。</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
