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
         order_items: {type: 'list', objectType: 'OrderItems'},
      }  
   }

   const OrderItemsSchemaObject = {
   name: 'OrderItems',
   primaryKey: 'id',
      properties: {
         id: {type: 'string', default: ''},
         qty: {type: 'int', default: 0},
         item: {type: 'string', default: ''},
         item_details: {type: 'string', default: ''},
         status: {type: 'string', default: ''},
      }
   }

   const CategorySchemaObject = {
      name: 'Category',
      primaryKey: 'id',
      properties: {
         id: {type: 'string', default: ''},
         category: {type: 'string', default: ''},
         items: {type: 'list', objectType: 'Item'},
      }  
   }

   const ItemSchemaObject = {
      name: 'Item',
      primaryKey: 'id',
      properties: {
         id: {type: 'string', default: ''},
         item: {type: 'string', default: ''},
      }  
   }

class AuthSchema extends Realm.Object {}
AuthSchema.schema = AuthSchemaObject

class OrderSchema extends Realm.Object {}
OrderSchema.schema = OrderSchemaObject

class OrderItemsSchema extends Realm.Object {}
OrderItemsSchema.schema = OrderItemsSchemaObject

class CategorySchema extends Realm.Object {}
CategorySchema.schema = CategorySchemaObject

class ItemSchema extends Realm.Object {}
ItemSchema.schema = ItemSchemaObject

export default new Realm({schema: [AuthSchema, OrderSchema, OrderItemsSchema, CategorySchema, ItemSchema]})
