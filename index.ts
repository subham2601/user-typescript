/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import { connect } from "./models/database";
import cors from "cors";
import helmet from "helmet";
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json';
import { adminRouter } from "./src/routes/admin.routes";
import { agentRouter } from "./src/routes/agent.routes";

dotenv.config();
/**`
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use("/admin", adminRouter);
app.use("/agent", agentRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('welcome in route')
})

/**
 * Database Coonection
 */
connect();


/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}