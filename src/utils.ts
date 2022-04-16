/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Entry, Gender, NewPatient, NewOccupationalHealthcareEntry,
    NewHealthCheckEntry, HealthCheckRating, NewHospitalEntry, Discharge, SickLeave, NewEntry, Diagnosis } from './types';

export const createId = (): string => {
    const validCharacters = '0123456789abcdefghijklmnopqrstuvwxyz';
    const idBase = "d2773-f723-11e9-8f0b-362b9e155667";
    const array = idBase.split('-');

    let charactersSubstring = '';
    for (let i = 0; i < 3; i++) {
        charactersSubstring = charactersSubstring + validCharacters.charAt(Math.random() * validCharacters.length);
    }

    const id = array[0] + charactersSubstring + '-' + array[1] + '-' +  array[2] + '-' +  array[3] + '-' +  array[4];

    return id;
};

export const createEntryId = (): string => {
    const validCharacters = '0123456789abcdefghijklmnopqrstuvwxyz';
    const idBase = "d811e46d-70b3-4d90-b090-4535c7cf8fb17";
    const array = idBase.split('-');

    let charactersSubstring = '';
    for (let i = 0; i < 3; i++) {
        charactersSubstring = charactersSubstring + validCharacters.charAt(Math.random() * validCharacters.length);
    }

    const id = array[0] + charactersSubstring + '-' + array[1] + '-' +  array[2] + '-' +  array[3] + '-' +  array[4];

    return id;
};

export const toNewPatient = (object: { name: any; dateOfBirth: any; ssn: any; gender: any; occupation: any; entries: any }): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(object.name, "name"),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn, "ssn"),
        gender: parseGender(object.gender),
        entries: parseEntries(object.entries),
        occupation: parseString(object.occupation, "occupation"),
    };
    return newPatient;

};

export const toNewEntry = (newEntry: any): NewEntry | undefined => {
    switch(newEntry.type) {
        case "HealthCheck":
            return toHealthCheckEntry(newEntry);
        case "OccupationalHealthcare":
            return toOccupationalHealthcareEntry(newEntry);
        case "Hospital":
            return toHospitalEntry(newEntry);
        default: return undefined;
    }
};

const toOccupationalHealthcareEntry = (object: { employerName: any; description: any; date: any; specialist: any; sickLeave: any; diagnosisCodes: any}): NewOccupationalHealthcareEntry => {
    const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        employerName: parseString(object.employerName, "employerName"),
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        type: "OccupationalHealthcare",
        sickLeave: parseSickLeave(object.sickLeave),
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
    };
    return newOccupationalHealthcareEntry;
};

const toHealthCheckEntry = (object: { employerName: any; description: any; date: any; specialist: any, healthCheckRating: any; diagnosisCodes: any }): NewHealthCheckEntry => {
    const newHealthCheckEntry: NewHealthCheckEntry = {
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        type: "HealthCheck",
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
    };
    return newHealthCheckEntry;
};

const toHospitalEntry = (object: { employerName: any; description: any; date: any; specialist: any, discharge: any; diagnosisCodes: any }): NewHospitalEntry => {
    const newHospitalEntry: NewHospitalEntry = {
        discharge: parseDischarge(object.discharge),
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        type: "Hospital",
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
    };
    return newHospitalEntry;
};

const parseDiagnosisCode = (field: any): Array<Diagnosis['code']> => {
    if (field) {
        field.forEach((diagnosis: any) => {
            if (!isDiagnosis(diagnosis)) {
                throw new Error(`Incorrect diagnosis: ${JSON.stringify(diagnosis)}`);
            }
        });
    }
    return field;
};

const parseHealthCheckRating = (field: any): HealthCheckRating => {
    if (!field || !isHealthCheckRating(field)) {
        throw new Error(`Incorrect or missing healthCheckRating: ${JSON.stringify(field)}`);
    }
    return field;
};

const parseDischarge = (field: any): Discharge => {
    if (!field || !isDischarge(field)) {
        throw new Error(`Incorrect or missing Discharge: ${JSON.stringify(field)}`);
    }
    return field;
};

const parseSickLeave = (field: any): SickLeave => {
    if (field && !isSickLeave(field)) {
        throw new Error(`Incorrect or missing sickleave: ${JSON.stringify(field)}`);
    }
    return field;
};

const parseString = (field: any, fieldDescription: string): string => {
    if (!field || !isString(field)) {
        throw new Error(`Incorrect or missing ${fieldDescription}: ${JSON.stringify(field)}`);
    }
    return field;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${JSON.stringify(date)}`);
    }
    return date;
  };

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${JSON.stringify(gender)}`);
    }
    return gender;
};

const parseEntries = (entries: any): Entry[] => {
    if (!entries || isString(entries)) {
        throw new Error(`Incorrect or missing entries: ${JSON.stringify(entries)}`);
    }
    entries.forEach((entry: any) => {
        if (!hasCorrectEntryType(entry)) {
            throw new Error(`Incorrect or missing entries: ${JSON.stringify(entries)}`);
        }
    });
    return entries;
};

const hasCorrectEntryType = (entry: any): entry is Entry => {
    if ((entry as Entry).type) {
        return true;
    }
    return false;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isDiagnosis = (param: any): param is Diagnosis['code'] => {
    if (!isString(param)) {
        return false;
    }
    return true;
};

const isDischarge = (param: any): param is Discharge => {
    if (!param.date || !param.criteria || !isDate(param.date) || !isString(param.criteria)) {
        return false;
    }
    return true;
};

const isSickLeave = (param: any): param is SickLeave => {
    if (!param.startDate || !param.endDate || !isDate(param.startDate) || !isDate(param.endDate)) {
        return false;
    }
    return true;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};