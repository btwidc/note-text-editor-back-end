import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import notesService from '../services/notesService';
import { NoteType } from '../types/noteType';

class NotesController {
  public async getNotesList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<NoteType[] | void> {
    try {
      const notesList = await notesService.getNotesList();

      res.json(notesList);
    } catch (e) {
      next(e);
    }
  }

  public async getNote(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<NoteType | void> {
    try {
      const noteId = req.params.id;
      const note = await notesService.getNote(noteId);

      res.json(note);
    } catch (e) {
      next(e);
    }
  }

  public async addNote(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<NoteType | void> {
    try {
      const {title, message, tag} = req.body;
      const note = await notesService.addNote(uuid(), title, message, tag);

      res.json(note);
    } catch (e) {
      next(e);
    }
  }

  public async updateNote(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<boolean | void> {
    try {
      const noteId = req.params.id;
      const {title, message, tag} = req.body;
      const note = await notesService.updateNote(noteId, title, message, tag);

      res.json(note);
    } catch (e) {
      next(e);
    }
  }

  public async deleteNote(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<boolean | void> {
    try {
      const noteId = req.params.id;
      const note = await notesService.deleteNote(noteId);

      res.json(note);
    } catch (e) {
      next(e);
    }
  }

}

export default new NotesController();
