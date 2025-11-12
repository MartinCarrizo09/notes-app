import { useEffect, useState } from "react";
import api from "../services/api";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchNotes = async () => {
    try {
      setError("");
      const res = await api.get("/notes/active");
      setNotes(res.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Failed to load notes";
      setError(errorMsg);
      console.error("Error fetching notes:", err);
    }
  };

  const createNote = async () => {
    if (!title.trim() || !content.trim()) return;
    
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/notes/create", { title, content, tags: [] });
      setTitle("");
      setContent("");
      setSuccess("Note created successfully!");
      fetchNotes();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Failed to create note";
      setError(errorMsg);
      console.error("Error creating note:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleArchive = async (id) => {
    try {
      setError("");
      await api.put(`/notes/${id}/archive`);
      setSuccess("Note archived successfully!");
      fetchNotes();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Failed to archive note";
      setError(errorMsg);
      console.error("Error archiving note:", err);
    }
  };

  const deleteNote = async (id) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      setError("");
      await api.delete(`/notes/${id}`);
      setSuccess("Note deleted successfully!");
      fetchNotes();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Failed to delete note";
      setError(errorMsg);
      console.error("Error deleting note:", err);
    }
  };

  const startEdit = (note) => {
    setEditingNote(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.put(`/notes/${editingNote}`, {
        title: editTitle,
        content: editContent,
        tags: []
      });
      setSuccess("Note updated successfully!");
      cancelEdit();
      fetchNotes();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Failed to update note";
      setError(errorMsg);
      console.error("Error updating note:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      <header className="notes-header">
        <div>
          <h2>Active Notes</h2>
          <p className="page-subtitle">
            {notes.length} active note{notes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span className="notes-hint">Keep ideas organized and archive what you're done with.</span>
      </header>

      {error && (
        <div className="alert alert-error" onClick={() => setError("")}>
          <span>⚠️</span>
          <span>{error}</span>
          <button className="alert-close">×</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>✅</span>
          <span>{success}</span>
        </div>
      )}

      <section className="create-note-form">
        <div className="form-heading">
          <h3>Create New Note</h3>
          <p>Title and content are required. You can always edit later.</p>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="note-title">Title</label>
            <input
              id="note-title"
              type="text"
              placeholder="e.g. Sprint planning ideas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              placeholder="Capture tasks, ideas, or reminders here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
            />
          </div>
        </div>
        <div className="form-actions">
          <button
            onClick={createNote}
            className="btn-primary"
            disabled={loading || !title.trim() || !content.trim()}
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </section>

      <section className="notes-grid">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>📝 No active notes yet. Create your first note above!</p>
          </div>
        ) : (
          notes.map((note) => (
            <article key={note.id} className="note-card">
              <header className="note-card-header">
                <h3>{note.title}</h3>
                <span className="note-date">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </header>
              <p className="note-content">{note.content}</p>
              <footer className="note-actions">
                <button
                  onClick={() => startEdit(note)}
                  className="btn-edit"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => toggleArchive(note.id)}
                  className="btn-secondary"
                >
                  📦 Archive
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="btn-danger"
                >
                  🗑️ Delete
                </button>
              </footer>
            </article>
          ))
        )}
      </section>

      {editingNote && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Note</h3>
              <button className="modal-close" onClick={cancelEdit}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-content">Content</label>
                <textarea
                  id="edit-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="6"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={cancelEdit} className="btn-secondary">Cancel</button>
              <button
                onClick={saveEdit}
                className="btn-primary"
                disabled={loading || !editTitle.trim() || !editContent.trim()}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesPage;
