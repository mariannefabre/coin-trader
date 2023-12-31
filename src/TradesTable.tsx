import { useState, useMemo } from "react";
import { Trade } from "./types";
import { styled } from "styled-components";

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
  const { entries, requestSort, sortConfig } = useSortableData(trades);

  const sortedEntries = entries?.map((entry) => {
    const date = new Date(entry.time);
    return (
      <tr key={entry.id}>
        <StyledTableData>{entry.price}</StyledTableData>
        <StyledTableData>{Number(entry.qty)}</StyledTableData>
        <StyledTableData>{date.toTimeString().slice(0, 8)}</StyledTableData>
      </tr>
    );
  });

  const displayArrow = (key: Key): string | undefined => {
    return sortConfig?.key === key
      ? sortConfig.direction === Direction.ascending
        ? "▲"
        : "▼"
      : undefined;
  };

  return (
    <StyledTable>
      <StyledCaption>Market Trades</StyledCaption>
      <thead>
        <tr>
          <TableHeader>
            <Header type="button" onClick={() => requestSort(Key.price)}>
              Price
              {displayArrow(Key.price)}
            </Header>
          </TableHeader>
          <TableHeader>
            <Header type="button" onClick={() => requestSort(Key.qty)}>
              Amount
              {displayArrow(Key.qty)}
            </Header>
          </TableHeader>
          <TableHeader>
            <Header type="button" onClick={() => requestSort(Key.time)}>
              Time
              {displayArrow(Key.time)}
            </Header>
          </TableHeader>
        </tr>
      </thead>
      <tbody>{sortedEntries}</tbody>
    </StyledTable>
  );
};

const useSortableData = (entries: Trade[], config = null) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({
    key: Key.time,
    direction: Direction.ascending,
  });

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

const StyledTable = styled.table`
  background-color: #fafafa;
  padding: 22px;
  border-spacing: 10px 0px;

  @media (min-width: 512px) {
    border-spacing: 24px 0px;
  }
`;

const TableHeader = styled.th`
  padding: 0;
`;

const Header = styled.button`
  border: none;
  background: none;
  color: rgb(159, 159, 159);
  font-size: 12px;
  padding: 6px 26px;
`;

const StyledTableData = styled.td`
  padding: 4px 0px;
  font-size: 12px;
  text-align: right;
`;

const StyledCaption = styled.caption`
  background-color: #fafafa;
  font-size: 26px;
  color: rgb(240, 185, 11);
  font-weight: bold;
  text-align: left;
  padding: 28px 26px 0 38px;

  @media (min-width: 512px) {
    padding: 28px 26px 0 52px;
  }
`;
