import {
  Box,
  ButtonBase,
  IconButton,
  makeStyles,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Star, StarBorderOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import upDownArrow from "../../../assets/icons/code-line.svg";
import { CurrencySummary } from "../../../types/currency.type";
import { Currency } from "../../../types/responseTypes";
import localeUtils from "../../../utils/locale-utils";
import {
  FieldPicker,
  SortDirection,
  SortEventHandler,
  tradeTableHeaders,
} from "../../../utils/table-utils";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    boxSizing: "border-box",
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      boxShadow: `0px 2px 4px ${theme.palette.grey[300]}`,
    },
  },
  tableStartCell: {
    borderLeft: `1px solid ${theme.palette.grey[100]}`,
  },
  tableEndCell: {
    borderRight: `1px solid ${theme.palette.grey[100]}`,
  },
  table: {
    borderCollapse: "separate",
    borderSpacing: theme.spacing(0, 3),
  },
  changeStylePositive: {
    color: theme.palette.success[500],
  },
  changeStyleNegative: {
    color: theme.palette.error[500],
  },
  currency: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: theme.spacing(1),
  },
  currencyCode: {
    color: `${theme.palette.text.secondary}`,
  },
  currencyImage: {
    width: "42px",
    height: "42px",
    borderRadius: "100px",
  },
  nameCellContent: {
    marginLeft: theme.spacing(4),
  },
}));

const TradeTableHeaderCell = styled(TableCell)({
  border: "none",
});

const TradeTableDataCell = styled(TableCell)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.grey[100]}`,
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}));

const HeaderTableCellTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey["500"],
}));

export type SetWatchEventHandler = (dataIndex: number, watch: boolean) => void;

export type TableProps = {
  data: Array<Currency>;
  setWatch: SetWatchEventHandler;
  onSort?: SortEventHandler<Currency>;
};

const TradeTable: React.FC<TableProps> = ({ data, setWatch, onSort }) => {
  const toggleWatch = (dataIndex: number) => {
    setWatch(dataIndex, !data[dataIndex].watch);
  };

  const [sortDirections, setSortDirections] = useState(
    new Map<string, SortDirection>(
      tradeTableHeaders
        .filter(({ sort }) => sort)
        .map(({ label }): [string, SortDirection] => [label, "none"]),
    ),
  );

  const toggleSort = (label: string, fieldPicker: FieldPicker<Currency>) => {
    const newSortDirections = new Map(sortDirections);
    const currDir = newSortDirections.get(label);
    let newDir: SortDirection = "none";
    if (currDir == "none") {
      newDir = "asc";
    } else if (currDir == "asc") {
      newDir = "desc";
    }
    newSortDirections.set(label, newDir);
    setSortDirections(newSortDirections);
    if (onSort) {
      onSort(fieldPicker, newDir);
    }
  };

  const classes = useStyles();

  const tableBody = data.map(
    (
      {
        logoUrl,
        name,
        price,
        changeRate,
        marketCap,
        watch,
        code,
        currencyType,
      },
      index,
    ) => {
      const changeStyleCN =
        changeRate >= 0
          ? classes.changeStylePositive
          : classes.changeStyleNegative;
      const changeSign = changeRate > 0 ? "+" : "";
      if (currencyType === "CRYPTO")
        return (
          <TableRow className={classes.tableRow} key={index}>
            <TradeTableDataCell className={classes.tableStartCell}>
              <Box className={classes.nameCellContent} display="flex">
                <img
                  src={logoUrl}
                  className={classes.currencyImage}
                  alt="currency image"
                />

                <Box className={classes.currency}>
                  <Typography variant="body1">{name}</Typography>

                  <Typography
                    variant="overline"
                    className={classes.currencyCode}
                  >
                    {code}
                  </Typography>
                </Box>
              </Box>
            </TradeTableDataCell>
            <TradeTableDataCell>
              <Typography variant="body2" data-testid="price">
                {localeUtils.formatCurr(price)}
              </Typography>
            </TradeTableDataCell>

            <TradeTableDataCell>
              <Typography
                className={changeStyleCN}
                variant="body2"
                data-testid="change"
              >
                {changeSign}
                {changeRate}%
              </Typography>
            </TradeTableDataCell>

            <TradeTableDataCell>
              <Typography variant="body2" data-testid="marketCap">
                {localeUtils.abbreviateCurrency(marketCap)}
              </Typography>
            </TradeTableDataCell>

            <TradeTableDataCell className={classes.tableEndCell}>
              <IconButton
                onClick={() => toggleWatch(index)}
                data-testid="watch-toggle"
              >
                {watch ? (
                  <Star data-testid="watch" color="primary" />
                ) : (
                  <StarBorderOutlined data-testid="watch" />
                )}
              </IconButton>
            </TradeTableDataCell>
          </TableRow>
        );
    },
  );

  const tableHeader = tradeTableHeaders.map(
    ({ label, sort, sortFieldPicker }, i) => {
      let cellContent;
      if (sort && sortFieldPicker) {
        cellContent = (
          <ButtonBase
            onClick={() => toggleSort(label, sortFieldPicker)}
            data-testid="sort-toggle"
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <HeaderTableCellTypography variant="caption">
                {label}
              </HeaderTableCellTypography>
              <img
                src={upDownArrow}
                alt=""
                style={{ transform: "rotate(90deg)" }}
                height="15px"
                width="15px"
              />
            </Box>
          </ButtonBase>
        );
      } else {
        cellContent = (
          <HeaderTableCellTypography
            variant="caption"
            className={i == 0 ? classes.nameCellContent : undefined}
          >
            {label}
          </HeaderTableCellTypography>
        );
      }
      return <TradeTableHeaderCell key={i}>{cellContent}</TradeTableHeaderCell>;
    },
  );

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{tableHeader}</TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradeTable;
