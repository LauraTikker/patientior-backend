export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}
export interface Discharge {
    date: string;
    criteria: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}
export interface SickLeave {
    startDate: string;
    endDate: string;
}
export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?:  Array<Diagnosis['code']>;
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type NewEntry = NewOccupationalHealthcareEntry | NewHealthCheckEntry | NewHospitalEntry;

export type NewPatient = Omit<Patient, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn'>;