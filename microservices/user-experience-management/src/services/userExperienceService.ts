import { db } from '../config/db';

export const getUserExperiences = async () => {
    const result = await db.query('SELECT * FROM user_experiences');
    return result.rows;
};

export const createUserExperience = async (userExperienceData: { feedback: string; rating: number }) => {
    const { feedback, rating } = userExperienceData;
    const result = await db.query(
        'INSERT INTO user_experiences (feedback, rating) VALUES ($1, $2) RETURNING *',
        [feedback, rating]
    );
    return result.rows[0];
};

export const updateUserExperience = async (id: string, userExperienceData: { feedback: string; rating: number }) => {
    const { feedback, rating } = userExperienceData;
    const result = await db.query(
        'UPDATE user_experiences SET feedback = $1, rating = $2 WHERE id = $3 RETURNING *',
        [feedback, rating, id]
    );
    return result.rows[0];
};

export const deleteUserExperience = async (id: string) => {
    await db.query('DELETE FROM user_experiences WHERE id = $1', [id]);
};
