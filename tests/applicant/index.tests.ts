import supertest from 'supertest';
import { app } from '../../src/app';
import { getToken } from '../test.utils';

describe('Applicants API', () => {
    let token: string;
    let valid_applicant_id: number;
    const invalid_applicant_id = 9999;

    const applicantData = {
        first_name: "John",
        last_name: "Doe",
        type: "Company Driver",
        hire_date: "2023-08-18",
        phone_number: "+12025551234",
        email: "john.doe@example.com",
        status: "New Applicant"
    };

    beforeAll(async () => {
        token = await getToken();
    });

    describe('POST /api/v1/applicants', () => {
        it('should create an applicant', async () => {
            const response = await supertest(app)
                .post('/api/v1/applicants')
                .set('Authorization', `Bearer ${token}`)
                .send(applicantData)
                .expect(201);

            expect(response.body).toHaveProperty('id', expect.any(Number));
            valid_applicant_id = response.body.id;
        });
    });

    describe('GET /api/v1/applicants', () => {
        it('should fetch applicants with valid query parameters', async () => {
            const response = await supertest(app)
                .get('/api/v1/applicants?page_number=1&page_size=10')
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
                .get('/api/v1/applicants?page_number=abc&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(400);
        });

        it('should return empty data array if no applicants found', async () => {
            const response = await supertest(app)
                .get('/api/v1/applicants?page_number=9999&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('data', []);
        });
    });

    describe('GET /api/v1/applicants/:id', () => {
        it('should fetch one applicant with valid applicant_id', async () => {
            const response = await supertest(app)
                .get(`/api/v1/applicants/${valid_applicant_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', valid_applicant_id);
            // ... you can add more assertions for other fields if needed
        });

        it('should return 404 for invalid applicant_id', async () => {
            await supertest(app)
                .get(`/api/v1/applicants/${invalid_applicant_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });

    describe('PUT /api/v1/applicants/:id', () => {
        it('should update an applicant with valid data', async () => {
            const updatedData = { ...applicantData, status: 'New Applicant' };

            const response = await supertest(app)
                .put(`/api/v1/applicants/${valid_applicant_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'applicant with id ' + valid_applicant_id + ' updated successfully');
        });

        it('should return 404 for invalid applicant_id', async () => {
            await supertest(app)
                .put(`/api/v1/applicants/${invalid_applicant_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(applicantData)
                .expect(404);
        });
    });

    describe('DELETE /api/v1/applicants/:id', () => {
        it('should delete an applicant with valid applicant_id', async () => {
            await supertest(app)
                .delete(`/api/v1/applicants/${valid_applicant_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204);  // 204 status indicates successful deletion with no content

            // Verify that the applicant no longer exists
            await supertest(app)
                .get(`/api/v1/applicants/${valid_applicant_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });

        it('should return 404 for invalid applicant_id', async () => {
            await supertest(app)
                .delete(`/api/v1/applicants/${invalid_applicant_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });
});
