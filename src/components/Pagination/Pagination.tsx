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
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [displayPages, setDisplayPages] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const createArrayPageToDisplay = (page: number) => {
    let newDisplay: number[] = displayPages;
    if (!newDisplay.includes(page)) {
      newDisplay = [];
      let index;

      if (page > displayPages[0]) {
        index = page;
      } else {
        index = displayPages[0] - 10;
      }

      for (index; newDisplay.length < 10 && index <= totalPages; index += 1) {
        newDisplay.push(index);
      }
      setDisplayPages(newDisplay);
    }
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
            onSelectPage({ current: currentPage - 1, total: totalPages })
          }
        >
          Anterior
        </button>
      )}
      {!displayPages.includes(1) && ( // NOT NEEDED?
        <button
          type="button"
          onClick={() =>
            onSelectPage({ current: displayPages[0] - 10, total: totalPages })
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
            onSelectPage({ current: Number(value), total: totalPages });
          }}
        >
          {item}
        </button>
      ))}
      {!displayPages.includes(totalPages) && ( // NOT NEEDED?
        <button
          type="button"
          onClick={() =>
            onSelectPage({ current: displayPages[0] + 10, total: totalPages })
          }
        >
          &gt;&gt;
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={() =>
            onSelectPage({ current: currentPage + 1, total: totalPages })
          }
        >
          Proximo
        </button>
      )}
    </div>
  );
}

export default Pagination;
