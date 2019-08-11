export class LoginResponseModel {
    code : string;
    status : string;
    message : string;
    data: {
        profile: {
        emailId: string,
        cellNumber: string,
        code: string,
        pinCode: string,
        country: string,
        sex: string,
        active: string
        },
        authentication: {
        firstName: string,
        lastName: string,
        token: string
        }
    }
}