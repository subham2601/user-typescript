import { BaseModel } from '../base';

import { Admin, ADMIN_SCHEMA} from "./admin.model";

// Note: Do not extend this class, only BaseModel is allow to be extended from.
// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated
export class AdminModel extends BaseModel {
  constructor() {
    super(Admin, 'Admin', ADMIN_SCHEMA);
  }
}

