import SQLite from 'react-native-sqlite-storage'
import React from 'react'

import { pluck, findWhere } from 'underscore'

function errorCB(err) {
  console.log("SQL Error: " + err);
}

function openCB() {
  console.log("Database opened successfully");
}

const db = SQLite.openDatabase('db.db', '1.0', 'Test Database', 200000, openCB, errorCB)

const DB_SPEC = [
  {
    table: 'friends',
    create: 'CREATE TABLE IF NOT EXISTS friends (id INTEGER PRIMARY KEY NOT NULL, username TEXT, nickname TEXT, amount INTEGER DEFAULT 0, last_debt INTEGER, total_debts INTEGER DEFAULT 0, currency TEXT);',
    drop: 'DROP TABLE IF EXISTS friends',
    insert: 'INSERT INTO friends (username, nickname, currency) values (?, ?, ?)',
    update: '',
    select: 'SELECT * FROM friends',
    where: 'SELECT * FROM friends WHERE id = ?',
    remove: 'DELETE FROM friends WHERE id = ?'
  },
  {
    table: 'debts',
    create: 'CREATE TABLE IF NOT EXISTS debts (id INTEGER PRIMARY KEY NOT NULL, debtor TEXT, creditor TEXT, amount INTEGER DEFAULT 0, time INTEGER, memo TEXT, currency TEXT);',
    drop: 'DROP TABLE IF EXISTS debts',
    insert: 'INSERT INTO debts (debtor, creditor, amount, time, memo, currency) values (?, ?, ?, ?, ?, "USD")',
    select: 'SELECT * FROM debts',
    where: 'SELECT * FROM debts WHERE user_id = ?',
    remove: 'DELETE FROM debts WHERE id = ?'
  }
]

function getTableAction (table, action) {
  const tbl = findWhere(DB_SPEC, {table: table})

  if (tbl != null) {
    return tbl[action]
  }
}

const complete = () => (console.log('complete'))

function executeBatchTransaction (ref, cmds, callback = complete) {
  db.transaction(
    tx => {
      cmds.map(function (cmd) {
        tx.executeSql(cmd)
      })
    },
   (error) => {
     console.log(error)
   },
   (success) => {
     console.log(ref)
     callback()
   }
  )
}

export function dropAll (actionCompleted = complete) {
  executeBatchTransaction('dropAll', pluck(DB_SPEC, 'drop'), actionCompleted)
}

export function createTables (actionCompleted) {
  executeBatchTransaction('createTables', pluck(DB_SPEC, 'create'), actionCompleted)
}

export function executeTransaction (options, success) {
  const table = options.table
  const action = getTableAction(table, options.action)
  const data = options.data ? options.data : []

  db.transaction(
    tx => {
      tx.executeSql(
        action, data,
        (transaction, result) => {
          success(result)
        }
      )
    },
    (err) => {
      console.log(err)
    },
    () => {
      console.log('transaction for: ' + table)
    }
  )
}

// Insert a given record for a table afterwhich return all records of given table
export function insertRecord(options) {
  return new Promise((resolve, reject) => {
    const table = options.table
    const insert = getTableAction(table, options.action)

    db.transaction(
      tx => {
        tx.executeSql(insert, options.data)
        tx.executeSql('SELECT * FROM ' + table, [], (transaction, result) => {
          resolve(result.rows.raw())
        })
      },
      reject,
      () => {
        console.log('insert: ' + table)
      }
    )
  })
}

// stuff
// this.props.navigation.fetch()

// const options = {
//   table: 'friends',
//   action: 'where',
//   data: [14]
// }
//
// executeTransaction(options, (result) => {
//   console.log("callback");
//   console.log(JSON.parse(result.rows._array[0].data).data);
// });

// const options = {
//   name: 'friends',
//   action: 'insert',
//   data: ["data", "type", JSON.stringify({data: 1, that: "this"})]
// }
// //
// insertRecord(options).then(result => {
//   console.log("callback");
//   console.log(result.rows);
// });
