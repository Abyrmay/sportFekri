import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private teamService: TeamService) { }
team: any = {};
    id: any;
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.teamService.getTeambyId(this.id).subscribe((data) => {
      this.team = data.findedTeam;
    });
  }

}
