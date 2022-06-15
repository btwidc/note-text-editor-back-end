import * as fs from 'fs';

import ApiError from '../errors/ApiError';
import { NoteType } from '../types/noteType';

const jsonDataPath = './src/db/notes.json';

class NotesService {
  public async getNotesList(): Promise<NoteType[] | void> {
    const notesBuffer = fs.readFileSync(jsonDataPath);
    if (notesBuffer.length === 0) {
      throw ApiError.NotFound(`Notes list is empty`);
    }

    return JSON.parse(notesBuffer.toString());
  }

  public async getNote(id: string): Promise<NoteType | void> {
    const notes = JSON.parse(fs.readFileSync(jsonDataPath).toString());
    const note = notes.find((note: NoteType) => note.id === id);

    if (!note) {
      throw ApiError.NotFound(`Can't get note`);
    }

    return note;
  }

  public async addNote(
    id: string,
    title: string,
    message: string,
    tag: string,
  ): Promise<NoteType | void> {
    const newNote = { id, title, message, tag };

    if (!newNote) {
      throw ApiError.NotFound(`Can't add note`);
    }

    const notes = JSON.parse(fs.readFileSync(jsonDataPath).toString());
    notes.push(newNote);
    const newNotes = JSON.stringify(notes);

    fs.writeFileSync(jsonDataPath, newNotes);
    return newNote;
  }

  public async updateNote(
    id: string,
    title: string,
    message: string,
    tag: string,
  ) {
    const updateNote = { id, title, message, tag };
    const notes = JSON.parse(fs.readFileSync(jsonDataPath).toString());

    if (!updateNote) {
      throw ApiError.NotFound(`Can't update note`);
    }
    const noteForUpdateIndex = notes.findIndex(
      (note: NoteType) => note.id === id,
    );
    notes[noteForUpdateIndex] = {
      ...notes[noteForUpdateIndex],
      title: title,
      message: message,
      tag: tag,
    };
    const newNotes = JSON.stringify(notes);

    fs.writeFileSync(jsonDataPath, newNotes);
    return true;
  }

  public async deleteNote(id: string): Promise<boolean> {
    const notes = JSON.parse(fs.readFileSync(jsonDataPath).toString());
    const filteredNotes = JSON.stringify(
      notes.filter((note: NoteType) => note.id !== id),
    );

    fs.writeFileSync(jsonDataPath, filteredNotes);
    return true;
  }
}

export default new NotesService();
