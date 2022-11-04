import {Reservation} from "./reservation";

export interface History {
    id: number;
    Reservation_id: Reservation;
    Name:string;
    NameOfParking:string;
    Location:string;
    HoursOfState:number;
    CostHours:number;
    Total:number;
    Reservation: Reservation;
}
