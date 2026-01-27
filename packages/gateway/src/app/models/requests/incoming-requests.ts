import { RequestStatus } from "../response-status"

export interface IncomingRequests{
    id: string;
    name:string;
    date: Date;
    requestStatus: RequestStatus;
    createdByFirstName:string ;
    createdBySecondName:string ;
    createdByThirdName: string;
    createdByFourthName:string ;
    orgNameAr: string;
    orgNameEn: string;
    requestCategoryName:string;
    destinationName:string;
    requestNumber:string;
}