import React, { useEffect } from "react";
import { Box, Typography, makeStyles, Avatar } from "@material-ui/core";
import CheckLine from "../../../assets/icons/check-line.svg";
import { chooseCrypto } from "../../../utils/constants";
import localeUtils from "../../../utils/locale-utils";

export type selectedCryptoEventHandler = (crypto: any) => void;

export type CryptoProps = {
  icon: string;
  currency: string;
};

export type serverCryptoProps = {
  currency: string;
  price: string;
  symbol: string;
};

export type ChooseCryptoProps = {
  data: Array<any>;
  onSelect: selectedCryptoEventHandler;
  selectedCrypto: any | undefined;
  title: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "460px",
    overflowY: "auto",
    overflowX: "hidden",
    border: "1px solid #E8E8F7",
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  icon: {
    width: "56px",
    height: "56px",
  },
  flexContainer: {
    padding: theme.spacing(3),
    display: "flex",
    height: "414px",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  flexItem: {
    width: "25%",
    height: "160px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    border: `2px solid ${theme.palette.background.paper}`,
  },
  currency: {
    alignText: "center",
    padding: theme.spacing(1),
  },
  price: {
    alignText: "center",
    padding: theme.spacing(1),
    color: theme.palette.text.hint,
  },
  active: {
    border: `2px solid ${theme.palette.primary["500"]}`,
    borderRadius: theme.spacing(1),
  },
  checkIcon: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  nonActive: {
    height: "25px",
  },
  checkIconStyle: {
    width: "25px",
    height: "25px",
  },
  mainTitle: {
    marginTop: theme.spacing(4),
  },
}));

const ChooseCrypto: React.FC<ChooseCryptoProps> = ({
  data,
  onSelect,
  selectedCrypto,
  title,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      onSelect(data[0]);
    }
  }, [data]);
  const renderCryptos = () => {
    return data?.map(
      (
        crypto: {
          name: any;
          price: any;
          symbol?: string;
          currencyType: string;
        },
        index: number,
      ) => {
        return crypto.currencyType === "CRYPTO" ? (
          <Box
            data-testid="select"
            onClick={() => {
              onSelect(crypto);
            }}
            key={index}
            className={`
            ${
              selectedCrypto && selectedCrypto?.name === crypto.name
                ? classes.active
                : ""
            }
             ${classes.flexItem}`}
          >
            <Box
              className={`
            ${
              selectedCrypto && selectedCrypto?.name === crypto.name
                ? classes.checkIcon
                : classes.nonActive
            }
            `}
            >
              {selectedCrypto && selectedCrypto?.name === crypto.name ? (
                <img src={CheckLine} className={classes.checkIconStyle} />
              ) : (
                ""
              )}
            </Box>
            <Avatar
              src={data[index].logoUrl}
              alt={crypto.name}
              className={classes.icon}
            />
            <Typography variant="body1" className={classes.currency}>
              {crypto.name}
            </Typography>
            <Typography variant="caption" className={classes.price}>
              {localeUtils.formatCurr(parseFloat(crypto.price))}
            </Typography>
          </Box>
        ) : (
          ""
        );
      },
    );
  };

  return (
    <Box>
      <Typography variant="subtitle1" className={classes.mainTitle}>
        {title}
      </Typography>
      <Box className={classes.root}>
        <Box>
          <Typography className={classes.title} variant="body1">
            {chooseCrypto}
          </Typography>
          <Box className={classes.flexContainer} data-testid="list">
            {renderCryptos()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChooseCrypto;
