import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, FormControl } from '@angular/forms';

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

  travellerForm : FormGroup;
  form : FormBuilder;
  travellerFormGroup : any;
  ngOnInit() {

    // this.travellerForm
    this.travellerForm = this.form.group({
      travellers : this.form.array([this.addTravellerFormGroup()])
    });

    console.log(this.travellerForm);

  }

  addTravellerFormGroup(): FormGroup {

    return this.form.group({

    });
  }


  onAddData() {
    if(this.count<=9){
    this.count = this.count+1;
    let  temp = {id:"",dataToggle:"",dataToggleHash:""};
    temp.id = "Traveller "+this.count;
    temp.dataToggle = "toogle"+this.count;
    temp.dataToggleHash = "#toogle"+this.count;
    this.dataSource.push(temp)
    }
  }
}
