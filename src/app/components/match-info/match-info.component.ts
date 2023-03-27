import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatchService } from "src/app/services/match.service";

@Component({
  selector: "app-match-info",
  templateUrl: "./match-info.component.html",
  styleUrls: ["./match-info.component.css"],
})
export class MatchInfoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService
  ) {}
  match: any = {};

  id: any;
  ngOnInit() {
    //get all matches
    // this.matches=JSON.parse(localStorage.getItem("matches") || "[]");

    //GET ID value from Actif path
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    //search object by id
    //for (let index = 0; index < this.matches.length; index++) {
    //if (this.matches[index].id == this.id) {
    // this.match = this.matches[index];
    //break;
    //}
    this.matchService.getMatchbyId(this.id).subscribe((data) => {
      this.match = data.findedMatch;
    });
  }
}
