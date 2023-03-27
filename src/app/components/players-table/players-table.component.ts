import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  playersTab:any=[
    
  ] ;


  constructor(private router: Router , 
    private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayer().subscribe(
      (response) => {
        this.playersTab=response.players
      }
    )
  }
  displayPlayers(x: number) {
    this.router.navigate([`matchInfo/${x}`]);
  }
  
  editPlayers(x: number) {
    this.router.navigate([`editMatch/${x}`]);
    
    
  }

 // deletePlayers(x: number) {
   // this.playerService.deletePlayerbyId(x).subscribe(
    //  (response)=> {
     //   console.log("Here response after delete", response.message);
     //   this.playerService.getPlayer().subscribe(
       //   (response)=>{
         //   this.players=response.players;
       //   }
       // );
     // }
   // );



//}
}
