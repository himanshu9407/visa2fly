

export class RequirementsModel {
    code :string;
    message : string;
    status : string;
    data : {
        imagesRequired:[], 
        imageUploads:[],       
        active : boolean,
        cancelationPeriod : number,
        country : string,
        createdAt : any,
        fieldDetails : [{fieldName : string,display : boolean,content:string}],
        minAccountBalanceMaintainbilityPeriod : string,
        minAccountBalanceRquired : string,
        onlineCategory : boolean,
        passportValidityPeriod : string,
        quotes : [
            {purpose : string,entryType:string,periodTime:string,
                currency:string,price:number,processingTime : string, validity: string}
        ],
        updatedAt : any


    }
}