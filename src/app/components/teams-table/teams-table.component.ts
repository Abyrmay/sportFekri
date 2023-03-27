import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  
 teams:any=[];
  constructor(private router: Router ,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (response)=>{
        this.teams=response.teams; //teams 1 mel service teams 2 mel ts el Tab
      }
    );
  }
  deleteTeamById(x){
this.teamService.deleteTeamById(x).subscribe(
  (response)=>{
    console.log(response.message);
    this.teamService.getAllTeams().subscribe(
      (response)=>{
        this.teams=response.teams; //teams 1 mel service teams 2 mel ts el Tab
      }
    );
    

  
  }
);
  }

  getTeambyId(x){
    this.router.navigate([`TeamInfo/${x}`]);

  }
}
