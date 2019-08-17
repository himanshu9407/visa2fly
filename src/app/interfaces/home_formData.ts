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
