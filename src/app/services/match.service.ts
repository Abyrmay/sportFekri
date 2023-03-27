import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MatchService {
  //service BE address
  matchUrl: string = "http://localhost:3000/matches";
  constructor(private httpClient: HttpClient) {}

  //Request to add match
  addMatch(obj: any) {
    return this.httpClient.post<{ message: string }>(this.matchUrl, obj);
  }

  getAllMatches() {
    return this.httpClient.get<{ matches: any; message: string }>(
      this.matchUrl
    );
  }

  getMatchbyId(id: number) {
    return this.httpClient.get<{ findedMatch: any }>(`${this.matchUrl}/${id}`);
  }

  deleteMatchbyId(id: number) {
    return this.httpClient.delete<{message:string}>(`${this.matchUrl}/${id}`);
  }

  editMatch(newObj: any) {
    return this.httpClient.put<{message:string}>(this.matchUrl, newObj);
  }

  SearchMatches(obj: any) {
    return this.httpClient.post<{ message: string }>(
      this.matchUrl + "/search",
      obj
    );
  }
}
