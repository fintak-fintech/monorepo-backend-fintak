import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
    getUserExperiencesController,
    createUserExperienceController,
    updateUserExperienceController,
    deleteUserExperienceController,
} from './controllers';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/user-experiences', getUserExperiencesController);
app.post('/user-experiences', createUserExperienceController);
app.put('/user-experiences/:id', updateUserExperienceController);
app.delete('/user-experiences/:id', deleteUserExperienceController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
