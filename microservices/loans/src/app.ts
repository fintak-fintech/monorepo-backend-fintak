import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
    getLoansController,
    createLoanController,
    updateLoanController,
    deleteLoanController,
} from './controllers';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/loans', getLoansController);
app.post('/loans', createLoanController);
app.put('/loans/:id', updateLoanController);
app.delete('/loans/:id', deleteLoanController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
