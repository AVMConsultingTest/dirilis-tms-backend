import supertest from 'supertest';
import { app } from '../../src/app';
import { getToken } from '../test.utils';

describe('Alerts API', () => {
    let token: string;
    let valid_alert_id: number;
    const invalid_alert_id = 9999;

    const alertData = {
        driver_id: 1,
        status: "New",
        description: "Alert description and details",
        date: "2023-08-18T12:00:00Z",
        licence_status: "Suspended",        
    };

    beforeAll(async () => {
        token = await getToken();
    });

    describe('POST /api/v1/alerts', () => {
        it('should create an alert', async () => {
            const response = await supertest(app)
                .post('/api/v1/alerts')
                .set('Authorization', `Bearer ${token}`)
                .send(alertData)
                .expect(201);

            expect(response.body).toHaveProperty('id', expect.any(Number));
            valid_alert_id = response.body.id;
        });
    });

    describe('GET /api/v1/alerts', () => {
        it('should fetch alerts with valid query parameters', async () => {
            const response = await supertest(app)
                .get('/api/v1/alerts?page_number=1&page_size=10')
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
                .get('/api/v1/alerts?page_number=abc&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(400);
        });

        it('should return empty data array if no alerts found', async () => {
            const response = await supertest(app)
                .get('/api/v1/alerts?page_number=9999&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('data', []);
        });
    });

    describe('GET /api/v1/alerts/:id', () => {
        it('should fetch one alert with valid alert_id', async () => {
            const response = await supertest(app)
                .get(`/api/v1/alerts/${valid_alert_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', valid_alert_id);
            expect(response.body).toHaveProperty('driver_name', expect.any(String));
            // ... you can add more assertions for other fields if needed
        });

        it('should return 404 for invalid alert_id', async () => {
            await supertest(app)
                .get(`/api/v1/alerts/${invalid_alert_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });

    describe('PUT /api/v1/alerts/:id', () => {
        it('should update an alert with valid data', async () => {
            const updatedData = { ...alertData, status: 'Viewed' };

            const response = await supertest(app)
                .put(`/api/v1/alerts/${valid_alert_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'alert with id ' + valid_alert_id + ' updated successfully');
        });

        it('should return 404 for invalid alert_id', async () => {
            await supertest(app)
                .put(`/api/v1/alerts/${invalid_alert_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(alertData)
                .expect(404);
        });
    });

    describe('DELETE /api/v1/alerts/:id', () => {
        it('should delete an alert with valid alert_id', async () => {
            await supertest(app)
                .delete(`/api/v1/alerts/${valid_alert_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204);  // 204 status indicates successful deletion with no content

            // Verify that the alert no longer exists
            await supertest(app)
                .get(`/api/v1/alerts/${valid_alert_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });

        it('should return 404 for invalid alert_id', async () => {
            await supertest(app)
                .delete(`/api/v1/alerts/${invalid_alert_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });
});
