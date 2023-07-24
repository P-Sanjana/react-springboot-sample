import moment from "moment";
export const validateDate = (d: Date): boolean => {
  const date = moment(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  return date.isValid();
};
