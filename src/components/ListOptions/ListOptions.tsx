function ListOptions({ options, selectedOption, onChange, onClear }) {
    return <>
        <select value={selectedOption?.value} onChange={onChange}>
            {
                options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
            }
        </select>
        <input type="button" onClick={onClear} value="Clear"/>
    </>;
}

export default ListOptions;