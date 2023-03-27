import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatchService } from "src/app/services/match.service";

@Component({
  selector: "app-matches-table",
  templateUrl: "./matches-table.component.html",
  styleUrls: ["./matches-table.component.css"],
})
export class MatchesTableComponent implements OnInit {
  matches: any = [];
  constructor(private router: Router , 
    private matchService: MatchService) 
     {}

  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (response)=>{
        this.matches=response.matches;
      }
    );
  }

  displayMatches(x: number) {
    this.router.navigate([`matchInfo/${x}`]);
  }
  
  editMatch(x: number) {
    this.router.navigate([`editMatch/${x}`]);
    
    
  }

  deleteMatches(x: number) {
    this.matchService.deleteMatchbyId(x).subscribe(
      (response)=> {
        console.log("Here response after delete", response.message);
        this.matchService.getAllMatches().subscribe(
          (response)=>{
            this.matches=response.matches;
          }
        );
      }
    );



}
}