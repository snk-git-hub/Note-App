const addBTN = document.querySelector(".simple-button");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

const dlt = (note) => {
    note.remove();  // Remove the specific note from the DOM
    saveNotes();  // Save updated notes to localStorage
};

addBTN.addEventListener("click", function () {
    addNote();  // Add a new note when the add button is clicked
});

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="trash fas fa-trash"></i>
            <i class="save fas fa-save"></i>
        </div>
        <textarea cols="30">${text}</textarea>
    `;

    // Add event listener to the trash button for deleting the note
    const trashBtn = note.querySelector(".trash");
    trashBtn.addEventListener("click", function () {
        dlt(note);  // Delete the specific note
    });

    // Add event listener to the save button for saving the notes
    const saveBtn = note.querySelector(".save");
    saveBtn.addEventListener("click", function () {
        saveNotes();  // Save the notes
    });

    // Add event listener to the textarea to save when focus is lost
    const textArea = note.querySelector("textarea");
    textArea.addEventListener("focusout", function () {
        saveNotes();  // Save notes when focus is lost from textarea
    });

    main.appendChild(note);  // Add the new note to the DOM
    saveNotes();  // Save updated notes to localStorage
};

// Immediately invoked function to load saved notes from localStorage
(function () {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    
    if (lsNotes === null) {
        addNote();  // Add a default note if no notes are saved
    } else {
        lsNotes.forEach((savedNote) => {
            addNote(savedNote);  // Add each saved note from localStorage
        });
    }
})();
