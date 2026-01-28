import { http, HttpResponse } from 'msw';

export const handlers = [
    // Mock the GET all children request
    http.get('http://localhost:8080/el_olam/children/all', () => {
        return HttpResponse.json([
            { id: '1', name: 'John Doe', condition: 'Autism', age: '5' },
            { id: '2', name: 'Jane Smith', condition: 'Down Syndrome', age: '7' },
        ]);
    }),

    // Mock the GET inventory request
    http.get('http://localhost:8080/el_olam/inventory/all', () => {
        return HttpResponse.json([
            { id: '101', itemName: 'Wheelchair', category: 'Mobility', quantity: '2' },
        ]);
    }),
];