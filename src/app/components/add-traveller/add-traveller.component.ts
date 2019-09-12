import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import  {requiredFileType} from '../../shared/Custom-Image.validator';
import { element } from 'protractor';
import { AddTravellerService } from './addTraveller.service';
import { LoginService } from '../login-signup/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-traveller',
  templateUrl: './add-traveller.component.html',
  styleUrls: ['./add-traveller.component.css']
})
export class AddTravellerComponent implements OnInit {

  // model: NgbDateStruct;

  dataSource = [{id:"Primary",dataToggle:"toogle1", dataToggleHash:"#toogle1"}];

  traveller_Id=[];
  id = "" ;
  dataToogle = "" ;
  dataToogleHash = "";
  count =1;


  public userFlowDetails :any;

  public imageUploads : any;

  public onlineCategory : boolean = false;


  // dotd;
  // docd;
  // dobd:any;
  // doed:any;

  constructor(private formBuilder : FormBuilder, private travellerService : AddTravellerService,
     private toastService : ToastService, private userFlow : UserFlowDetails, private loginService:LoginService,
     private http : HttpClient
      ) {
      // const now = new Date();
      // this.doed= {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
      // this.dobd = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
      // this.docd = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
      // this.dotd = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};


      }

  travellerForm: any;
  travellers: FormArray;
  filedNameArr = []
  travelDetails : FormGroup;
  valueAddedService : FormGroup;
  quoteId = "";
  basePrice :number = 0;
  serviceTax : number = 0;
  termsAndConditions : FormGroup;
  stayPeriod : string = "";
  minDate : any = '';

  country : string='';


  ngOnInit() {
    let data = this.userFlow.getUserFlowDetails();
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    
    

    this.quoteId = data.quoteId;
    console.log(data);
    this.country = data.country;
    this.basePrice = JSON.parse(data.basePrice);
    this.serviceTax = JSON.parse(data.basePrice);
    this.stayPeriod = data.stayPeriod;



    this.travelDetails = new FormGroup({
      dateOfTravel: new FormControl('',[Validators.required]),
      dateOfCollection : new FormControl('',[Validators.required])
   });


   this.termsAndConditions  = new FormGroup({
     tnc : new FormControl(false, [Validators.requiredTrue])
   })

   this.valueAddedService = new FormGroup({
    selectAll : new FormControl(true,[]),
    sim : new FormControl (true,[]),
    insurance : new FormControl(true,[]),
    forex: new FormControl(true,[])

   });


    this.userFlowDetails = this.userFlow.getUserFlowDetails();

    this.imageUploads = JSON.parse(this.userFlowDetails.imageUploads)
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
    
    let arr = (<FormArray>this.travellerForm.get('travellers')).controls;
    
    for (let i = 0; i < this.imageUploads.length; i++) {
      
      this.filedNameArr.push(this.imageUploads[i].fieldName);
    }
    // console.log(this.filedNameArr)
    // console.log((<FormGroup><undefined>(<FormArray>this.travellerForm.get('travellers')).controls[0]).controls[this.filedNameArr[3]])
    arr.forEach((element : FormGroup)  => {

      this.filedNameArr.forEach((fieldName )=> {
      
        if(element.controls[fieldName]) {
          element.controls[fieldName].setValidators([Validators.required,requiredFileType('png')]);
          // console.log(element.controls[fieldName]);
          element.controls[fieldName].updateValueAndValidity();

        }
      });

      element.updateValueAndValidity();
    });

    

    
  

  }

  selectAllFn () {
    // console.log('fn callled');

    let simValue  = this.valueAddedService.get('sim').value;
    let insuranceValue = this.valueAddedService.get('insurance').value;
    let forexValue = this.valueAddedService.get('forex').value;
    let selectAllValue = this.valueAddedService.get('selectAll').value;
    if( (!simValue || !forexValue || !insuranceValue) ) {
      this.valueAddedService.setValue({
        selectAll : true,
        sim : true,
        insurance : true,
        forex : true
        
      })
    }
    else {

      this.valueAddedService.setValue({
        selectAll : false,
        sim : false,
        insurance : false,
        forex : false
        
      })
    }


    this.valueAddedService.updateValueAndValidity();
  }



  createTraveller(): FormGroup {

    if(this.onlineCategory) {
          return this.formBuilder.group({
            title:['Mr',[Validators.required]],
            firstName: ['',[Validators.required]],
            middleName:[''],
            lastName:['',[Validators.required]],
            emailId:['',Validators.required],
            dateOfBirth:[null,[Validators.required]],
            passportNumber:['',[Validators.required]],
            passportExpiryDate:[null,[Validators.required]],
            gstNumber:'',
            cellNumber:['',[Validators.required]],
            
            passportFrontImage : [null],
            passportBioImage : [null],
            sixMonthsBankStatement : [null],
            insurance : [null],
            userImage : [null],
            departureFlightTicket : [null],
            arrivalFlightTicket : [null],
            hotelAccommodation : [null]
          });
    }

    else {
      return this.formBuilder.group({
        title:['Mr',[Validators.required]],
        firstName: ['',[Validators.required]],
        middleName:[''],
        lastName:['',[Validators.required]],
        emailId:['',Validators.required],
        dateOfBirth:["",[Validators.required]],
        passportNumber:['',[Validators.required]],
        passportExpiryDate:["",[Validators.required]],
        gstNumber:'',
        cellNumber:['',[Validators.required]],
        addressForPickupSame:[false,[Validators.required]],
        addressForPickup:['',[Validators.required]],
        state:['',[Validators.required]],
        city:['',[Validators.required]],
        pinCode : ['',[Validators.required]]
      
      });
    }
  }

  
  get formData (){
    return <FormArray>this.travellerForm.get('travellers') ; 
  }

  seeValues () {

    if (this.travellerForm.valid && this.termsAndConditions.valid 
      && this.travelDetails.valid && this.valueAddedService.valid) {

      

    let tempArr  = (<FormArray>this.travellerForm.get('travellers')).controls || [];

    tempArr.forEach((form:FormGroup,index) => {
      let dob:{year : number, month : number , day : number} = form.get('dateOfBirth').value;
      let doe :{year : number, month : number , day : number} = form.get('passportExpiryDate').value 
      let tempDob = dob.year+"-"+dob.month+"-"+dob.day;
      form.get('dateOfBirth').setValue(tempDob);
      form.get('dateOfBirth').updateValueAndValidity();
      let tempDoe = doe.year+"-"+doe.month+"-"+doe.day;
      form.get('passportExpiryDate').setValue(tempDoe);
      form.get('passportExpiryDate').updateValueAndValidity();
      
    });

    // console.log("Main Form valid "+this.travellerForm.valid);
    //   console.log(this.travellerForm.get('travellers').value);
    //   console.log("Travel Details Valid "+this.travelDetails.valid);
    //   console.log( this.travelDetails.value);

    //   console.log("Value Added Services Valid "+this.valueAddedService.valid);
    //   console.log(this.valueAddedService.value);

    //   console.log("Terms and Conditions Valid "+this.termsAndConditions.valid);
    //   console.log(this.termsAndConditions.value);



      const fd = {};

      let ptdata :any  = this.travellerForm.get('travellers').value || [];
    // ptdata['id']= this.dataSource[0].id;

    ptdata.forEach((element : {},index) => {
      element["id"] = this.dataSource[index].id;
    });
    
    const formData = new FormData();

      // fd['primaryTraveller']=ptdata[0];

      // fd['otherTravellers'] = ptdata.slice(1,ptdata.length);
      // fd['dateOfTravel'] = dot.year+"-"+dot.month+"-"+dot.day;
      // fd['dateOfDocumentCollection'] = doc.year+"-"+doc.month+"-"+doc.day;
      // fd['quoteId'] = this.quoteId;
      // fd['countryName'] = this.country;
      // fd['totalPayableAmount'] = (this.serviceTax+this.basePrice)*this.dataSource.length;
      
      let dot :{year : number, month : number , day : number} = this.travelDetails.get('dateOfTravel').value;
      let doc :{year : number, month : number , day : number} = this.travelDetails.get('dateOfCollection').value;
      
      let finalDot = "";
      let finalDoc = "";

      if (dot.month < 10) {
        finalDot =  dot.year+"-0"+dot.month+"-"+dot.day;
      }
      else {
        finalDot =  dot.year+"-"+dot.month+"-"+dot.day;
      }


      if(doc.month < 10) {
        finalDoc =  doc.year+"-0"+doc.month+"-"+doc.day;
      }
      else {
        finalDoc =  doc.year+"-"+doc.month+"-"+doc.day;
      }

      formData.append('primaryTraveller',ptdata[0]);
      formData.append('otherTravellers', ptdata.slice(1,ptdata.length));
      formData.append('dateOfTravel',finalDot);
      formData.append('dateOfDocumentCollection',finalDoc);
      formData.append('country',this.country);
      formData.append('quoteId',this.quoteId);

      let totalTraveller = this.dataSource.length || 1;

      formData.append('totalPayableAmount',""+(this.serviceTax+this.basePrice)*totalTraveller);

      formData.append('gstNumber',ptdata[0].gstNumber);
      formData.append('needSim',this.valueAddedService.get('sim').value);
      formData.append('needForexCard',this.valueAddedService.get('forex').value);
      formData.append('needInsurance',this.valueAddedService.get('insurance').value);
      formData.append('agreedToTcAndCancellationPolicy',this.termsAndConditions.get('tnc').value);
      // fd['gstNumber'] = ptdata[0].gstNumber;
      // fd['needSim'] = this.valueAddedService.get('sim').value;
      // fd['needForexCard'] = this.valueAddedService.get('forex').value;
      // fd['needInsurance'] = this.valueAddedService.get('insurance').value;
      // fd['agreedToTcAndCancellationPolicy'] = this.termsAndConditions.get('tnc').value;


      console.log(formData);

    this.travellerService.submitForm(formData).subscribe(
      (data:any) => {
        console.log(data);

        if(data.code == "0") {
          let AUTH_TOKEN = this.loginService.getAuthToken();
          let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});
          this.http.post("https://staging2.visa2fly.com/payment/process",{},{headers:headers}).subscribe(); 
        }
      }
    )

      // console.log(fd);

  }

     
    // });
  }

  removeTraveller (index:number) {
    let temp = this.travellerForm.get('travellers') as FormArray;
    temp.removeAt(index);
    this.dataSource.splice(index,1);
    this.count = this.count -1;
    
  }

  selectedFile = null;

  onFileSelected (event, index, controlName) {



    let typeErr = false;
    let sizeErr = false;

    this.selectedFile = event.target.files[0];

    let control = (<FormGroup><unknown>(<FormArray>this.travellerForm.get('travellers')).controls[index]).controls[controlName];

    control.markAsDirty();
    control.markAllAsTouched();
    


    console.log(this.selectedFile);

    

    control.setValue(this.selectedFile);
    // console.log(control.value.name);

  }

  onUpload () {

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
      let arr = (<FormArray>this.travellerForm.get('travellers')).controls;
    
      // for (let i = 0; i < this.imageUploads.length; i++) {
        
      //   this.filedNameArr.push(this.imageUploads[i].fieldName);
      // }
      let tempVar = this.travellerForm
      .get('travellers') as FormArray;
      arr.forEach((element : FormGroup,i)  => {
  
        if (i ==  arr.length-1) {

          this.filedNameArr.forEach((fieldName )=> {
          
            if(element.controls[fieldName]) {
              element.controls[fieldName].setValidators([Validators.required,requiredFileType('png')]);
              // console.log(element.controls[fieldName]);
              element.controls[fieldName].updateValueAndValidity();
    
            }
          });
    
          element.updateValueAndValidity();
        }

      });
      }
      else {
        this.toastService.showNotification(
          "Maximum Travellers Limit of 10 reached !",6000
          )
      }

  }

}
