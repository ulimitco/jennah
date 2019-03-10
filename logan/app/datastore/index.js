'use strict';

import Realm from 'realm';

const AuthSchemaObject = {
  name: 'Auth',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', default: ''},
    access_token: {type: 'string', default: ''},
    bx: {type: 'string', default: ''},
    rx: {type: 'string', default: ''},
  }
}

class AuthSchema extends Realm.Object {}
AuthSchema.schema = AuthSchemaObject

export default new Realm({schema: [AuthSchema]})
