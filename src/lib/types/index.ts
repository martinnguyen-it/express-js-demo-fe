export interface IUser {
    id: string;
    role: string;
    name: string;
    photo: string;
    email: string;
}

export interface ITour {
    id: string;
    name: string;
    slug?: string;
    duration?: number;
    maxGroupSize: number;
    difficulty: 'easy' | 'medium' | 'difficulty';
    ratingsAverage?: number;
    ratingsQuantity?: number;
    price: number;
    priceDiscount?: number;
    summary: string;
    description?: string;
    imageCover: string;
    images?: string[];
    createdAt: Date;
    startDates: Date[];
    secretTour?: boolean;
    startLocation?: IStartTour;
    locations?: ILocation[];
    guides: IUser[];
    reviews?: IReview[];
}

// export interface IReviewOnTour extends Pick<IReview, 'user' | 'review' | 'rating'> {}

export interface IStartTour {
    coordinates: number[];
    address: string;
    description: string;
}

export interface ILocation {
    coordinates: [number, number];
    address: string;
    description: string;
    day: number;
}

export interface IReview {
    id: string;
    review: string;
    rating: number;
    tour: ITour;
    user: IUser;
    createAt: Date;
}
