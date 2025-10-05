import { readData, writeData, generateUniqueId } from '../helpers.js'

async function getAllPatients() {
    return await readData();
}

async function getPatientById(id) {
    const patients = await readData();
    const patient =  patients.find(x => x.id === id);
    if (!patient) throw new Error('not found');
    return patient;
}

async function createNewPatient(patient) {
    const patients = await readData();
    const newId = await generateUniqueId();
    const newPatient = {id: newId, ...patient}

    patients.push(newPatient);
    await writeData(patients);
    return newPatient;
}

async function updatePatient(id, newPatientData) {
    let patients = await readData();
    const index = patients.findIndex(x => x.id === id);

    if (index !== -1) {
        patients[index] = { id: patients[index].id, ...newPatientData };
        await writeData(patients);
        return patients[index];
    } else {
        throw new Error('not found');
    }
}

async function deletePatient(id) {
    let patients = await readData();
    const originalLength = patients.length;
    patients = patients.filter(x => x.id !== id);

    if (patients.length === originalLength) {
        throw new Error('not found');
    }
    await writeData(patients);
}

export { 
    getAllPatients,
    getPatientById,
    createNewPatient,
    updatePatient,
    deletePatient
}