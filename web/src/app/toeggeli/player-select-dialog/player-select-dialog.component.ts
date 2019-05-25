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

  toggleSelect(selectToggle, playerSelection: MatSelectionList) {
    if (selectToggle.checked) {
      playerSelection.selectAll();
    } else if (!selectToggle.checked) {
      playerSelection.deselectAll();
    }
  }

  submitSelectedPlayers(playerSelection: MatSelectionList) {
    if (this.isSubmitSelectedPlayersAllowed(playerSelection)) {
      const selectedPlayers = [];
      playerSelection.selectedOptions.selected.forEach(option => {
        console.log(option);
        selectedPlayers.push({userID: option.value.userID, side: this.data.side});
      });
      this.matDialogRef.close(selectedPlayers);
    }
  }

  submitSelectPlayersRandomly(playerSelection: MatSelectionList) {
    if (this.isSubmitSelectPlayersRandomlyAllowed(playerSelection)) {
      const selectedPlayers = [];
      playerSelection.selectedOptions.selected.forEach(option => {
        console.log(option);
        selectedPlayers.push({userID: option.value.userID, side: this.data.side});
      });

      this.matDialogRef.close(this.getRandomItemsFromArray(selectedPlayers, 2));
    }
  }

  isSubmitSelectedPlayersAllowed(playerSelection: MatSelectionList): boolean {
    return playerSelection.selectedOptions.selected.length === 2 && this.data.side !== null;
  }

  isSubmitSelectPlayersRandomlyAllowed(playerSelection: MatSelectionList): boolean {
    return playerSelection.selectedOptions.selected.length > 2;
  }

  private getRandomItemsFromArray(array: any[], count: number): any[] {
    const cArray = [...array];
    const items = [];
    for (let i = 0; i < count; i++) {
      console.log(i);
      const randomIndex = Math.floor((Math.random() * cArray.length));
      items.push(cArray[randomIndex]);
      cArray.splice(cArray.indexOf(cArray[randomIndex]), 1);
    }

    return items;
  }
}

export interface PlayerSelectDialogData {
  side: string;
  players: { userID: string, username: string, firstName: string, lastName: string }[];
}
