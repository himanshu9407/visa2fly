export interface testimonialsData {
    code: string;
    status: string;
    message: string;
    data: reviewDetail[];
}

export interface reviewDetail {
    fullName: string;
    review: string;
    country: string;
    state: string;
    stars: number;
    emailID: string;
    createdAt: Date;
}