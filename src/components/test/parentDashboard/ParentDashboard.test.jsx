import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import ParentDashboard from '../../pages/parentDashboard/ParentDashboard.jsx';
import userReducer from '../../services/slices/UserSlice';
import { parentApi } from '../../services/ParentApi';
import { server } from '../../mocks/Server.js';
import '@testing-library/jest-dom';

// Setup Mock Service Worker (MSW)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithProviders = (ui) => {
    const store = configureStore({
        reducer: {
            user: userReducer,
            [parentApi.reducerPath]: parentApi.reducer,
        },
        preloadedState: {
            user: {
                userInfo: { childId: '123' },
                loading: false,
                error: null
            }
        },
        middleware: (gdm) => gdm().concat(parentApi.middleware),
    });
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe('ParentDashboard Integration Tests', () => {

    it('shows the loading spinner initially', () => {
        renderWithProviders(<ParentDashboard />);

        const loader = document.querySelector('.animate-spin');
        expect(loader).toBeInTheDocument();
    });

    it('renders child profile and latest report after loading', async () => {
        renderWithProviders(<ParentDashboard />);


        const childName = await screen.findByText(/Little John/i);
        expect(childName).toBeInTheDocument();


        expect(screen.getByText(/Improved Eye Contact/i)).toBeInTheDocument();
    });

    it('opens the Report Details Modal when clicking the report card', async () => {
        renderWithProviders(<ParentDashboard />);


        const reportCard = await screen.findByText(/Improved Eye Contact/i);
        fireEvent.click(reportCard);


        expect(screen.getByText(/Session Details/i)).toBeInTheDocument();
        expect(screen.getByText(/Detailed Observations/i)).toBeInTheDocument();
    });

    it('switches to Media Gallery and shows images', async () => {
        renderWithProviders(<ParentDashboard />);


        const galleryTab = await screen.findByRole('button', { name: /Media Gallery/i });
        fireEvent.click(galleryTab);


        const images = await screen.findAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
    });

    it('switches to Full History and displays list of reports', async () => {
        renderWithProviders(<ParentDashboard />);


        const historyTab = await screen.findByRole('button', { name: /Full History/i });
        fireEvent.click(historyTab);


        const reports = await screen.findAllByText(/Improved Eye Contact/i);
        expect(reports.length).toBeGreaterThan(0);
    });
});