const errorMessages = {
    tableCreation: (tableName) => `An error at ${tableName} creation`,
    internal: "Internal Server Error",
    invalidCreds: 'Invalid credentials',
    userExistsAlready: 'User already exists',
};

const successMessages = {
    tableCreation: (tableName) => `${tableName} was successfully created`,
    entityAdded: (entity) => `${entity} was successfully added`,
    entityUpdated: (entity) => `${entity} was successfully updated`,
    entityDeleted: (entity) => `${entity} was successfully deleted`,
    login: 'Login was successfyll',
    registration: 'Registration successful',
};

module.exports = {
    errorMessages,
    successMessages
}