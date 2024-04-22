const { statusCode, table, statusMessage } = require('../server/utils/constants');


describe('statusCode', () => {
    it('should return an object with specific status codes', () => {
      const statusCodes = statusCode();
      expect(statusCodes).toBeDefined();
      expect(statusCodes.OK).toBe(200);
      expect(statusCodes.BAD_REQUEST).toBe(404);
      expect(statusCodes.FOUR_ZERO_ZERO).toBe(400);
      expect(statusCodes.FORBIDDEN).toBe(403);
      expect(statusCodes.FIVE_ZERO_ZERO).toBe(500);
    });
  });


  describe('table', () => {
    it('should return an object with specific table names', () => {
      const tables = table;
      expect(tables).toBeDefined();
      expect(tables.ROLES).toBe('role_details');
      expect(tables.USERS_DETAILS).toBe('user_details');
      expect(tables.CATEGORIES_DETAILS).toBe('categories');
      expect(tables.SUB_CATEGORIES_DETAILS).toBe('subcategories');
      expect(tables.PRODUCT_DETAILS).toBe('products');
    });
  });

  describe('statusMessage', () => {
    it('should return an object with specific status messages', () => {
      const messages = statusMessage();
      expect(messages).toBeDefined();
      expect(messages.USER_CREATION).toBe("User created successfully with unique username and temporary password.");
      expect(messages.INTERNAL_SERVER_ERROR).toBe("Internal server error.");
      expect(messages.USER_CREATION_ERROR).toBe("Error creating user with unique username and temporary password.");
      expect(messages.EMAIL_EXIST).toBe("You are already registered with this Email ID.");
      expect(messages.WRONG_CREDENTIAL).toBe("Invalid email or password");
      expect(messages.DEACTIVATED_USER).toBe("User is deactivated.");
      expect(messages.SUCCESS).toBe("success");
      expect(messages.AUTHENTICATED).toBe("Authenticated successfully.");
      expect(messages.LOGIN_SUCCESSFUL).toBe("Login successful");
      expect(messages.INVALID_TOKEN).toBe("Token does not belong to this user.");
      expect(messages.TOKEN_NOT_EXISTS).toBe("Please provide authentication token.");
      expect(messages.UNAUTHORIZED).toBe("Failed to authenticate token.");
      expect(messages.UNAUTHORIZED_ACCESS).toBe("Access denied.");
      expect(messages.USERS_DETAILS_UPDATION).toBe("User details updated successfully'");
      expect(messages.ROLES_INFO).toBe("Roles fetched successfully");
      expect(messages.CATEGORIES_INSERTED).toBe("Categories inserted successfully");
      expect(messages.SUBCATEGORIES_INSERTED).toBe("Sub-Categories inserted successfully");
      expect(messages.PRODUCT_INSERTED).toBe("Product inserted successfully");
      expect(messages.CATEGORIES_INFO).toBe("Categories list fetched successfully");
      expect(messages.SUBCATEGORIES_INFO).toBe("Sub-Categories list fetched successfully");
      expect(messages.PRODUCT_INFO).toBe("Product list fetched successfully");
      expect(messages.DELETE_CATEGORIES_INFO).toBe("Categories list deleted successfully");
      expect(messages.DELETE_SUBCATEGORIES_INFO).toBe("Sub-Categories list deleted successfully");
      expect(messages.DELETE_PRODUCT_INFO).toBe("Product list deleted successfully");
      expect(messages.PERMSSION_DENIED).toBe("You do not have permission to perform this action");
    });
  });