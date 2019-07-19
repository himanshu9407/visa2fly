import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-traveller',
  templateUrl: './add-traveller.component.html',
  styleUrls: ['./add-traveller.component.css']
})
export class AddTravellerComponent implements OnInit {
  dataSource = [{id:"Traveller 1",dataToggle:"toogle1", dataToggleHash:"#toogle1"}]; 
  // obj = {id:"",dataToggle:"",dataToggleHash:""};

  traveller_Id=[];
  id = "" ;
  dataToogle = "" ;
  dataToogleHash = "";
  count =1;

 

  constructor() { }

  ngOnInit() {
    
  }
 
 
  onAddData() {
    if(this.count<=9){

      console.log(this.count);
    this.count = this.count+1;
     let  temp = {id:"",dataToggle:"",dataToggleHash:""};
    temp.id = "Traveller "+this.count; 
    temp.dataToggle = "toogle"+this.count;
    temp.dataToggleHash = "#toogle"+this.count;
    this.dataSource.push(temp)
    console.log(this.dataSource) ;
    }
  }
}
