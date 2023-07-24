import React from "react";
import {
  ListItem,
  List,
  Box,
  makeStyles,
  Divider,
  useTheme,
} from "@material-ui/core";
import WalletCard from "../../molecules/WalletTransaction/index";
import { participant } from "../../../utils/constants";
import CheckLine from "../../../assets/icons/check-line.svg";
import localeUtils from "../../../utils/locale-utils";

export type TransactionProps = {
  id: number;
  userId: number;
  walletId: number;
  currencyId: number;
  currencyName: string;
  currencyCode: string;
  type: string;
  status: string;
  currencyAmount: number;
  amount: number;
  participantName: string;
  datetime: string;
};

export type TransactionListProps = {
  data: TransactionProps[];
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "538px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.1em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `${theme.palette.grey[300]}`,
      outline: "3px solid",
      outlineColor: `${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(3),
    },
  },
  separator: {
    border: "none",
    height: "1px",
    marginLeft: "45px",

    backgroundColor: `${theme.palette.grey[100]}`,
  },
  listItem: {
    "&:hover": {
      boxShadow: "0px 1px 10px rgba(44, 44, 44, 0.08)",
    },
  },
}));

const TransactionList: React.FC<TransactionListProps> = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const renderTransactionList = () => {
    return data.map((transaction, index) => {
      const formattedDate = localeUtils
        .formatDatetime24h(new Date(transaction.datetime))
        .split(" ");
      return (
        <Box
          key={index}
          style={{
            padding: theme.spacing(2, 1),
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <ListItem
            alignItems="center"
            style={{ backgroundColor: theme.palette.background.paper }}
            className={classes.listItem}
          >
            <WalletCard
              day={formattedDate[0]}
              month={formattedDate[1].substr(0, formattedDate[1].length - 1)}
              statusIcon={CheckLine}
              coin={transaction.currencyName}
              symbol={transaction.currencyCode}
              chipLabel={transaction.type === "BUY" ? "Purchased" : "Sold"}
              coinAmount={transaction.currencyAmount}
              price={transaction.amount}
              iconBgColor={"#E9F7EC"}
              buyer={
                transaction.type === "BUY"
                  ? participant
                  : transaction.participantName
              }
            />
          </ListItem>
          <Divider variant="middle" className={classes.separator} />
        </Box>
      );
    });
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.container} data-testid="transactionslist">
        <List>{renderTransactionList()}</List>
      </Box>
    </Box>
  );
};

export default TransactionList;
