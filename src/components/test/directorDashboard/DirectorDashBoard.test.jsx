import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import DirectorDashboard from '../../pages/directorDashboard/DirectorDashboard.jsx';
import userReducer from '../../services/slices/UserSlice';
import { directorApi } from '../../services/DirectorApi';
import { server } from '../../mocks/Server.js';
import '@testing-library/jest-dom';

// MSW Lifecycle Setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithProviders = (ui) => {
    const store = configureStore({
        reducer: {
            user: userReducer,
            [directorApi.reducerPath]: directorApi.reducer,
        },
        middleware: (gdm) => gdm().concat(directorApi.middleware),
    });
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe('DirectorDashboard UI Tests', () => {
    it('should show the Overview tab by default', () => {
        renderWithProviders(<DirectorDashboard />);
        expect(screen.getByText(/Total Children/i)).toBeInTheDocument();
    });

    it('should switch to Inventory tab when clicked', () => {
        renderWithProviders(<DirectorDashboard />);
        const inventoryBtn = screen.getByRole('button', { name: /inventory/i });
        fireEvent.click(inventoryBtn);
        expect(screen.getByText(/Register New Asset/i)).toBeInTheDocument();
    });

    it('should display children fetched from MSW fake backend', async () => {
        renderWithProviders(<DirectorDashboard />);
        fireEvent.click(screen.getByRole('button', { name: /registry/i }));

        // findBy waits for the MSW mock response
        const childName = await screen.findByText(/John Doe/i);
        expect(childName).toBeInTheDocument();
        expect(screen.getByText(/Autism/i)).toBeInTheDocument();
    });

    it('opens the Delete Modal when trash icon is clicked', async () => {
        renderWithProviders(<DirectorDashboard />);
        fireEvent.click(screen.getByRole('button', { name: /registry/i }));

        // Wait for the children to load so the trash button exists
        const trashBtns = await screen.findAllByTitle('delete-button');
        fireEvent.click(trashBtns[0]);

        // Use waitFor to handle the React state/animation delay for the modal
        await waitFor(() => {
            expect(screen.getByText(/Delete Record\?/i)).toBeInTheDocument();
        });
    });
});

describe('DirectorDashboard Logic Tests', () => {
    it('calculates total stock levels correctly', () => {
        const mockInventory = [
            { id: 1, quantity: '10' },
            { id: 2, quantity: '5' }
        ];
        const total = mockInventory.reduce((acc, item) => acc + parseInt(item.quantity || 0), 0);
        expect(total).toBe(15);
    });

    it('updates childForm state when user types', () => {
        renderWithProviders(<DirectorDashboard />);
        fireEvent.click(screen.getByRole('button', { name: /registry/i }));

        const nameInput = screen.getByPlaceholderText(/Full Name/i);
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });

        expect(nameInput.value).toBe('John Doe');
    });
});