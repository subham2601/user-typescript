import { BaseModel } from '../base';

import { Agent, AGENT_SCHEMA} from "./agent.model";

// Note: Do not extend this class, only BaseModel is allow to be extended from.
// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated
export class AgentModel extends BaseModel {
  constructor() {
    super(Agent, 'Agent', AGENT_SCHEMA);
  }
}

