import { http, HttpResponse } from 'msw';

export const handlers = [

    http.get('http://localhost:8080/el_olam/children/all', () => {
        return HttpResponse.json([
            { id: '1', name: 'John Doe', condition: 'Autism', age: '5' },
            { id: '2', name: 'Jane Smith', condition: 'Down Syndrome', age: '7' },
        ]);
    }),


    http.get('http://localhost:8080/el_olam/inventory/all', () => {
        return HttpResponse.json([
            { id: '101', itemName: 'Wheelchair', category: 'Mobility', quantity: '2' },
        ]);
    }),


    http.get('http://localhost:8080/el_olam/users/all', () => {
        return HttpResponse.json([
            {
                id: '501',
                name: 'Jane Doe',
                email: 'jane@el-olam.com',
                role: 'ROLE_DIRECTOR',
                phoneNumber: '08012345678'
            },
            {
                id: '502',
                name: 'Staff Member',
                email: 'staff@el-olam.com',
                role: 'ROLE_STAFF',
                phoneNumber: '08098765432'
            },
        ]);
    }),


    http.delete('http://localhost:8080/el_olam/users/:id', ({ params }) => {
        console.log(`Mocked deleting user: ${params.id}`);
        return new HttpResponse(null, { status: 200 });
    }),


    http.get('http://localhost:8080/el_olam/children/:id', ({ params }) => {
        return HttpResponse.json({
            id: params.id,
            name: 'Little John',
            condition: 'Autism Spectrum'
        });
    }),


    http.get('http://localhost:8080/el_olam/reports/child/:id/latest', () => {
        return HttpResponse.json({
            id: 'r1',
            date: '2026-01-28',
            milestones: 'Improved Eye Contact',
            observations: 'John was very responsive during the morning session.'
        });
    }),


    http.get('http://localhost:8080/el_olam/reports/child/:id', () => {
        return HttpResponse.json([
            { id: 'r1', date: '2026-01-28', milestones: 'Improved Eye Contact', observations: '...' },
            { id: 'r2', date: '2026-01-27', milestones: 'Used Spoon Independently', observations: '...' }
        ]);
    }),


    http.get('http://localhost:8080/el_olam/media/child/:id', () => {
        return HttpResponse.json([
            {
                id: 'm1',
                images: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
                date: '2026-01-28'
            }
        ]);
    })
];