import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('DateTimeData.db'); // Open or create a database named 'DateTimeData.db'

export const initDatabase = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS DateTimeData (id INTEGER PRIMARY KEY AUTOINCREMENT, startDate TEXT, endDate TEXT, timeDifference TEXT);'
      );
    },
    (error) => {
      console.error('Error initializing database:', error);
    }
  );
};

export default db;