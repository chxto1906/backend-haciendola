import * as swaggerJsDoc from 'swagger-jsdoc';
import * as path from 'path';

console.log("`${path.join(__dirname, 'routes/index.ts')}`",`${path.join(__dirname, 'routes/index.ts')}`)
const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Haciendola - Henry',
            version: '1.0.0',
            description: 'API de desafío planteado por Haciendola.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
    },
    apis: [
        `${path.join(__dirname, 'routes/index.ts')}`,
        `${path.join(__dirname, 'resources/**/*.routes.ts')}`,
    ],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
