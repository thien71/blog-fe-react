const Select = ({ options, value, onChange, className }) => (
  <select
    className={`border rounded p-2 w-full focus:outline-none ${className}`}
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
