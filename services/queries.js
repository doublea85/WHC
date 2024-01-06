import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('DateTimeData.db');

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

export const wipeDatabase = () => {
  db.transaction(
    (tx) => {
      tx.executeSql('DROP TABLE DateTimeData;', [], (_, result) => {
        console.log('Database wiped successfully.');
      });
    },
    (error) => {
      console.error('Error wiping database:', error);
    }
  );
};

// CREATE operation
export const addDateTimeData = (startDate, endDate, timeDifference, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO DateTimeData (startDate, endDate, timeDifference) VALUES (?, ?, ?);',
        [startDate, endDate, timeDifference],
        (_, result) => {
          callback(result.insertId); // Pass the inserted ID to the callback
        },
        (_, error) => {
          console.error('Error adding DateTimeData:', error);
        }
      );
    }
  );
};

// READ operation
export const getAllDateTimeData = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql('SELECT * FROM DateTimeData;', [], (_, result) => {
        callback(result.rows._array);
      });
    }
  );
};

// UPDATE operation
export const updateDateTimeData = (id, startDate, endDate, timeDifference, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'UPDATE DateTimeData SET startDate=?, endDate=?, timeDifference=? WHERE id=?;',
        [startDate, endDate, timeDifference, id],
        (_, result) => {
          callback(result.rowsAffected);
        },
        (_, error) => {
          console.error('Error updating DateTimeData:', error);
        }
      );
    }
  );
};

// DELETE operation
export const deleteDateTimeData = (id, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql('DELETE FROM DateTimeData WHERE id=?;', [id], (_, result) => {
        if (callback && typeof callback === 'function') {
          callback(result.rowsAffected);
        }
      });
    }
  );
};


export default db;

