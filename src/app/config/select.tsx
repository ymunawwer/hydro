const SelectStyle = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid #f3f5fd",
    color: "#384150",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    fontSize: 14,
    transition: "0.5s",
    backgroundColor: state.isFocused
      ? "#dce9fe"
      : state.isSelected
      ? "#FFF"
      : "#FFF",
    cursor: "pointer",
    ":active": { backgroundColor: "#dce9fe" },
    ":focus": {},
  }),
  control: (styles: any) => ({
    ...styles,
    cursor: "pointer",
    transition: "0.5s",
    borderRadius: 4,
    borderColor: "#c4c9d2",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    boxShadow: "none",
    ":hover": { borderColor: "#c4c9d2" },
  }),
};

export default SelectStyle;
