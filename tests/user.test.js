// Import the function to be tested
const { generateUniqueUsername, generateTemporaryPassword } = require('../server/utils/util');

// Mock the fetchExistingUserQuery function
const mockFetchExistingUserQuery = jest.fn();

describe('generateUniqueUsername', () => {
    afterEach(() => {
      mockFetchExistingUserQuery.mockClear(); // Clear mock function calls between tests
    });
  
    it('should return the username unchanged when no existing user with the same username', async () => {
      const username = 'john_doe';
      mockFetchExistingUserQuery.mockResolvedValueOnce([]); // Mock no existing user
  
      const result = await generateUniqueUsername(username, mockFetchExistingUserQuery);
  
      expect(result).toBe(username.toLowerCase().replace(/\s+/g, '')); // Expect the username to be unchanged
      expect(mockFetchExistingUserQuery).toHaveBeenCalledWith(username.toLowerCase().replace(/\s+/g, '')); // Expect fetchExistingUserQuery to be called with the cleaned username
    });
  
    it('should return a unique username by appending a number when existing user with the same username', async () => {
      const username = 'jane_doe';
      mockFetchExistingUserQuery.mockResolvedValueOnce([{ username: 'jane_doe' }]); // Mock existing user
      mockFetchExistingUserQuery.mockResolvedValueOnce([]); // Mock no existing user after appending a number
  
      const result = await generateUniqueUsername(username, mockFetchExistingUserQuery);
  
      expect(result).toMatch(/^jane_doe\d+$/i); // Expect the unique username to match the pattern "jane_doe<number>"
      expect(mockFetchExistingUserQuery).toHaveBeenCalledTimes(2); // Expect fetchExistingUserQuery to be called twice
    });
  });


describe('generateTemporaryPassword', () => {
    it('should generate a temporary password with the specified length and characters', () => {
      const generatedPassword = generateTemporaryPassword();
  
      // Check if the generated password has the correct length
      expect(generatedPassword.length).toBe(10);
  
      // Check if the generated password contains characters from the specified charset
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
      for (const char of generatedPassword) {
        expect(charset.includes(char)).toBe(true);
      }
    });
  });

  
