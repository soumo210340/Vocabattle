import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides auth state and methods', () => {
    let authContext;

    const TestComponent = () => {
      authContext = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(authContext).toHaveProperty('isAuthenticated');
    expect(authContext).toHaveProperty('user');
    expect(authContext).toHaveProperty('login');
    expect(authContext).toHaveProperty('logout');
  });

  it('updates auth state on login', async () => {
    let authContext;

    const TestComponent = () => {
      authContext = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const mockUser = { id: 1, email: 'test@test.com' };
    const mockToken = 'fake-token';

    await act(async () => {
      await authContext.login({ token: mockToken, user: mockUser });
    });

    expect(authContext.isAuthenticated).toBe(true);
    expect(authContext.user).toEqual(mockUser);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });

  it('updates auth state on logout', async () => {
    let authContext;

    const TestComponent = () => {
      authContext = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await authContext.logout();
    });

    expect(authContext.isAuthenticated).toBe(false);
    expect(authContext.user).toBe(null);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('initializes with stored auth state', () => {
    const mockUser = { id: 1, email: 'test@test.com' };
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'fake-token';
      if (key === 'user') return JSON.stringify(mockUser);
      return null;
    });

    let authContext;

    const TestComponent = () => {
      authContext = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(authContext.isAuthenticated).toBe(true);
    expect(authContext.user).toEqual(mockUser);
  });
});
