import { Sequelize } from "sequelize-typescript";
import sequelizeConfig from "./sequelize-config";
import { Transaction } from "sequelize";
import {
  Accident, Alert, Applicant, Broker, Client, Company,
  Device, Driver, DrugTest, Incident, Inspection, Load, LoadOffer,
  LoadStop, Permit, Training, Truck, User, Vendor, Trailer, Service, DriverBoard, Factoring,
  EldDriverEntity, EldTrailerEntity, EldTruckEntity, EldAlert, EldIftaDriver,
  EldIftaFuelPurchase, EldIftaIdlingEvent, EldIftaSummary, EldIftaVehicle, EldIftaTripReport,
  Permission, Role, UserRole, BCarrier, BContact, BCustomerContact, BCustomer, BInvoice, BQuote, Cdl, CheckinCheckout, Location
} from "../models";

interface TransactionExtended {
    isCommitted?: boolean
}

interface SequelizeExtended extends Sequelize {
    transaction(): Promise<Transaction & TransactionExtended>
}

export const sequelize: SequelizeExtended = new Sequelize(sequelizeConfig.development);


sequelize.addModels([ 
  Accident, Alert, Applicant, Broker, Client, Company,
  Device, Driver, DrugTest, Incident, Inspection, Load, LoadOffer,
  LoadStop, Permit, Training, Truck, User, Vendor, Trailer, Service, DriverBoard, Factoring,
  EldDriverEntity, EldTrailerEntity, EldTruckEntity, EldAlert, EldIftaDriver,
  EldIftaFuelPurchase, EldIftaIdlingEvent, EldIftaSummary, EldIftaVehicle, EldIftaTripReport,
  Permission, Role, UserRole, BCarrier, BContact, BCustomerContact, BCustomer, BInvoice, BQuote, Cdl, CheckinCheckout, Location
]);