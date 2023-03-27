import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
articleTab:any =[
  {title:"Romolu to stay at Real Nadrid?" , date:"May 20, 2020",descp:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem." ,img:"assets/images/img_1.jpg"} , 
{title:"Romolu to stay at Real Nadrid?" , date:"May 20, 2020",descp:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.",img:"assets/images/img_2.jpg"},
{title:"Romolu to stay at Real Nadrid?" , date:"May 20, 2020",descp:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.",img:"assets/images/img_3.jpg"}]
constructor() { }

  ngOnInit() {
  }

}
