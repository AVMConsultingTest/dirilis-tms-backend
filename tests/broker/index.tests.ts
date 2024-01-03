import supertest from 'supertest';
import { app } from '../../src/app';
import { getToken } from '../test.utils';

describe('Brokers API', () => {
    let token: string;
    let valid_broker_id: number;
    const invalid_broker_id = 9999;

    const brokerData = {
        name: "XYZ Brokerage",
        mc: "654321",
        credit_limit: 60000,
        credit_available: "30000.00",
        score: "A",
        credit_limit_incrase: "No",
        invoicing_email: "invoice@xyz-brokerage.com",
        status: "Pending",
        contract: "Standard Brokerage Contract",
        notes: "Notes about XYZ Brokerage",
        bill_to_address: "456 Invoice Ave.",
        direct_billing: false,
        billing_email: "invoice@xyz-brokerage.com",
        billing_option: "Bank Transfer",
        address_line1: "321 Broker St.",
        address_line2: "Apt 5B",
        state: "NY",
        city: "New York",
        zip_code: "10001",
        country: "USA",
        contact1_first_name: "Mike",
        contact1_last_name: "Tyson",
        contact1_email: "mike.tyson@xyz-brokerage.com",
        contact1_phone_number: "+12025553456",
        contact2_first_name: "Lucy",
        contact2_last_name: "Liu",
        contact2_email: "lucy.liu@xyz-brokerage.com",
        contact2_phone_number: "+12025554567"
    };

    beforeAll(async () => {
        token = await getToken();
    });

    describe('POST /api/v1/brokers', () => {
        it('should create a broker', async () => {
            const response = await supertest(app)
                .post('/api/v1/brokers')
                .set('Authorization', `Bearer ${token}`)
                .send(brokerData)
                .expect(201);

            expect(response.body).toHaveProperty('id', expect.any(Number));
            valid_broker_id = response.body.id;
        });
    });

    describe('GET /api/v1/brokers', () => {
        it('should fetch brokers with valid query parameters', async () => {
            const response = await supertest(app)
                .get('/api/v1/brokers?page_number=1&page_size=10')
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
                .get('/api/v1/brokers?page_number=abc&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(400);
        });

        it('should return empty data array if no brokers found', async () => {
            const response = await supertest(app)
                .get('/api/v1/brokers?page_number=9999&page_size=10')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('data', []);
        });
    });

    describe('GET /api/v1/brokers/:id', () => {
        it('should fetch one broker with valid broker_id', async () => {
            const response = await supertest(app)
                .get(`/api/v1/brokers/${valid_broker_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', valid_broker_id);
            // ... you can add more assertions for other fields if needed
        });

        it('should return 404 for invalid broker_id', async () => {
            await supertest(app)
                .get(`/api/v1/brokers/${invalid_broker_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });

    describe('PUT /api/v1/brokers/:id', () => {
        it('should update a broker with valid data', async () => {
            const updatedData = { ...brokerData, status: 'Active' };

            const response = await supertest(app)
                .put(`/api/v1/brokers/${valid_broker_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'broker with id ' + valid_broker_id + ' updated successfully');
        });

        it('should return 404 for invalid broker_id', async () => {
            await supertest(app)
                .put(`/api/v1/brokers/${invalid_broker_id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(brokerData)
                .expect(404);
        });
    });

    describe('DELETE /api/v1/brokers/:id', () => {
        it('should delete a broker with valid broker_id', async () => {
            await supertest(app)
                .delete(`/api/v1/brokers/${valid_broker_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204);  // 204 status indicates successful deletion with no content

            // Verify that the broker no longer exists
            await supertest(app)
                .get(`/api/v1/brokers/${valid_broker_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });

        it('should return 404 for invalid broker_id', async () => {
            await supertest(app)
                .delete(`/api/v1/brokers/${invalid_broker_id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });
});
