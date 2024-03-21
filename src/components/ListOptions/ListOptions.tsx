export interface IMovieLabel {
  value: number;
  label: string;
}

function ListOptions({ options, selectedOption, onChange, onClear }: { options: IMovieLabel[], selectedOption: IMovieLabel, onChange: Function, onClear: Function }) {

  return (
    <>
      <select onChange={() => onChange()}>
        <option value="DEFAULT">Selecione</option>
        {options.map(item => <option key={`option-${item.value}-${item.label}`} selected={selectedOption.value === item.value} value={item.value}>{item.label}</option>)}
      </select>
      <button onClick={() => onClear()}>Limpar</button>
    </>
  );
}

export default ListOptions;
