import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry }  from '../types';
import { createId, createEntryId } from '../utils';

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveInfoFromPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatientEntry = {
        id: createId(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryForPatient = (patientId: string, entry: NewEntry): Patient => {
    const newEntryForPatient = {
        id: createEntryId(),
        ...entry
    };
    const patient = patients.find((patient: Patient )=> patient.id === patientId);
    if (patient) {
        patient.entries.push(newEntryForPatient);
    } else {
        throw new Error(`Patient with id ${patientId} not found`);
    }
 
    return patient;
};

const getOnePatient = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

export default {
    getPatients,
    getNonSensitiveInfoFromPatients,
    addPatient,
    getOnePatient,
    addEntryForPatient
};