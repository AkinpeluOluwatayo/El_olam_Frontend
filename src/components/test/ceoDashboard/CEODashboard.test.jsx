import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import CEODashboard from '../../pages/ceoDashboard/CEODashboard.jsx';
import userReducer from '../../services/slices/UserSlice';
import { ceoApi } from '../../services/CeoApi'; // Import your CEO API
import { server } from '../../mocks/Server.js';
import '@testing-library/jest-dom';


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithProviders = (ui) => {
    const store = configureStore({
        reducer: {
            user: userReducer,
            [ceoApi.reducerPath]: ceoApi.reducer,
        },
        middleware: (gdm) => gdm().concat(ceoApi.middleware),
    });
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe('CEODashboard Integration Tests', () => {

    it('should show organization analytics by default', async () => {
        renderWithProviders(<CEODashboard />);

        expect(screen.getByText(/Total Organization Users/i)).toBeInTheDocument();
        expect(screen.getByText(/Global Child Count/i)).toBeInTheDocument();
    });

    it('should switch to Staff & Parents tab and display mocked users', async () => {
        renderWithProviders(<CEODashboard />);


        const staffTabBtn = screen.getByRole('button', { name: /Manage Staff & Parents/i });
        fireEvent.click(staffTabBtn);


        expect(screen.getByText(/Identified Name/i)).toBeInTheDocument();


        const userEmail = await screen.findByText(/Jane Doe/i || /@/);
        expect(userEmail).toBeInTheDocument();
    });

    it('should filter the user list when searching', async () => {
        renderWithProviders(<CEODashboard />);
        fireEvent.click(screen.getByRole('button', { name: /Manage Staff & Parents/i }));

        const searchInput = screen.getByPlaceholderText(/Search everything.../i);
        fireEvent.change(searchInput, { target: { value: 'NonExistentUser' } });


        const rows = screen.queryByText(/Member ID:/i);
        expect(rows).not.toBeInTheDocument();
    });

    it('opens the Delete Confirmation Modal for a user', async () => {
        renderWithProviders(<CEODashboard />);


        const staffTabBtn = screen.getByRole('button', { name: /Manage Staff & Parents/i });
        fireEvent.click(staffTabBtn);

        const userRow = await screen.findByText(/Jane Doe/i);

        const tableBody = screen.getByRole('table');
        const deleteBtn = within(tableBody).getAllByRole('button').find(btn =>
            btn.querySelector('svg')
        );

        fireEvent.click(deleteBtn);

        // 4. Verify the modal pops up
        // We use findByText here because it automatically "waits" for the element
        const modalHeading = await screen.findByText(/Confirm Removal/i);
        expect(modalHeading).toBeInTheDocument();
        expect(screen.getByText(/This action is permanent/i)).toBeInTheDocument();
    });

    it('should switch to Child Registry tab and show child cards', async () => {
        renderWithProviders(<CEODashboard />);

        const childTabBtn = screen.getByRole('button', { name: /Child Registry/i });
        fireEvent.click(childTabBtn);

        expect(screen.getByText(/Live Enrollment List/i)).toBeInTheDocument();

        const childCard = await screen.findByText(/John Doe/i);
        expect(childCard).toBeInTheDocument();
    });
});