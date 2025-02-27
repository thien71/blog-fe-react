const Select = ({ options, value, onChange }) => (
  <select
    className="border rounded p-2 w-full focus:outline-none"
    value={value}
    onChange={onChange}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
