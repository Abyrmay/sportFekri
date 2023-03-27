import { Component, OnInit } from "@angular/core";
import { MatchService } from "src/app/services/match.service";

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"],
})
export class MatchesComponent implements OnInit {
  matchesTab: any = [];

  addMatch: string = "Matches";

  actualDate: any = new Date();
  constructor(private matchService: MatchService) {}

  ngOnInit() {
    //this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
    this.matchService.getAllMatches().subscribe((response) => {
      console.log('here response',response);
      
      this.matchesTab = response.matches;
    });
  }
  // parent.ts
  updateMatches(objs: any) {
    this.matchesTab = objs;
  }
}
