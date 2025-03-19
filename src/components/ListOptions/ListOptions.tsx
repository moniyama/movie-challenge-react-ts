export interface IMovieLabel {
  value: string;
  label: string;
}

function ListOptions({
  options,
  selectedOption,
  onChange,
  onClear,
  label,
}: {
  options: IMovieLabel[];
  selectedOption: IMovieLabel | null;
  onChange: Function;
  onClear: Function;
  label: string;
}) {
  return (
    <label htmlFor={label}>
      {`${label}: `}
      <select
        id={label}
        value={selectedOption?.value || "default"}
        onChange={(event) => {
          if (event.target.value !== "default") {
            onChange(event.target.value);
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
    </label>
  );
}

export default ListOptions;
