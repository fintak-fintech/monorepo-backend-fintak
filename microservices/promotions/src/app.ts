import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
    getPromotionsController,
    createPromotionController,
    updatePromotionController,
    deletePromotionController,
} from './controllers';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/promotions', getPromotionsController);
app.post('/promotions', createPromotionController);
app.put('/promotions/:id', updatePromotionController);
app.delete('/promotions/:id', deletePromotionController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});