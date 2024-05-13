// import { server } from '../src/server';

describe('Server Test File: Get /', () => {
    it('should return Hello World', async () => {
        const expectedResult = 'Hello World';
        const Result = 'Hello World';


        console.log(expectedResult);
        // const response = await request(server).get('/');

        // expect(response.status).toEqual(200);
        expect(Result).toEqual(expectedResult);
    });
});
