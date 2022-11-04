import {Parkinglot} from "../../parkingLot/model/parkinglot";
import {Driver} from "../../profile/model/driver";

export interface Reservation {
    id: number;
    ParkingLot: Parkinglot;
    Driver: Driver;
    total: number;
    parkingHours: number;
}
