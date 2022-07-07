import { Parcel } from "../Parcel";
import { Token } from "./Token";

export interface Mobile extends Token {
    step: number;
    move(allParcels: Parcel[]): void;
}