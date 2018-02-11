import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewNotePage } from './view-note';

@NgModule({
  declarations: [
    ViewNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewNotePage),
  ],
})
export class ViewNotePageModule {}
