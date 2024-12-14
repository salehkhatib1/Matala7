const fs = require("fs");
const path = require("path");

// File paths
const filePaths = [
  path.join(__dirname, "file1.txt"),
  path.join(__dirname, "file2.txt"),
  path.join(__dirname, "file3.txt"),
];
const outputFilePath = path.join(__dirname, "result.txt");

// Function to read files and process the content
const processFiles = async () => {
  try {
    // Read all files and split them into lines
    const filesContent = filePaths.map((filePath) => {
      const content = fs.readFileSync(filePath, "utf8"); // Synchronous read
      return content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);
    });

    const result = [];
    let round = 1;

    // Loop until no lines remain in all files
    while (filesContent.some((lines) => lines.length > 0)) {
      for (let i = 0; i < filePaths.length; i++) {
        const fileLines = filesContent[i];

        // Extract `round` number of lines (or remaining lines if less than `round`)
        const linesToCopy = fileLines.splice(0, round);
        result.push(...linesToCopy);
      }
      round++;
    }

    // Write the result to the output file
    fs.writeFileSync(outputFilePath, result.join("\n"), "utf8");
    console.log("Result file created successfully at:", outputFilePath);
  } catch (err) {
    console.error("Error processing files:", err);
  }
};

// Run the function
processFiles();
