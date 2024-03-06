import { useEffect, useState } from "react";
import "./Pagination.css"

function Pagination({ currentPage, totalPages, onSelectPage }: { currentPage: number, totalPages: number, onSelectPage: Function }
) {
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [displayPages, setDisplayPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])


  const createArrayPageToDisplay = (page: number) => {
    let newDisplay: number[] = displayPages
    if (!newDisplay.includes(page)) {
      newDisplay = [];
      if(page > displayPages[0]) {
        for (let index = page; newDisplay.length < 10; index++) {
          newDisplay.push(index)
        }
      } else {
        for (let index = displayPages[0] - 10; newDisplay.length < 10; index++) {
          newDisplay.push(index)
        }
      }
      setDisplayPages(newDisplay)
    }
    return displayPages
  }

  const updateButtonsState = () => {
    if (currentPage === 1) {
      setHasPrevious(false)
      setHasNext(true)
    } else if (currentPage === totalPages) {
      setHasPrevious(true)
      setHasNext(false)
    } else {
      setHasPrevious(true)
      setHasNext(true)
    }
  }

  useEffect(() => {
    updateButtonsState()
    createArrayPageToDisplay(currentPage)
  }, [currentPage])

  return (
    <div>
      {hasPrevious && <button onClick={() => onSelectPage({ current: currentPage - 1, total: totalPages })}>Anterior</button>}
      {displayPages.map(item => <div key={`page-${item}`} className={item === currentPage ? "current-page" : ""}>{item}</div>)}
      {hasNext && <button onClick={() => onSelectPage({ current: currentPage + 1, total: totalPages })}
      >Proximo</button>}
    </div>
  );
}

export default Pagination;
