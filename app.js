import express from 'express';
import patientRouter from './Routes/patientRouter.js'

const app = express();

app.use(express.json());
app.use('/patients', patientRouter);

app.use((error, req, res, next) => {
    console.error(error);

    if (error.message === 'not found') {
        res.status(404).json({error: "No patient found with the provided id."})
    } else {
        res.status(500).json({error: "An internal server error occurred."})
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});