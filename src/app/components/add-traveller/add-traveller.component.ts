import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Component({
  selector: 'app-add-traveller',
  templateUrl: './add-traveller.component.html',
  styleUrls: ['./add-traveller.component.css']
})
export class AddTravellerComponent implements OnInit {
  model: NgbDateStruct;

  dataSource = [{id:"Traveller 1",dataToggle:"toogle1", dataToggleHash:"#toogle1"}];
  // obj = {id:"",dataToggle:"",dataToggleHash:""};

  traveller_Id=[];
  id = "" ;
  dataToogle = "" ;
  dataToogleHash = "";
  count =1;

  public userFlowDetails :any;

  public onlineCategory : boolean =false;

  constructor(private formBuilder : FormBuilder,
     private toastService : ToastService, private userFlow : UserFlowDetails ) { }

  travellerForm: FormGroup;
  travellers:FormArray;

  ngOnInit() {
    this.userFlowDetails = this.userFlow.getUserFlowDetails();
    console.log(this.userFlowDetails);

    if (this.userFlowDetails.onlineCountry == "true") {
      this.onlineCategory = true;
    }
    else {
      this.onlineCategory = false;
    }

    this.travellerForm = this.formBuilder.group({
      travellers: this.formBuilder
      .array([ this.createTraveller() ])
    });

    console.log(this.dataSource[0].dataToggle);
  }



  createTraveller(): FormGroup {
    return this.formBuilder.group({
      title:['Mr',[Validators.required]],
      firstName: ['',[Validators.required]],
      middleName:[''],
      lastName:['',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      passportNumber:['',[Validators.required]],
      passportExpiryDate:['',[Validators.required]],
      gstNumber:'',
      cellNumber:['',[Validators.required]],
      addressForPickupSame:[false,[Validators.required]],
      addressForPickup:['',[Validators.required]],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
      pinCode : ['',[Validators.required,Validators.maxLength(6), Validators.minLength(6)]]
    });
  }

  
  get formData (){
    return <FormArray>this.travellerForm.get('travellers'); 
  }

  addTraveller(): void {
    
    if(this.count<=9){

      this.count = this.count+1;
      let  temp = {id:"",dataToggle:"",dataToggleHash:""};
      temp.id = "Traveller "+this.count;
      temp.dataToggle = "toogle"+this.count;
      temp.dataToggleHash = "#toogle"+this.count;
      this.dataSource.push(temp)

      this.travellers = this.travellerForm
      .get('travellers') as FormArray;
      this.travellers.push(this.createTraveller());
      }
      else {
        this.toastService.showNotification(
          "Maximum Travellers Limit of 10 reached !",6000
          )
      }

      console.log(this.travellerForm.valid);
  }

  // onAddData() {
  //   if(this.count<=9){
  //   this.count = this.count+1;
  //   let  temp = {id:"",dataToggle:"",dataToggleHash:""};
  //   temp.id = "Traveller "+this.count;
  //   temp.dataToggle = "toogle"+this.count;
  //   temp.dataToggleHash = "#toogle"+this.count;
  //   this.dataSource.push(temp)
  //   }
  // }
}
