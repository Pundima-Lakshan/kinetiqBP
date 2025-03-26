import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { createSwapy, SlotItemMapArray, Swapy, utils } from 'swapy';
import { useSyncedState } from '@/utils';

import './styles.css';

export type Item = {
  id: string;
  component: ReactNode;
  layout?: {
    column?: {
      span: number;
    };
    row?: {
      span: number;
    };
  };
};

interface SwapyReactiveProps {
  items: Item[];
  numRows?: number;
  numCols?: number;
  setItems?: Dispatch<SetStateAction<Item[]>>;
  slotHeight?: number;
}

export const SwapyReactive = ({ items, numCols = 4, numRows = 1, slotHeight = 200 }: SwapyReactiveProps) => {
  const { state: gridMatrix } = useSyncedState<Item[]>({
    getter: () => {
      // return items;
      const matrix: Item[][] = Array.from({ length: numRows }, () => Array(numCols).fill(null));

      const findNextAvailableSpace = (rowSpan: number, colSpan: number): { row: number; col: number } | null => {
        for (let row = 0; row <= numRows - rowSpan; row++) {
          for (let col = 0; col <= numCols - colSpan; col++) {
            // Check if the space is available (all cells in the span are null)
            let isAvailable = true;
            for (let r = row; r < row + rowSpan; r++) {
              for (let c = col; c < col + colSpan; c++) {
                if (matrix[r][c] !== null) {
                  isAvailable = false;
                  break;
                }
              }
              if (!isAvailable) break;
            }

            // If available space found, return the top-left corner of the span
            if (isAvailable) {
              return { row, col };
            }
          }
        }
        return null; // If no space found, return null
      };

      // Fill the matrix with the items
      items.forEach((item) => {
        const colSpan = item.layout?.column?.span ?? 1; // Default column span is 1 if not provided
        const rowSpan = item.layout?.row?.span ?? 1; // Default row span is 1 if not provided

        // Find the next available space based on the row and column spans
        const availableSpace = findNextAvailableSpace(rowSpan, colSpan);

        if (availableSpace) {
          const { row: startRow, col: startCol } = availableSpace;

          // Place the item in the grid based on the found position and its span
          for (let r = startRow; r < startRow + rowSpan; r++) {
            for (let c = startCol; c < startCol + colSpan; c++) {
              matrix[r][c] = item;
            }
          }
        }
      });

      // Fill empty spots with DummyItems
      const gridWithDummies: Item[] = [];
      const addedIds = new Set<string>(); // Track added items by their unique IDs

      matrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (!cell) {
            const dummyItem = {
              id: `dummy-${rowIndex}-${colIndex}`,
              component: (
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    opacity: 0,
                  }}
                >
                  0
                </div>
              ),
            };

            // Only add the dummy item if it hasn't been added before
            if (!addedIds.has(dummyItem.id)) {
              gridWithDummies.push(dummyItem);
              addedIds.add(dummyItem.id); // Mark the dummy item as added
            }
          } else {
            // If the cell has an item, ensure it's not added twice
            if (!addedIds.has(cell.id)) {
              gridWithDummies.push(cell);
              addedIds.add(cell.id); // Mark the actual item as added
            }
          }
        });
      });

      return gridWithDummies;
    },
    deps: [items],
  });

  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(gridMatrix, 'id'));
  const slottedItems = useMemo(() => utils.toSlottedItems(gridMatrix, 'id', slotItemMap), [gridMatrix, slotItemMap]);
  const swapyRef = useRef<Swapy | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => utils.dynamicSwapy(swapyRef.current, gridMatrix, 'id', slotItemMap, setSlotItemMap), [gridMatrix]);

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      // animation: 'dynamic'
      autoScrollOnDrag: true,
      // swapMode: 'drop',
      enabled: false,
      // dragAxis: 'x',
      // dragOnHold: true,
    });

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray);
    });

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className="items" style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
        {slottedItems.map(({ slotId, itemId, item }) => (
          <div
            className="slot"
            key={slotId}
            data-swapy-slot={slotId}
            style={{
              gridRow: item?.layout?.row?.span != null ? `span ${item?.layout?.row?.span}` : undefined,
              gridColumn: item?.layout?.column?.span != null ? `span ${item?.layout?.column?.span}` : undefined,
              height: `${slotHeight}px`,
            }}
          >
            {item && (
              <div className="item" data-swapy-item={itemId} key={itemId}>
                {item.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
