import { UserCredential } from 'firebase/auth';
import { vi } from 'vitest';

export const mockResponseUserData: UserCredential = {
  user: {
    emailVerified: false,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: '',
    tenantId: null,
    delete: vi.fn(),
    getIdToken: vi.fn(),
    getIdTokenResult: vi.fn(),
    reload: vi.fn(),
    toJSON: vi.fn(),
    displayName: null,
    phoneNumber: null,
    providerId: '',
    uid: '',
    email: '',
    photoURL: '',
  },
  providerId: null,
  operationType: 'signIn',
};
