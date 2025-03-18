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

    const hasMoreDisplayedPagesThanTotalPages =
      totalPages < newDisplay[newDisplay.length - 1];
    if (hasMoreDisplayedPagesThanTotalPages) {
      newDisplay = [];
      for (index; index <= totalPages; index += 1) {
        newDisplay.push(index);
      }
    } else {
      newDisplay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    const displayedPagesContainsPage = newDisplay.includes(page);
    if (!displayedPagesContainsPage) {
      newDisplay = [];
      const pageIsHigher = page > displayPages[9];
      if (pageIsHigher) {
        index = displayPages[9] + 1;
        while (index + 10 <= page) {
          index += 10;
        }
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
  }, [currentPage, totalPages]);

  return (
    <div>
      <button
        type="button"
        disabled={!hasPrevious}
        onClick={() => onSelectPage(currentPage - 1)}
      >
        Anterior
      </button>
      {!displayPages.includes(1) && ( // NOT NEEDED?
        <button
          type="button"
          onClick={() => onSelectPage(displayPages[0] - 10)}
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
            onSelectPage(Number(value));
          }}
        >
          {item}
        </button>
      ))}
      {!displayPages.includes(totalPages) && ( // NOT NEEDED?
        <button
          type="button"
          onClick={() => onSelectPage(displayPages[0] + 10)}
        >
          &gt;&gt;
        </button>
      )}
      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onSelectPage(currentPage + 1)}
      >
        Proximo
      </button>
    </div>
  );
}

export default Pagination;
