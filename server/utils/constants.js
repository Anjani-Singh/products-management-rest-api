module.exports = {
  statusCode: () => {
    return {
      OK: 200,
      BAD_REQUEST: 404,
      FOUR_ZERO_ZERO:400,
      FOUR_ZERO_ONE: 401,
      FORBIDDEN: 403,
      FIVE_ZERO_ZERO: 500,
    };
  },
  statusMessage: () => {
    return {
      USER_CREATION: "User created successfully with unique username and temporary password.",
      INTERNAL_SERVER_ERROR: "Internal server error.", //500
      USER_CREATION_ERROR: "Error creating user with unique username and temporary password.",
      EMAIL_EXIST: "You are already registered with this Email ID.",
      WRONG_CREDENTIAL: "Invalid email or password",
      DEACTIVATED_USER: "User is deactivated.",
      SUCCESS: "success",
      AUTHENTICATED: "Authenticated successfully.",
      LOGIN_SUCCESSFUL: "Login successful",
      INVALID_TOKEN: "Token does not belong to this user.",
      TOKEN_NOT_EXISTS: "Please provide authentication token.",
      UNAUTHORIZED: "Failed to authenticate token.",
      UNAUTHORIZED_ACCESS: "Access denied.",
      USERS_DETAILS_UPDATION: "User details updated successfully'",
      ROLES_INFO: "Roles fetched successfully",
      CATEGORIES_INSERTED: "Categories inserted successfully",
      SUBCATEGORIES_INSERTED: "Sub-Categories inserted successfully",
      PRODUCT_INSERTED: "Product inserted successfully",
      CATEGORIES_INFO: "Categories list fetched successfully",
      SUBCATEGORIES_INFO: "Sub-Categories list fetched successfully",
      PRODUCT_INFO: "Product list fetched successfully",
      DELETE_CATEGORIES_INFO: "Categories list deleted successfully",
      DELETE_SUBCATEGORIES_INFO: "Sub-Categories list deleted successfully",
      DELETE_PRODUCT_INFO: "Product list deleted successfully",
      PERMSSION_DENIED: "You do not have permission to perform this action",
    };
  },
  table: {
    ROLES: "role_details",
    USERS_DETAILS: "user_details",
    CATEGORIES_DETAILS: "categories",
    SUB_CATEGORIES_DETAILS: "subcategories",
    PRODUCT_DETAILS: "products",
  },
}