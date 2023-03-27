import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl:string='http://localhost:3000/players'

  constructor(private httpClient: HttpClient) { }


    //Request to add user
    addPlayer(obj:any){
      return this.httpClient.post<{ message: string }>(this.playerUrl+"/add",obj);
    }
  
  
    getPlayer(){
  return this.httpClient.get<{players: any}>(this.playerUrl+"/get");
    }
  
    getPlayerbyId(id:number){
      return this.httpClient.get<{findedPlayer: any}>(`${this.playerUrl}/${id}`) ;
  }
  
  deletePlayerbyId(id:number)
  {
    return this.httpClient.delete<{message:string}>(`${this.playerUrl}/${id}`) ;
  }
  
  
  editPlayer(newObj:any){
  return this.httpClient.put(this.playerUrl+"/edit",newObj);
  }
  
}
