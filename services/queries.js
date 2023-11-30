import db from './db';

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


// export const getAllDateTimeData = (onSuccess, onError) => {
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         'SELECT * FROM DateTimeData;',
//         [],
//         (_, results) => {
//           const rows = results.rows;
//           const data = [];
//           for (let i = 0; i < rows.length; i++) {
//             data.push(rows.item(i));
//           }
//           if (onSuccess) {
//             onSuccess(data);
//           }
//         },
//         (_, error) => {
//           console.error('Error retrieving data:', error);
//           if (onError) {
//             onError(error);
//           }
//         }
//       );
//     },
//     (error) => {
//       console.error('Transaction error:', error);
//       if (onError) {
//         onError(error);
//       }
//     }
//   );
// };

