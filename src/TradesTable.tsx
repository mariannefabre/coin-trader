import { useState, useMemo } from "react";
import { Trade } from "./types";

interface TradesTableProps {
  trades: Trade[];
}
enum Key {
  price = "price",
  qty = "qty",
  time = "time",
}
enum Direction {
  ascending = "ascending",
  descending = "descending",
}
type SortConfig = {
  key: Key;
  direction: Direction;
};

export const TradesTable: React.FC<TradesTableProps> = ({ trades }) => {
  const { entries, requestSort } = useSortableData(trades);

  const sortedEntries = entries?.map((entry) => {
    const date = new Date(entry.time);
    return (
      <tr key={entry.id}>
        <td>{entry.price}</td>
        <td>{entry.qty}</td>
        <td>{date.toTimeString().slice(0, 8)}</td>
      </tr>
    );
  });

  return (
    <table>
      <caption>Market Trades</caption>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => requestSort(Key.price)}>
              Price
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort(Key.qty)}>
              Amount
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort(Key.time)}>
              Time
            </button>
          </th>
        </tr>
      </thead>
      <tbody>{sortedEntries}</tbody>
    </table>
  );
};

const useSortableData = (entries: any, config = null) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedEntries = useMemo(() => {
    let sortableEntries = [...entries];
    if (sortConfig !== null) {
      sortableEntries.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === Direction.ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === Direction.ascending ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEntries;
  }, [entries, sortConfig]);

  const requestSort = (key: Key) => {
    let direction = Direction.ascending;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === Direction.ascending
    ) {
      direction = Direction.descending;
    }
    setSortConfig({ key, direction });
  };

  return { entries: sortedEntries, requestSort, sortConfig };
};
