import { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  onSelectPage,
}: {
  currentPage: number;
  totalPages: number;
  onSelectPage: Function;
}) {
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [displayPages, setDisplayPages] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const createArrayPageToDisplay = (page: number) => {
    let newDisplay: number[] = displayPages;
    let index = 1;
    if (totalPages < newDisplay[newDisplay.length - 1]) {
      newDisplay = [];
      for (index; index <= totalPages; index += 1) {
        newDisplay.push(index);
      }
    }
    if (!newDisplay.includes(page)) {
      newDisplay = [];
      if (page > displayPages[0]) {
        index = displayPages[9] + 1;
      } else {
        index = displayPages[0] - 10;
      }
      for (index; newDisplay.length < 10 && index <= totalPages; index += 1) {
        newDisplay.push(index);
      }
    }
    setDisplayPages(newDisplay);

    return displayPages;
  };

  const updateButtonsState = () => {
    if (currentPage === 1) {
      setHasPrevious(false);
      setHasNext(true);
    } else if (currentPage === totalPages) {
      setHasPrevious(true);
      setHasNext(false);
    } else {
      setHasPrevious(true);
      setHasNext(true);
    }
  };

  useEffect(() => {
    updateButtonsState();
    createArrayPageToDisplay(currentPage);
  }, [currentPage, displayPages]);

  return (
    <div>
      {hasPrevious && (
        <button
          type="button"
          onClick={() =>
            onSelectPage({ currentPage: currentPage - 1, totalPages })
          }
        >
          Anterior
        </button>
      )}
      {!displayPages.includes(1) && ( // NOT NEEDED?
        <button
          type="button"
          onClick={() =>
            onSelectPage({ currentPage: displayPages[0] - 10, totalPages })
          }
        >
          &lt;&lt;
        </button>
      )}
      {displayPages.map((item) => (
        <button
          type="button"
          value={item}
          key={`page-${item}`}
          className={item === currentPage ? "current-page" : ""}
          onClick={(e) => {
            const { target } = e;
            const { value } = target as HTMLButtonElement;
            onSelectPage({ currentPage: Number(value), totalPages });
          }}
        >
          {item}
        </button>
      ))}
      {!displayPages.includes(totalPages) && ( // NOT NEEDED?
        <button
          type="button"
          onClick={() =>
            onSelectPage({ currentPage: displayPages[0] + 10, totalPages })
          }
        >
          &gt;&gt;
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={() =>
            onSelectPage({ currentPage: currentPage + 1, totalPages })
          }
        >
          Proximo
        </button>
      )}
    </div>
  );
}

export default Pagination;
