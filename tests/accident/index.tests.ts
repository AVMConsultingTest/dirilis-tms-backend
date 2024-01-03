import supertest from 'supertest';
import { app } from '../../src/app';
import { getToken } from '../test.utils';
import { EBool } from '../../src/types';

describe('Accident API', () => {
    let token: string;
    let valid_accident_id: number;
    const invalid_accident_id = 9999;

    const accidentData = {
        driver_id: 1,
        truck_id: 1,
        report_date: new Date(),
        report_number: 'testReport123',
        report_state: 'TestState',
        fatal: EBool.No,
        injury: EBool.Yes,
        tow: EBool.No,
        haz_mat: EBool.Yes,
        notes: 'Test accident notes',
    };

    beforeAll(async () => {
        token = await getToken();
    });

    describe('POST /api/v1/accidents', () => {
        it('should create an accident', async () => {
            const response = await supertest(app)
                .post('/api/v1/accidents')
                .set('Authorization', `Bearer ${token}`)
                .send(accidentData)
                .expect(201);

            expect(response.body).toHaveProperty('id', expect.any(Number));
            valid_accident_id = response.body.id;
        });
    });

    describe('GET /api/v1/accidents', () => {
        it('should fetch accidents with valid query parameters', async () => {
            const response = await supertest(app)
                .get('/api/v1/accidents?page_number=1&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body).toHaveProperty('page_size', 10);
            expect(response.body).toHaveProperty('page_number', 1);
            expect(response.body).toHaveProperty('total_pages');
        });

        it('should return 400 for invalid query parameters', async () => {
            await supertest(app)
                .get('/api/v1/accidents?page_number=abc&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(400);
        });

        it('should return empty data array if no accidents found', async () => {
            const response = await supertest(app)
                .get('/api/v1/accidents?page_number=9999&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('data', []);
        });
    });

    describe('GET /api/v1/accidents/:id', () => {
        it('should fetch one accident with valid accident_id', async () => {
            const response = await supertest(app)
                .get(`/api/v1/accidents/${valid_accident_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', valid_accident_id);
        });

        it('should return 404 for invalid accident_id', async () => {
            await supertest(app)
                .get(`/api/v1/accidents/${invalid_accident_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });

    describe('PUT /api/v1/accidents/:id', () => {
        it('should update an accident with valid data', async () => {
            const updatedData = { ...accidentData, notes: 'Updated notes' };

            const response = await supertest(app)
                .put(`/api/v1/accidents/${valid_accident_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'accident with id ' + valid_accident_id + ' updated successfully');
        });

        it('should return 404 for invalid accident_id', async () => {
            await supertest(app)
                .put(`/api/v1/accidents/${invalid_accident_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(accidentData)
                .expect(404);
        });
    });

    describe('DELETE /api/v1/accidents/:id', () => {
        it('should delete an accident with valid accident_id', async () => {
            await supertest(app)
                .delete(`/api/v1/accidents/${valid_accident_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204);  // 204 status indicates successful deletion with no content

            // Verify that the accident no longer exists
            await supertest(app)
                .get(`/api/v1/accidents/${valid_accident_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });

        it('should return 404 for invalid accident_id', async () => {
            await supertest(app)
                .delete(`/api/v1/accidents/${invalid_accident_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });
});
