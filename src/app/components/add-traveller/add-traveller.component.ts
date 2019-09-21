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
  public paymentForm: any = {};
  buyerEmail = "";
  orderId = "";
  amount = "";
  currency = "";
  merchantIdentifier = "";
  returnUrl = "";
  checksum = "";
  primaryAddress = "";



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
        // this.paymentForm.paymentUrl = "https://www.google.com"
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
    // console.log(data);
    this.country = data.country;
    this.basePrice = JSON.parse(data.basePrice);
    this.serviceTax = JSON.parse(data.serviceTax);

    console.log(this.basePrice);
    console.log(this.serviceTax);
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

    this.imageUploads = JSON.parse(this.userFlowDetails.imageUploads);

    if(this.imageUploads == "null") {
      this.imageUploads = []
    }

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
        address:['',[Validators.required]],
        state:['State',[Validators.required]],
        city:['City',[Validators.required]],
        pinCode : ['',[Validators.required]]
      
      });
    }
  }

  
  get formData (){
    return <FormArray>this.travellerForm.get('travellers') ; 
  }

  seeValues () {
    console.log(this.filedNameArr);
    this.formData1.set("images","");

    // if (this.travellerForm.valid && this.termsAndConditions.valid 
    //   && this.travelDetails.valid && this.valueAddedService.valid) {
      
      
    
    let otherTravellersArr : Array<any> = [];
    const fd = {};

    let tempArr  = (<FormArray>this.travellerForm.get('travellers')).controls || [];
    
    


    tempArr.forEach((form:FormGroup,index) => {


      if (this.onlineCategory) {

        this.filedNameArr.forEach( el => {
          this.formData1.append("images",form.get(el).value);
          form.get(el).setValue(form.get(el).value.name);
        })
      }

      else {
        // console.log("inside other travellers")
        let same = form.get('addressForPickupSame').value;
        
        if (same) {
          form.get('address').setValue(this.primaryAddress);
          form.updateValueAndValidity();
        }
      }

      let dob:{year : number, month : number , day : number} = form.get('dateOfBirth').value;
      let doe :{year : number, month : number , day : number} = form.get('passportExpiryDate').value 
      let tempDob ="";
      let tempDoe = "";
      
      if (dob.month < 10 && dob.day < 10) {
        tempDob =  dob.year+"-0"+dob.month+"-0"+dob.day;
      }
      else if (dob.day < 10) {
        tempDob =  dob.year+"-"+dob.month+"-0"+dob.day;
      }
      else if (dob.month < 10)  {
        tempDob =  dob.year+"-0"+dob.month+"-"+dob.day;
      }
      else {
        tempDob =  dob.year+"-"+dob.month+"-"+dob.day;
      }
      if (doe.month < 10 && doe.day < 10) {
        tempDoe =  doe.year+"-0"+doe.month+"-0"+doe.day;
      }
      else if (doe.day < 10) {
        tempDoe =  doe.year+"-"+doe.month+"-0"+doe.day;
      }
      else if (doe.month < 10)  {
        tempDoe =  doe.year+"-0"+doe.month+"-"+doe.day;
      }
      else {
        tempDoe =  doe.year+"-"+doe.month+"-"+doe.day;
      }
      
      form.get('dateOfBirth').setValue(tempDob);
      form.get('passportExpiryDate').setValue(tempDoe);
   
      
    });

    
    
    
    
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

      if (dot.month < 10 && dot.day < 10) {
        finalDot =  dot.year+"-0"+dot.month+"-0"+dot.day;
      }
      else if (dot.day < 10) {
        finalDot =  dot.year+"-"+dot.month+"-0"+dot.day;
      }
      else if (dot.month < 10)  {
        finalDot =  dot.year+"-0"+dot.month+"-"+dot.day;
      }
      else {
        finalDot =  dot.year+"-"+dot.month+"-"+dot.day;
      }

        if (doc.month < 10 && doc.day < 10) {
          finalDoc =  doc.year+"-0"+doc.month+"-0"+doc.day;
      }
      else if (doc.day < 10) {
        finalDoc =  doc.year+"-"+doc.month+"-0"+doc.day;
      }
      else if (doc.month < 10)  {
        finalDoc =  doc.year+"-0"+doc.month+"-"+doc.day;
      }
      else {
        finalDoc =  doc.year+"-"+doc.month+"-"+doc.day;
      }
      
     
      
      
      
      let other = ptdata.slice(1,ptdata.length) || [];
      
      
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
      

      let tempData  = (<FormArray>this.travellerForm.get('travellers')).controls|| [];

      
      console.log(tempData.values());
      

    this.travellerService.submitForm(this.formData1).subscribe(
      (data:any) => {
        console.log(data);

        if(data.code == "0") {

          this.travellerService.hitPaymentApi().subscribe(
            (data1 : any) => {
              console.log(data1);
              this.buyerEmail = data1.buyerEmail;
              this.orderId = data1.orderId;
              this.amount = data1.amount;
              this.currency = data1.currency;
              this.merchantIdentifier = data1.merchantIdentifier;
              this.returnUrl = data1.returnUrl;
              this.checksum = data1.checksum;
              // this.paymentUrl = data1.paymentUrl;

              console.log(document.forms["paymentForm"]);

              console.log(this.paymentForm);
              setTimeout(() => {
                
                document.forms["paymentForm"].submit();
              }, 2000);


            }
          ); 
        }

        else if (data.code == "1000") {

        }
        else if (data.code == "1001") {

        }
        else {
          tempArr.forEach((form:FormGroup,index) => {

            // let tempFormData = new FormData();
      
            if (this.onlineCategory) {
      
              this.filedNameArr.forEach( el => {
                // this.formData1.append("images",form.get(el).value);
                form.get(el).setValue("");
              })
            }
            })
        }
      }
    )

      // console.log(fd);

  // }

     
    // });
  }

  callMe () {
    // console.log("hellow orld");

  }

  removeTraveller (index:number) {
    let temp = this.travellerForm.get('travellers') as FormArray;
    temp.removeAt(index);
    this.dataSource.splice(index,1);
    this.count = this.count -1;
    
  }

  selectedFile = null;

  check() {
  }
  
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


      if(this.onlineCategory) {
        
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
      }
      else {
        this.toastService.showNotification(
          "Maximum Travellers Limit of 10 reached !",6000
          )
      }

  }

}
