import db from './db';


/* ------------------- CREATE ------------------- */
export const saveDateTimeData = (startDate, endDate, timeDifference, onSuccess, onError) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO DateTimeData (startDate, endDate, timeDifference) VALUES (?, ?, ?);',
        [startDate.toISOString(), endDate.toISOString(), timeDifference],
        (_, results) => {
          console.log('Data saved successfully');
          if (onSuccess) {
            onSuccess(results);
          }
        },
        (_, error) => {
          console.error('Error saving data:', error);
          if (onError) {
            onError(error);
          }
        }
      );
    },
    (error) => {
      console.error('Transaction error:', error);
      if (onError) {
        onError(error);
      }
    }
  );
};



/* ------------------- READ ------------------- */

export const getAllDateTimeData = (onSuccess, onError) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM DateTimeData;',
        [],
        (_, results) => {
          const rows = results.rows;
          const data = Array.from({ length: rows.length }, (_, i) => rows.item(i));
          // Alternatively, using spread syntax:
          // const data = Array.from({ length: rows.length }, (_, i) => ({ ...rows.item(i) }));

          if (onSuccess) {
            onSuccess(data);
          }
        },
        (_, error) => {
          console.error('Error retrieving data:', error);
          if (onError) {
            onError(error);
          }
        }
      );
    },
    (error) => {
      console.error('Transaction error:', error);
      if (onError) {
        onError(error);
      }
    }
  );
};


/* ------------------- UPDATE ------------------- */

export const updateDateTimeData = (id, startDate, endDate, timeDifference, onSuccess, onError) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'UPDATE DateTimeData SET startDate = ?, endDate = ?, timeDifference = ? WHERE id = ?;',
        [startDate.toDateString(), endDate.toDateString(), timeDifference, id],
        (_, results) => {
          console.log('Data updated successfully');
          if (onSuccess) {
            onSuccess(results);
          }
        },
        (_, error) => {
          console.error('Error updating data:', error.message);
          if (onError) {
            onError(error);
          }
        }
      );
    },
    (error) => {
      console.error('Transaction error:', error.message);
      if (onError) {
        onError(error);
      }
    }
  );
};



/* ------------------- Delete ------------------- */
export const deleteDateTimeData = (id, onSuccess, onError) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM DateTimeData WHERE id = ?;',
        [id],
        (_, results) => {
          console.log('Data deleted successfully');
          if (onSuccess) {
            onSuccess(results);
          }
        },
        (_, error) => {
          console.error('Error deleting data:', error.message);
          if (onError) {
            onError(error);
          }
        }
      );
    },
    (error) => {
      console.error('Transaction error:', error.message);
      if (onError) {
        onError(error);
      }
    }
  );
};