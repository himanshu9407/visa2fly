
export interface requirementData {
    code:    string;
    status:  string;
    message: string;
    data:    Data;
}

export interface Data {
    country:                               string;
    passportValidityPeriod:                string;
    minAccountBalanceRquired:              string;
    minAccountBalanceMaintainbilityPeriod: string;
    quotes:                                Quote[];
    cancelationPeriod:                     number;
    createdAt:                             null;
    updatedAt:                             null;
    onlineCategory:                        boolean;
    active:                                boolean;
    fieldDetails:                          FieldDetail[];
}

export interface FieldDetail {
    fieldName: string;
    display:   boolean;
    content:   string;
}

export interface Quote {
    purpose:        string;
    enrtyType:      null | string;
    periodTime:     string;
    currency:       string;
    price:          number;
    processingTime: string;
    validity:       string;
}

