/**
 * Bond.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'postgresqlServer',
  migrate: 'safe',
  tableName: 'bond_isin',
  schema: true,

  attributes: {
    id: {
      type: 'integer'
    },

    isin: {
      type: 'string'
    },

    alive: {
      type: 'boolean'
    },

    has_ts: {
      type: 'boolean'
    },

    ts_update_date: {
      type: 'date'
    },

    close_date: {
      type: 'date'
    }
  }
};