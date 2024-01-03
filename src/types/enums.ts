export enum EBool {
    Yes = "Yes",
    No = "No"
}

export enum Durations {
    Weekly = "Weekly",
    Monthly = "Monthly",
    Yearly = "Yearly",
}

export enum EApplicantType {
    CompanyDriver = "Company Driver",
    OwnerDriver = "Owner Driver",
    LeaseDriver = "Lease Driver"
}

export enum EApplicantStatus {
    Completed = "Completed",
    NotCompleted = "Not Completed",
    NewApplicant = "New Applicant",
    Declined = "Declined",
    Disqualified = "Disqualified",
    Training = "Training",
    Approved = "Approved"
}

export enum ECompanyType {
    Broker = "broker",
    Carrier = "carrier"
}

export enum EEmployeeType {
    Driver = "Driver",
    Dispatcher = "Dispatcher"
}

export enum ETrainingType {
    Road = "Road",
    Classroom = "Classroom"
}

export enum ECadence {
    OneTime = "One-time",
    Annual = "Annual"
}

export enum ETrainingStatus {
    Pending = "Pending",
    Completed = "Completed",
    Overdue = "Overdue"
}

export enum EUserRole {
    Carrier = "carrier",
    Admin = "admin",
    Broker = "broker"
}

export enum EVendorStatus {
    Active = "Active",
    Inactive = "Inactive",
    InVacation = "In vacation"
}

export enum EBrokerStatus {
    Active = "Active",
    Inactive = "Inactive",
    New = "New",
    Suspending = "Suspending",
    Pending = "Pending"
}

export enum EAlertStatus {
    New = "New",
    Viewed = "Viewed"
}

export enum EDrugTestType {
    PreEmployment = "Pre-Employment",
    RandomBreathAlcohol = "Random Breath Alcohol"
}

export enum EDrugTestStatus {
    Completed = "Completed",
    Pending = "Pending",
    Selected = "Selected"
}

export enum EDriverSubstatus {
    Ready = "Ready",
    Covered = "Covered",
    Enroute = "Enroute",
    Shop = "Shop",
    Reserved = "Reserved",
    Dispatched = "Dispatched",
    Home = "Home",
    HomeForLoad = "Home for Load",
    Stop = "Stop"
}

export enum EDriverStatus {
    Active = "Active",
    Terminated = "Terminated",
    OnVacation = "On Vacation"
}

export enum ELoadOfferStatus {
    Pending = "Pending",
    Assigned = "Assigned",
    Declined = "Declined"
}

export enum EServiceVehicleType {
    Truck = "Truck",
    Trailer = "Trailer"
}

export enum EServiceApprovalStatus {
    Completed = "Completed",
    Pending = "Pending",
}

export enum ETruckStatus {
    Enroute = "Enroute",
    Ready = "Ready",
    InShop = "In Shop",
    InTerminal = "In Terminal"
}

export enum ETrailerStatus {
    Enroute = "Enroute",
    Ready = "Ready",
    InShop = "In Shop",
    InTerminal = "In Terminal"
}

export enum EPermissionRoute {
    Accident = "accidents",
    Alert = "alerts",
    Applicant = "applicants",
    Broker = "brokers",
    Client = "clients",
    Company = "companies",
    Device = "devices",
    Driver = "drivers",
    DrugTest = "drug-tests",
    Incident = "incidents",
    Inspection = "inspections",
    Load = "loads",
    Payable = "payables",
    Payroll = "payroll",
    Permit = "permits",
    Samba = "samba",
    Service = "services",
    Summary = "summaries",
    Trailer = "trailers",
    Training = "trainings",
    Truck = "trucks",
    User = "users",
    Vendor = "vendors",
    Permission = "permissions",
    Role = "roles",
    UserRole = "user-roles",
    Eld = "eld",
    Factoring = "factorings",
    Teams = "teams"
}

export enum EEldDriverEntityDrivingStatus {
    Clear = "Clear",
    Driving = "Driving",
    SleepBeth = "Sleep Beth"
}

export enum EEldTruckEntityStatus {
    Clear = "Clear",
    Off = "Off",
    Moving = "Moving"
}

export enum EEldTrailerEntityStatus {
    Clear = "Clear",
    NoGatewayParied = "No Gateway Paried"
}

export enum EEldAlertEventType {
    Clear = "Clear",
    ObstructedCamera = "Obstructed Camera",
    MobileUsage = "Mobile Usage"
}

export enum EEldAlertStatus {
    NeedsReview = "Needs Review",
    Dismissed = "Dismissed",
    Starred = "Starred"
}

export enum ELoadBrokerStatus {
    Open = "Open",
    Published = "Published",
    Booked = "Booked"
}

export enum EFuelType {
    Clear = "Clear",
    Diesel = "Diesel"
}

export enum ELoadStatus {
    Created = "Created",
    Accepted = "Accepted",
    Assigned = "Assigned",
    Enroute = "Enroute",
    CheckedInAtPickup = "Checked-in at Pickup",
    Loading = "Loading",
    CheckedOutAtPickup = "Checked-out at Pickup",
    CheckedInAtDropoff = "Checked-in at Drop-off",
    Unloading = "Unloading",
    CheckedOutAtDropoff = "Checked-out at Drop-off",
    Completed = "Completed",
    Cancelled = "Cancelled",
    Rejected = "Rejected",
    Delayed = "Delayed"
}

export enum EFactoringStatus {
    Open = "Open",
    Submitted = "Submitted",
    Pending = "Pending",
    Received = "Received",
    Rejected = "Rejected"
}

export enum ELocationStatus {
    Active = "Active",
    Inactive = "Inactive",
    NotInUse = "Not In Use"
}

export enum EBInvoiceStatus {
    Created = "Created",
    Open = "Open",
    Submitted = "Submitted",
    InDispute = "In Dispute"
}

export enum EBInvoicePayment {
    Pending = "Pending",
    Paid = "Paid"
}

export enum ECheckinCheckoutType {
    In = "In",
    Out = "Out"
}

export enum ECheckinCheckoutBinder {
    Provided = "Provided",
    Incomplete = "Incomplete",
    NotProvided = "Not Provided"
}

export enum ECdlType {
    Back = "CDL (Back)",
    Front = "CDL (Front)"
}

export enum ECdlClass {
    A = "A Class",
    B = "B Class",
    C = "C Class"
}

export enum EVehicleOwnershipType {
    OwnerOperator = "Owner Operator",
    Company = "Company"
}