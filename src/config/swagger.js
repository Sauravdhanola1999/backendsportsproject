import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load swagger.yaml file - handle both development and production paths
let swaggerDocument;
try {
  // Try relative path from config directory
  const swaggerPath = join(__dirname, '../../../swagger.yaml');
  swaggerDocument = YAML.parse(readFileSync(swaggerPath, 'utf8'));
} catch (error) {
  // Fallback: try from project root
  try {
    const swaggerPath = join(process.cwd(), 'swagger.yaml');
    swaggerDocument = YAML.parse(readFileSync(swaggerPath, 'utf8'));
  } catch (fallbackError) {
    console.error('❌ Could not load swagger.yaml file:', fallbackError.message);
    throw new Error('Swagger configuration file not found');
  }
}

// Update server URLs based on environment
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Get production URL - handle Vercel and other platforms
let productionUrl = process.env.PRODUCTION_URL;
if (!productionUrl && process.env.VERCEL_URL) {
  // Vercel provides VERCEL_URL without protocol, add https
  productionUrl = `https://${process.env.VERCEL_URL}`;
}
if (!productionUrl) {
  productionUrl = 'https://your-production-url.com';
}

// Build server URLs list
const servers = [
  {
    url: `http://localhost:${port}/api`,
    description: 'Local development server',
  }
];

// Add production URL if available and not in development
if (isProduction || process.env.PRODUCTION_URL || process.env.VERCEL_URL) {
  servers.unshift({
    url: `${productionUrl}/api`,
    description: 'Production server',
  });
}

swaggerDocument.servers = servers;

export { swaggerUi, swaggerDocument };



