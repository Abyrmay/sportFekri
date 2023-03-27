import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  teamUrl: string = "http://localhost:3000/teams"; // /teams howa el path //http://localhost:3000/ url de base

  constructor(private httpClient: HttpClient) {}

  addTeam(teamObj: any) {
    return this.httpClient.post<{message:string}>(this.teamUrl, teamObj);
  }



  getAllTeams() {
    return this.httpClient.get<{ teams: any; message: string }>(
      this.teamUrl
    );
  }


  deleteTeamById(id){
return this.httpClient.delete<{message:string}>(`${this.teamUrl}/${id}`)
  }

  getTeambyId(id: number) {
    return this.httpClient.get<{ findedTeam: any }>(`${this.teamUrl}/${id}`);
  }
}
