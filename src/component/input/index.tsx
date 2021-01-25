import React from "react";
import "./style.css";

type Props = {
  title: string;
  field: string;
  isRequired: boolean;
  onChange: (value: any, field: string) => void;
  value: any;
  placeholder: string;
  borderBottomStyle?: string;
  additionalElement?: any;
  disabled?: boolean;
};

function Input({
  title,
  field,
  isRequired,
  onChange,
  value,
  placeholder = "请输入内容",
  borderBottomStyle,
  additionalElement,
  disabled,
}: Props) {
  const handleChange = (e: any) => {
    onChange && onChange(e.target.value, field);
  };
  return (
    <div className={"input-wrap"} style={{ borderBottom: borderBottomStyle }}>
      <div className="input-left">
        <span className="input-title">{title}</span>
        {isRequired && <span className={"input-title-isrequired"}>*</span>}
      </div>
      <div className="input-right">
        <input
          autoComplete="off"
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {additionalElement && (
        <div className="additional">{additionalElement}</div>
      )}
    </div>
  );
}

export default Input;
