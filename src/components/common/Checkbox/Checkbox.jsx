import './Checkbox.css';

export default function Checkbox({ onChange, value, label, id, wrapperClassname }) {
  return (
    <div className={`checkbox-wrapper ${wrapperClassname}`}>
      <input
        className="checkbox-input"
        type="checkbox"
        id={id}
        name={id}
        checked={value}
        onChange={onChange}
      />
      <label className="checkbox-label" htmlFor="assign">
        {label}
      </label>
    </div>
  );
}
