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
  requestImageArr = [];
   formData1 = new FormData();


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
    console.log(this.filedNameArr);

    // if (this.travellerForm.valid && this.termsAndConditions.valid 
    //   && this.travelDetails.valid && this.valueAddedService.valid) {
      
      
    
    let otherTravellersArr : Array<any> = [];
    const fd = {};

    let tempArr  = (<FormArray>this.travellerForm.get('travellers')).controls || [];
    


    tempArr.forEach((form:FormGroup,index) => {

      // let tempFormData = new FormData();

      this.filedNameArr.forEach( el => {
        this.formData1.append("images",form.get(el).value);
        form.get(el).setValue(form.get(el).value.name);
      })

      // tempFormData.append("id",this.dataSource[index].id);
      // tempFormData.append("emailId",form.get('emailId').value);
      // tempFormData.append("firstName",form.get('firstName').value);
      // tempFormData.append("middleName",form.get('middleName').value);
      // tempFormData.append("lastName",form.get('lastName').value);
      // tempFormData.append("cellNumber",form.get('cellNumber').value);
      // tempFormData.append("title",form.get('title').value);
      // tempFormData.append("passportNumber",form.get('passportNumber').value);
      let dob:{year : number, month : number , day : number} = form.get('dateOfBirth').value;
      let doe :{year : number, month : number , day : number} = form.get('passportExpiryDate').value 
      let tempDob ="";
      let tempDoe = "";
      
      if (dob.month < 10) {
        tempDob =  dob.year+"-0"+dob.month+"-"+dob.day;
      }
      else {
        tempDob =  dob.year+"-"+dob.month+"-"+dob.day;
      }
      if (doe.month < 10) {
        tempDoe =  doe.year+"-0"+doe.month+"-"+doe.day;
      }
      else {
        tempDoe =  doe.year+"-"+doe.month+"-"+doe.day;
      }
      
      form.get('dateOfBirth').setValue(tempDob);
      form.get('passportExpiryDate').setValue(tempDoe);
      // tempFormData.append("passportExpiryDate",tempDoe);
      // tempFormData.append("dateOfBirth",tempDob);
      // tempFormData.append("passportFrontImage",form.get("passportFrontImage").value);
      // tempFormData.append("passportBioImage",form.get("passportBioImage").value);
      // tempFormData.append("sixMonthsBankStatement",form.get("sixMonthsBankStatement").value);
      // tempFormData.append("insurance",form.get('insurance').value);
      // tempFormData.append("userImage",form.get('userImage').value);
      // tempFormData.append("departureFlightTicket",form.get("departureFlightTicket").value);
      // tempFormData.append("arrivalFlightTicket",form.get("arrivalFlightTicket").value);
      // tempFormData.append("hotelAccommodation",form.get("hotelAccommodation").value);
      
      
      
      // if(index == 0) {


        
        // formData.append('primaryTraveller',JSON.stringify(tempFormData));
        // fd['primaryTraveller'] = tempFormData;
        // fd['gstNumber'] = form.get("gstNumber").value;
        
        // tempFormData.forEach(
        //   (value) => {
        //     console.log(value);
        //   }
        // )


        // formData.append('gstNumber',form.get('gstNumber').value);
      // }
      // else {
      //   otherTravellersArr.push(tempFormData);
      // }

      // form.get('dateOfBirth').updateValueAndValidity();
      // form.get('passportExpiryDate').updateValueAndValidity();
      
    });
    
    // console.log("Main Form valid "+this.travellerForm.valid);
    //   console.log(this.travellerForm.get('travellers').value);
    //   console.log("Travel Details Valid "+this.travelDetails.valid);
    //   console.log( this.travelDetails.value);

    //   console.log("Value Added Services Valid "+this.valueAddedService.valid);
    //   console.log(this.valueAddedService.value);
    
    //   console.log("Terms and Conditions Valid "+this.termsAndConditions.valid);
    //   console.log(this.termsAndCondpreviosunameitions.value);
    
    
    
    
    let ptdata :any  = this.travellerForm.get('travellers').value || [];
    ptdata['id']= this.dataSource[0].id;
    // console.log("hell world");
    ptdata.forEach((element : {},index) => {
      element["id"] = this.dataSource[index].id;
      // console.log(element);
      }); 

      console.log(ptdata[0]);
      // console.log(tempArr);
      

      
      
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
      
      let other = ptdata.slice(1,ptdata.length) || [];
      
      // this.formData1.append('primaryTraveller',ptdata[0]);
      // this.formData1.append('otherTravellers',other);
      // this.formData1.append('dateOfTravel',finalDot);
      // this.formData1.append('dateOfDocumentCollection',finalDoc);
      // this.formData1.append('country',this.country);
      // this.formData1.append('quoteId',this.quoteId);
      // this.formData1.append("images",""+this.requestImageArr);
      
      fd['primaryTraveller']=ptdata[0];
      fd['otherTravellers'] = other;
      fd['dateOfTravel'] = finalDot;
      fd['dateOfDocumentCollection'] = finalDoc;
      fd['quoteId'] = this.quoteId;
      fd['countryName'] = this.country;
      let totalTraveller = this.dataSource.length || 1;
      fd['totalPayableAmount'] = (this.serviceTax+this.basePrice)*totalTraveller;
      

      // this.formData1.append('totalPayableAmount',""+(this.serviceTax+this.basePrice)*totalTraveller);
      
      // this.formData1.append('needSim',this.valueAddedService.get('sim').value);
      // this.formData1.append('needForexCard',this.valueAddedService.get('forex').value);
      // this.formData1.append('needInsurance',this.valueAddedService.get('insurance').value);
      // this.formData1.append('agreedToTcAndCancellationPolicy',this.termsAndConditions.get('tnc').value);
      fd['needSim'] = this.valueAddedService.get('sim').value;
      fd['needForexCard'] = this.valueAddedService.get('forex').value;
      fd['needInsurance'] = this.valueAddedService.get('insurance').value;
      fd['agreedToTcAndCancellationPolicy'] = this.termsAndConditions.get('tnc').value;

      this.formData1.set("data",JSON.stringify(fd));
      
      


      

    this.travellerService.submitForm(this.formData1).subscribe(
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

  // }

     
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
    // this.requestImageArr.push(this.selectedFile);
    // let fileReader = new FileReader();

    // fileReader.onload = (e) => {
    //   console.log(fileReader.result);
    // }
    
    // fileReader.readAsBinaryString(this.selectedFile);
    // control.setValue(a);
    
    let control = (<FormGroup><unknown>(<FormArray>this.travellerForm.get('travellers')).controls[index]).controls[controlName];
    control.setValue(this.selectedFile);
    

    // control.setValue(control.value.name);
    control.markAsDirty();
    control.markAllAsTouched();


    console.log(control.value);
    


    console.log(this.selectedFile);

    
    


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
