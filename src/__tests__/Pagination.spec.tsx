import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination/Pagination";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Pagination component", () => {
  const handleClick = jest.fn();

  const totalPages = 33;

  describe("is at first page", () => {
    it("render 12 buttons", async () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );
      const btns = await screen.findAllByRole("button");
      expect(btns).toHaveLength(12);
      expect(btns.filter((item) => item.textContent === "1")[0]).toHaveClass(
        "current-page",
      );
    });
  });

  describe("is at third page", () => {
    it("render 13 buttons", async () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );
      const btns = await screen.findAllByRole("button");
      expect(btns).toHaveLength(13);
      expect(btns.filter((item) => item.textContent === "3")[0]).toHaveClass(
        "current-page",
      );
    });
  });

  describe("is at  but one page", () => {
    it("render 13 buttons", async () => {
      render(
        <Pagination
          currentPage={totalPages - 1}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );
      const btns = await screen.findAllByRole("button");
      expect(btns).toHaveLength(6);
      expect(btns.filter((item) => item.textContent === "32")[0]).toHaveClass(
        "current-page",
      );
    });
  });

  describe("is at last page", () => {
    it("render 13 buttons", async () => {
      render(
        <Pagination
          currentPage={totalPages}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );
      const btns = await screen.findAllByRole("button");
      expect(btns).toHaveLength(5);
      expect(btns.filter((item) => item.textContent === "33")[0]).toHaveClass(
        "current-page",
      );
    });
  });

  describe("testing buttons features", () => {
    it("clicks at Anterior Button", async () => {
      const currentPage = 11;
      const pageToGo = currentPage - 1;

      render(
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );

      const anteriorBtn = await screen.findByText("Anterior");
      expect(anteriorBtn).toBeInTheDocument();
      fireEvent.click(anteriorBtn);
      expect(handleClick).toHaveBeenCalledWith({
        current: pageToGo,
        total: totalPages,
      });
    });

    it("clicks at Proximo Button", async () => {
      const currentPage = 11;
      const pageToGo = currentPage + 1;

      render(
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );

      const proximoBtn = await screen.findByText("Proximo");
      expect(proximoBtn).toBeInTheDocument();
      fireEvent.click(proximoBtn);
      expect(handleClick).toHaveBeenCalledWith({
        current: pageToGo,
        total: totalPages,
      });
    });
    it("clicks at another page Button", async () => {
      const currentPage = 11;
      const pageToGo = 18;

      render(
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );

      const pageToGoBtn = await screen.findByText(pageToGo);
      expect(pageToGoBtn).toBeInTheDocument();
      fireEvent.click(pageToGoBtn);
      expect(handleClick).toHaveBeenCalledWith({
        current: pageToGo,
        total: totalPages,
      });
    });

    it("clicks at << page Button", async () => {
      const currentPage = 11;
      const pageToGo = 1;

      render(
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );

      const backwardBtn = await screen.findByText('<<');
      expect(backwardBtn).toBeInTheDocument();
      fireEvent.click(backwardBtn);
      expect(handleClick).toHaveBeenCalledWith({
        current: pageToGo,
        total: totalPages,
      });
    });

    it("clicks at >> page Button", async () => {
      const currentPage = 11;
      const pageToGo = 21;

      render(
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onSelectPage={handleClick}
        />,
      );

      const forwardBtn = await screen.findByText('>>');
      expect(forwardBtn).toBeInTheDocument();
      fireEvent.click(forwardBtn);
      expect(handleClick).toHaveBeenCalledWith({
        current: pageToGo,
        total: totalPages,
      });
    });
  });
});
