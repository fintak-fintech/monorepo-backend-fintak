import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
    getSupportsController,
    createSupportController,
    updateSupportController,
    deleteSupportController,
} from './controllers';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/supports', getSupportsController);
app.post('/supports', createSupportController);
app.put('/supports/:id', updateSupportController);
app.delete('/supports/:id', deleteSupportController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
