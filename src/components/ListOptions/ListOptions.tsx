export interface IMovieLabel {
  value: number;
  label: string;
}

function ListOptions({
  options,
  selectedOption,
  onChange,
  onClear,
}: {
  options: IMovieLabel[];
  selectedOption: IMovieLabel | null;
  onChange: Function;
  onClear: Function;
}) {
  return (
    <>
      <select
        value={selectedOption?.value || "default"}
        onChange={(event) => {
          if (event.target.value !== "default") {
            onChange(Number(event.target.value));
          } else {
            onChange(null);
          }
        }}
      >
        <option value="default">Selecione</option>
        {options.map((item) => (
          <option key={`option-${item.value}-${item.label}`} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => onClear()}>
        Limpar
      </button>
    </>
  );
}

export default ListOptions;
