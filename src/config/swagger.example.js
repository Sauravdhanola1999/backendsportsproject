import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load swagger.yaml file
const swaggerDocument = YAML.parse(
  readFileSync(join(__dirname, '../../../swagger.yaml'), 'utf8')
);

// Update server URL based on environment
if (process.env.PORT) {
  swaggerDocument.servers = [
    {
      url: `http://localhost:${process.env.PORT}/api`,
      description: 'Local development server',
    },
  ];
}

export { swaggerUi, swaggerDocument };

// Usage in app.js:
// import { swaggerUi, swaggerDocument } from './config/swagger.js';
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

