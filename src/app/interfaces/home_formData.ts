export interface home_formData {
    code:    string;
    status:  string;
    message: string;
    data:    country[];
}

export interface country {
    countryName: string;
    purpose:     string[];
    entryType:   string[];
    residenceOf: string[];
}

export interface feedbackModal {
    bookingId : string;
    product : string;
    info  : string;
    recommend : string;
    userFeedback  :string;
}
