import React, { useEffect, useState } from "react";
import "./StickyNote.css";

function StickyNote({ notes = [], okrId = "global" }) {
    const storageKey = `stickyNotes_${okrId}`;
    const [localNotes, setLocalNotes] = useState(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            return raw ? JSON.parse(raw) : notes;
        } catch (e) {
            return notes;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(localNotes));
        } catch (e) {}
    }, [localNotes, storageKey]);

    const updateNote = (index, value) => {
        const copy = [...localNotes];
        copy[index] = value;
        setLocalNotes(copy);
    };

    const addNote = () => setLocalNotes([...localNotes, ""]);
    const removeNote = (index) => setLocalNotes(localNotes.filter((_, i) => i !== index));

    return (
        <div className="sticky-note compact">
            <div className="sticky-pin">📌</div>
            <div className="sticky-content">
                {localNotes.map((note, index) => (
                    <div key={index} className="sticky-item">
                        <textarea
                            className="sticky-input"
                            value={note}
                            onChange={(e) => updateNote(index, e.target.value)}
                            rows={2}
                        />
                        <button
                            className="sticky-remove"
                            onClick={() => removeNote(index)}
                            aria-label={`Remove note ${index + 1}`}
                        >
                            ×
                        </button>
                    </div>
                ))}

                <button className="sticky-add compact" onClick={addNote} aria-label="Add note">＋</button>
            </div>
        </div>
    );
}

export default StickyNote;