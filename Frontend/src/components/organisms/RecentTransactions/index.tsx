import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import theme from "../../../theme/theme";
import Transaction from "../../molecules/Transaction/index";
import { recentTransactions, viewAll } from "../../../utils/constants";
import localeUtils from "../../../utils/locale-utils";
import CheckLine from "../../../assets/icons/check-line.svg";

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

export type RecentTransactionsProps = {
  data: TransactionProps[] | undefined;
};

const useStyles = makeStyles({
  container: {
    padding: theme.spacing(1, 3),
    marginTop: theme.spacing(6),
  },
  rowContent1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
  },
  viewText: {
    color: theme.palette.primary["500"],
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(0, 4),
  },
});

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ data }) => {
  const classes = useStyles();
  const renderTransactions = () => {
    return data?.map((transaction, index) => {
      const formattedDate = localeUtils
        .formatDatetime24h(new Date(transaction.datetime))
        .split(" ");
      return (
        <Box key={index}>
          <Transaction
            date={`${formattedDate[0]} ${formattedDate[1].substr(
              0,
              formattedDate[1].length - 1,
            )} `}
            statusIcon={transaction.status === "PROCESSED" ? CheckLine : ""}
            coin={transaction.currencyName}
            symbol={transaction.currencyCode}
            chipLabel={transaction.type === "BUY" ? "Purchased" : "Sold"}
            coinAmount={transaction.currencyAmount}
            price={transaction.amount}
            iconBgColor="#E9F7EC"
          />
        </Box>
      );
    });
  };
  return (
    <Box className={classes.container}>
      <Box className={classes.rowContent1}>
        <Typography variant="body1">{recentTransactions}</Typography>
        <Typography variant="caption" className={classes.viewText}>
          {viewAll}
        </Typography>
      </Box>
      <Box>{renderTransactions()}</Box>
    </Box>
  );
};

export default RecentTransactions;
