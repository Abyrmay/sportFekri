import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PlayerService } from "src/app/services/player.service";

@Component({
  selector: "app-add-player",
  templateUrl: "./add-player.component.html",
  styleUrls: ["./add-player.component.css"],
})
export class AddPlayerComponent implements OnInit {
  playerForm: FormGroup;

  player: any = {};

  constructor(private router: Router, private matchService: PlayerService) {}

  ngOnInit() {}
  addPlayer() {
    alert("Btn clicked");
    console.log("L'objet match", this.player);
    console.log(this.player);
    this.matchService.addPlayer(this.player).subscribe((response) => {
      //arrow function
      console.log(response);
      this.router.navigate(["allMatches"]);
    });
  }
}
