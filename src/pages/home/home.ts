import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddNotePage } from '../add-note/add-note';
import { ViewNotePage } from '../view-note/view-note';
import { NoteService } from '../../providers/note-service/note-service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // privatni niz objekata 'notes', gdje svaki objekat ima 'title' property
  // i po defaultu ga inicijaliziramo kao prazan niz objekata
  notes: Promise<Note[]>; 
  private note: Note;  // privatna note varijabla tipa Note :: treba nam za dohvatanje jedog jedinog note-a

  constructor(
    public navCtrl: NavController,
    private noteService: NoteService) 
  {

  }

  // ovo dobijamo od ionica :: valjda je to gotov metod koji se koristi kada se pozove neki view
  // u ovom slucaju 'home' view, i posto na home-stranici zelimo prikazati svaki 'note'
  // unutra pozivamo metodu getAllNotes() koja kako vec znamo poziva metodu istog imena iz servisa
  // vise o tome na linku :: https://ionicframework.com/docs/api/navigation/NavController/ --> lifeCycles
  ionViewWillEnter(){
    this.notes = this.getAllNotes();
  }

  // ova f-ja/metod poziva f-ju/metod istog imena iz naseg servisa
  addNote(){
    this.navCtrl.push(AddNotePage); 
    // stranice su stack : homePage je root, i nalazi se na dnu stacka. 
    // Push-om se sa home stranice, dna stacka, prebacujemo na drugu stranicu
    // koj time automatski postaje vrh stacka
  }

  // ova f-ja/metod poziva f-ju/metod istog imena iz naseg servisa
  getAllNotes(){
    return this.noteService.getAllNotes();
  }

  getNote(createdDate: number){
    return this.noteService.getNote(createdDate).then((n) => {
      this.note = n;
      // sada pomocu navCtrl-era proslijedjujemo sa Home stranice onaj note
      // na koji je korisnik kliknuo
      // pogledaj konstruktor u 'view-note.ts' -> koristi GET metodu :: this.note = this.navParams.get('note');
      this.navCtrl.push(ViewNotePage, { note: this.note }); 
    });
  
  }

}
