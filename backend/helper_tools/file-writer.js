const { writeFile } = require("fs/promises");

module.exports = async (data) => {
  try {
    await writeFile("../backend/orders.json", data);
    return true;
  } catch (error) {
    console.error(`File writing error: ${error.message}`);
  }
};
