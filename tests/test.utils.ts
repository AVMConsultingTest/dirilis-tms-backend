import supertest from 'supertest';
import { app } from '../src/app';

export const getToken = async (): Promise<string> => {
    const response = await supertest(app).post('/api/v1/auth/login')
        .send({
            email: "carrier@gmail.com",
            password: "hellocarrier"
        })
        .expect(200);
    
    return response.body.access_token;
}