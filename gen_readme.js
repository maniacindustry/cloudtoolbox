const fs = require("fs");
const pkg = require("./package.json");

const readmeContent = `# ${pkg.name}

${pkg.description || ""}

## Version
\`${pkg.version}\`

## Installation
\`\`\`bash
npm install
\`\`\`

## Scripts
- \`npm run dev\` → start in development (nodemon)
- \`npm run prod\` → start in production
- \`npm run genrm\` → regenerate this README.md

## Usage
\`\`\`bash
node ${pkg.main}
\`\`\`

## Author
${pkg.author}

## License
${pkg.license}

\`\`\`mermaid
graph TD;
    Frontend[Frontend (React)] -->|HTTP| Backend[Backend (Node.js/Express)];
    Backend -->|SQL| Database[Database (PostgreSQL)];
`;

fs.writeFileSync("README.md", readmeContent);
console.log("✅");

