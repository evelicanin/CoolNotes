import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Note } from '../../models/note.model';


@Injectable()
export class NoteService {

  // privatni niz objekata 'notes', a svaki objekat ima propertije koji su opisani u modelu(note.model.ts)
  // i po defaultu ga inicijaliziramo kao prazan niz objekata
  private notes: Note[] = []; 
  private note: Note;  // privatna note varijabla tipa Note :: treba nam za dohvatanje jedog jedinog note-a

  constructor(public storage: Storage) {
  }


  saveNote(note: Note){
    note.createdDate = Date.now();         // ovo ne kupimo od korisnika, nego sami setujemo
    this.notes.push(note);                 // dodajemo novi clan u skup 'notes'
    this.storage.set('notes',this.notes);  // guramo skup 'notes' u bazu
  }


  getAllNotes(){
     return this.storage.get('notes').then(
       (notes) => {
         this.notes = notes == null ? [] : notes; 
         // return this.notes;         // ovo znaci da vracamo bas ovaj 'notes' niz
            return [...this.notes];    // ovo znaci da vracamo kopiju od 'notes' niza
       }
     )
  }


  getNote(createdDate: number){
    // kako pronaci neki specifican Note u nizu note-ova?
      // tako sto iz baze dohvatimo sve Note-ove, i onda izdojimo samo onaj
      // kod kojeg createdate property odgovara proslijedjenom createdDate parametru
      // a takav je samo jedan Note (jer nam createdDate dodje kao index, kao id, sami ga setujemo) 
    return this.storage.get('notes').then((notes) => {
      this.note = [...notes].find(r =>  r.createdDate === createdDate ); // skracena verzija callback f-je
      return this.note;
    });
  }


  deleteNote(createdDate: number){
    // kako brisemo neki specifican note iz niza note-ova?
      // tako sto uzmemo nas skup m'notes', izjednacimo ga sa samim sobom
      // ali poocu filter funkcije izbacimo sve one kojima je property createdDate jednak 
      // proslijedjenom parametru cretedDate, a takvih moze biti samo jedan jedini note
      //  i naravno, kmoristimo arrow/callback funkciju da returnamo takve note-ove
    this.notes = this.notes.filter((note) => {
      return note.createdDate !== createdDate;
    });

    this.storage.set('notes',this.notes); // guramo skup 'notes' u bazu
  }

}