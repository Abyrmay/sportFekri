import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
@Input() x:any ;
@Output() newMatches:EventEmitter<any> = new EventEmitter();
matches: any = [];

  constructor() { }

  ngOnInit() {

  }
  Delete(x: number) {
    
   //GET OBJECTS FROM LS
  let matches = JSON.parse(localStorage.getItem("matches") || "[]");

    for (let index = 0; index < matches.length; index++) {
     if (matches[index].id==x) {
     matches.splice(index, 1);   
     this.newMatches.emit(matches);

     break;   
   }  
 }
 localStorage.setItem("matches",JSON.stringify(matches));

}


 




}
