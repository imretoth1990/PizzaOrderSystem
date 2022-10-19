const { writeFile } = require("fs/promises");

module.exports = async (data) => {
  try {
    await writeFile("./pkgs.json", data);
    return true;
  } catch (error) {
    console.error(`File writing error: ${error.message}`);
  }
};
