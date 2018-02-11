import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NoteService } from '../../providers/note-service/note-service';
import { Note } from '../../models/note.model';

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  note: Note;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private noteService: NoteService) 
  {
    this.note = this.navParams.get('note');
  }

  deleteNote(createdDate: number) {
    this.noteService.deleteNote(createdDate);

    // ovim se vracamo sa view-note stranice na home stranicu, 
    // jer skidamo view-note stranicu sa stacka, a na dnu stacka je home stranica
    this.navCtrl.pop(); 
  }

}
