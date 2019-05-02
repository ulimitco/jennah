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

const OrderSchemaObject = {
   name: 'Order',
   primaryKey: 'id',
      properties: {
         id: {type: 'string', default: ''},
         order_details: {type: 'string', default: ''},
         initial_payment: {type: 'double', default: ''},
         sale_datetime: {type: 'date', default: ''},
         pickup_datetime: {type: 'date', default: ''},
         pickup_location: {type: 'string', default: ''},
         customer_name: {type: 'string', default: ''},
         customer_contact: {type: 'string', default: ''},
         status: {type: 'string', default: ''},
      }  
}

const OrderItemSchemaObject = {
   name: 'OrderItem',
   primaryKey: 'id',
      properties: {
         id: {type: 'string', default: ''},
         qty: {type: 'int', default: 0},
         item: {type: 'string', default: ''},
         item_id: {type: 'string', default: ''},
         sell_price: {type: 'double', default: 0.00 },
         item_details: {type: 'string', default: ''},
         status: {type: 'string', default: ''},
      }
}

class AuthSchema extends Realm.Object {}
AuthSchema.schema = AuthSchemaObject

class OrderSchema extends Realm.Object {}
OrderSchema.schema = OrderSchemaObject

class OrderItemSchema extends Realm.Object {}
OrderItemSchema.schema = OrderItemSchemaObject


export default new Realm({schema: [AuthSchema, OrderSchema, OrderItemSchema]})
