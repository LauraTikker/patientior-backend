/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/patients', (_req, res) => {
  res.send(patientsService.getNonSensitiveInfoFromPatients());
});

patientsRouter.post('/patients', (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(`${error.message as string}`);
  }
});

patientsRouter.post('/patients/:id/entries', (_req, res) => {
  try {
    const id = _req.params.id;
    const newEntry = toNewEntry(_req.body);
    if (newEntry) {
      const addedEntry = patientsService.addEntryForPatient(id, newEntry);
      res.json(addedEntry);
    } else {
      throw new Error('entry type is unsupported');
    }
    
  } catch (error) {
    res.status(400).send(`${error.message as string}`);
  }
});

patientsRouter.get('/patients/:id', (_req, res) => {
  const id = _req.params.id;
  
    const patient = patientsService.getOnePatient(id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send(`Patient with id ${id} not found`);
    }
});

export default patientsRouter;