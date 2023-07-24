import React from "react";
import {
  FormControl,
  makeStyles,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import DownArrow from "../../../assets/icons/downarrow.svg";
import IconComponent from "../../atoms/Icon/IconComponent";

const styles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[100]}`,
    boxSizing: "border-box",
    borderRadius: theme.spacing(1),
    height: "40px",
  },
}));

export type DropDownItem = {
  key: string | number;
  value: string | number;
};
export type DropDownProps = {
  default: string | number;
  className?: any;
  dropDownList?: DropDownItem[];
};
const DropDown: React.FC<DropDownProps> = (props) => {
  const style = styles();
  return (
    <FormControl variant={"outlined"} className={props.className}>
      <Select
        className={style.root}
        defaultValue={props.default}
        IconComponent={() => <IconComponent icon={DownArrow} />}
      >
        {props.dropDownList?.map((item: DropDownItem) => {
          return (
            <MenuItem key={item.key} value={item.value}>
              <Typography variant="body1">{item.value}</Typography>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DropDown;
