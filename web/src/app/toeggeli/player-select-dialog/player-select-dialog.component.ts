import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSelectionList} from '@angular/material/list';

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

  private static getRandomItemsFromArray(array: any[], count: number): any[] {
    const cArray = [...array];
    const items = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor((Math.random() * cArray.length));
      items.push(cArray[randomIndex]);
      cArray.splice(cArray.indexOf(cArray[randomIndex]), 1);
    }

    return items;
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
        selectedPlayers.push({userID: option.value.id, side: this.data.side, username: option.value.username});
      });
      this.matDialogRef.close(selectedPlayers);
    }
  }

  submitSelectPlayersRandomly(playerSelection: MatSelectionList) {
    if (this.isSubmitSelectPlayersRandomlyAllowed(playerSelection)) {
      if (this.data.side) {
        const selectedPlayers = [];
        playerSelection.selectedOptions.selected.forEach(option => {
          selectedPlayers.push({userID: option.value.id, side: this.data.side, username: option.value.username});
        });
        this.matDialogRef.close(PlayerSelectDialogComponent.getRandomItemsFromArray(selectedPlayers, 2));
      } else {
        const selectedPlayers = [];
        playerSelection.selectedOptions.selected.forEach(option => {
          selectedPlayers.push({userID: option.value.id, side: '', username: option.value.username});
        });
        const randomPlayers = PlayerSelectDialogComponent.getRandomItemsFromArray(selectedPlayers, 4);
        randomPlayers[0].side = 'blue';
        randomPlayers[1].side = 'blue';
        randomPlayers[2].side = 'red';
        randomPlayers[3].side = 'red';
        this.matDialogRef.close(randomPlayers);
      }
    }
  }

  isSubmitSelectedPlayersAllowed(playerSelection: MatSelectionList): boolean {
    return playerSelection.selectedOptions.selected.length === 2 && this.data.side !== null;
  }

  isSubmitSelectPlayersRandomlyAllowed(playerSelection: MatSelectionList): boolean {
    if (this.data.side) {
      return playerSelection.selectedOptions.selected.length > 2;
    } else {
      return playerSelection.selectedOptions.selected.length >= 4;
    }
  }

  isAlreadySelected(player): boolean {
    const s = this.data.selected.find(selectedPlayer => selectedPlayer.id === player.id);
    return s != null;
  }
}

export interface PlayerSelectDialogData {
  side?: string;
  players: { id: string, username: string, firstName: string, lastName: string }[];
  selected: { id: string, username: string, firstName: string, lastName: string }[];
}
