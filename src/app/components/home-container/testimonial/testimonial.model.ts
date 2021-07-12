export interface TestimonialModel {
        code: string;
        status: string;
        message: string;
        data: Array<TestimonialArr>
}

export interface TestimonialArr {
        fullName: string,
        review: string,
        country: string,
        state: string,
        stars: string,
        emailId: string
}