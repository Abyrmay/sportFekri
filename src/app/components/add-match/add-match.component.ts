import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatchService } from "src/app/services/match.service";
import { generateId } from "src/app/shared/genericFunctions";

@Component({
  selector: "app-add-match",
  templateUrl: "./add-match.component.html",
  styleUrls: ["./add-match.component.css"],
})
export class AddMatchComponent implements OnInit {
  //Form ID
  matchForm: FormGroup;

  //Objet
  match: any = {};
  constructor(private router: Router, private matchService: MatchService) {}

  ngOnInit() {}
  addMatch() {
    console.log(this.match);
    this.matchService.addMatch(this.match).subscribe((response) => {
      //arrow function
      console.log(response);
      this.router.navigate(["allMatches"]);
    });
  }
}
