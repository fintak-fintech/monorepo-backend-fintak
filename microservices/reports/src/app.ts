import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
    getReportsController,
    createReportController,
    updateReportController,
    deleteReportController,
} from './controllers';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/reports', getReportsController);
app.post('/reports', createReportController);
app.put('/reports/:id', updateReportController);
app.delete('/reports/:id', deleteReportController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
