import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DepositAndWithdraw from "../../components/molecules/CardWithButtons/index";
import DropDown from "../../components/molecules/DropDown/DropDown";
import Footer from "../../components/molecules/Footer";
import TotalBalance from "../../components/molecules/TotalBalance";
import Header from "../../components/organisms/Header";
import SideNavBar from "../../components/organisms/SideNavBar/SideNavBar";
import TransactionList from "../../components/organisms/TransactionList";
import BasicTemplate from "../../components/templates/BasicTemplate";
import DetailTemplate from "../../components/templates/Detail/index";
import { wallet, profilePicName } from "../../utils/constants";
import SearchFilter from "../../components/molecules/SearchwithFilter";
import theme from "../../theme/theme";
import Avatar from "../../assets/icons/profile.png";
import { getWallets, getWalletTransactions } from "../../services/apiServices";

const dropdownList = [
  {
    key: "1M",
    value: "1M",
  },
];

const WalletPage: React.FC = () => {
  const [totalBalanceInDollar, setTotalBalanceInDollar] = useState<number>();
  const [transactionList, setTransactionList] = useState<any>([]);
  let cashId: number;
  const totalBalanceFunction = async () => {
    try {
      const totalBalance = await getWallets();

      const data: any = totalBalance;

      data.forEach((wallet: { currencyType: string; id: number }) => {
        if (wallet.currencyType === "CASH") cashId = wallet.id;
      });
      setTotalBalanceInDollar(
        data.filter((wallet: { currencyType: string }) => {
          return wallet.currencyType === "CASH";
        })[0].amount,
      );
      transactionsFunction();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    totalBalanceFunction();
  }, [totalBalanceInDollar]);
  const transactionsFunction = async () => {
    try {
      const transactions: any = await getWalletTransactions(cashId);
      setTransactionList(transactions.data);
      console.log(transactions.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    totalBalanceFunction();
    if (cashId) transactionsFunction();
  }, []);
  return (
    <BasicTemplate
      bgColor={"#FAFCFF"}
      sideNav={<SideNavBar />}
      header={
        <Header
          title="Wallet"
          avatarPicUrl={Avatar}
          avatarPicAlt={profilePicName}
        />
      }
      footer={<Footer />}
      body={
        <DetailTemplate
          CardWithStats={<DepositAndWithdraw />}
          TabComponent={
            <>
              <Typography variant="subtitle2" style={{ color: "#4B4B60" }}>
                {wallet}
              </Typography>
              <br />
              <TotalBalance totalBalanceValueInDollar={totalBalanceInDollar} />

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  gridColumnGap={theme.spacing(3)}
                  style={{
                    paddingTop: "2%",
                    paddingBottom: "1%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <SearchFilter placeholder="Search all assets" />

                  <DropDown default="1M" dropDownList={dropdownList} />
                </Box>
              </Grid>
              <Box style={{ border: "1px solid #E8E8F7" }}>
                <TransactionList data={transactionList} />
              </Box>
            </>
          }
        />
      }
    />
  );
};

export default WalletPage;
