import express from 'express';
import { createNewPatient, getAllPatients, getPatientById, updatePatient, deletePatient } from '../Services/patientService.js';

const router = express.Router();

// GET /patients

router.get('/', async (req, res, next) => {
    try {
        const patients = await getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
});

// GET /patients/:id

router.get('/:id', async (req, res, next) => {
    try {
        const patient = await getPatientById(req.params.id);
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
});


// POST /patients

router.post('/', async (req, res, next) => {
    try {
        const patient = await createNewPatient(req.body);
        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
})

// PUT /patients/:id

router.put('/:id', async (req, res, next) => {
    try {
        const updatedPatient = await updatePatient(req.params.id, req.body);
        res.status(200).json(updatedPatient);
    } catch (error) {
        next(error);
    }
})

// DELETE /patients/:id

router.delete('/:id', async (req, res, next) => {
    try {
        await deletePatient(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

export default router;