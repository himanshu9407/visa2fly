export interface visaForm {
    code: string,
    status: string,
    message: string,
    data: visaFormData
}

export interface visaFormData {
    countries: Array<string>;
    data: any;
}