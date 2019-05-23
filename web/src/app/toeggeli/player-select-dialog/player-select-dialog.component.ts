import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectionList} from '@angular/material';

@Component({
  selector: 'app-select-player-dialog',
  templateUrl: './player-select-dialog.component.html',
  styleUrls: ['./player-select-dialog.component.scss']
})
export class PlayerSelectDialogComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<PlayerSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerSelectDialogData) {
  }

  ngOnInit() {
  }

  toggleSelect(selectToggle, playerSelection) {
    if (selectToggle.checked) {
      playerSelection.selectAll();
    } else if (!selectToggle.checked) {
      playerSelection.deselectAll();
    }
  }

  submitSelectedPlayers(playerSelection: MatSelectionList) {
    console.log(playerSelection.selectedOptions.selected);
  }
}

export interface PlayerSelectDialogData {
  side: string;
  players: { userID: string, username: string, firstName: string, lastName: string }[];
}
