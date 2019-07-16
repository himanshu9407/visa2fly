import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-traveller',
  templateUrl: './add-traveller.component.html',
  styleUrls: ['./add-traveller.component.css']
})
export class AddTravellerComponent implements OnInit {
  dataSource = []; 
  traveller_Id=[]
  count =1;
  id:String;
  card:String;
  dataToggle:String;
  TravellerId:String
  I:number=0;
  j:number=0;
  constructor() { }

  ngOnInit() {
    
  }
 
 
  onAddData() {
    if(this.count<9){
    this.count++;
    this.TravellerId="Traveller "+this.count;
    this.dataToggle="DataToggle-"+this.count;
    this.card="CHear"+this.count;
    this.dataSource.push(this.count);  
    this.traveller_Id.push(this.TravellerId);
    this.I++;
    this.j++;
    console.log(this.traveller_Id) ; 
    }
  }
}
