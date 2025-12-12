export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("users", [
    {
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("users", null, {});
};
