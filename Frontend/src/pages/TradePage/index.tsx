import { Box, makeStyles, useTheme } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import DropDown from "../../components/molecules/DropDown/DropDown";
import Footer from "../../components/molecules/Footer";
import SearchComponent from "../../components/molecules/SearchBar";
import Header from "../../components/organisms/Header";
import SideNavBar from "../../components/organisms/SideNavBar/SideNavBar";
import TradeTable, {
  SetWatchEventHandler,
} from "../../components/organisms/Table";
import BasicTemplate, {
  BasicTemplateProps,
} from "../../components/templates/BasicTemplate";
import {
  assetsSelectionDefault,
  assetsSelections,
  textSearchAllAssets,
  timePeriodsSelectionDefault,
  timePeriodsSelections,
} from "../../utils/constants";
import { SortEventHandler } from "../../utils/table-utils";
import BasePageProps from "../base-page-props.type";
import Avatar from "../../assets/icons/profile.png";
import { getCurrencies, putWatchlist } from "../../services/apiServices";
import { Currency } from "../../types/responseTypes";
const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    marginTop: theme.spacing(2),
  },
}));

const TradePage: React.FC<BasePageProps> = ({
  userId,
  userFullname,
  userAvatarUrl,
}) => {
  const classes = useStyles();
  const [currencies, setCurrencies] = useState<Array<Currency>>([]);

  const fetchNSetTableData = useCallback(async () => {
    const data = await getCurrencies();
    setCurrencies(data);
    console.log(data);
  }, [setCurrencies]);

  useEffect(() => {
    fetchNSetTableData();
  }, []);

  const setWatch: SetWatchEventHandler = async (dataIndex, watch) => {
    let newCurrrencies = currencies.slice();
    let curr = newCurrrencies[dataIndex];
    curr.watch = watch;
    setCurrencies(newCurrrencies);
    try {
      await putWatchlist(curr.id, watch);
    } catch (e) {
      console.error(`Error updating watchlist ${e}`);
      newCurrrencies = newCurrrencies.slice();
      curr = newCurrrencies[dataIndex];
      // If failed revert the watch to back
      curr.watch = !watch;
      setCurrencies(newCurrrencies);
    }
  };

  const setWatchCallback = useCallback(setWatch, [currencies, setCurrencies]);

  const onSort: SortEventHandler<Currency> = (fieldPicker, direction) => {
    const newCurrrencies = currencies.slice();
    if (direction == "none") {
      newCurrrencies.sort((a, b) => a.id - b.id);
    } else if (direction == "asc") {
      newCurrrencies.sort((a, b) => fieldPicker(a) - fieldPicker(b));
    } else {
      newCurrrencies.sort((a, b) => fieldPicker(b) - fieldPicker(a));
    }
    setCurrencies(newCurrrencies);
  };

  const theme = useTheme();
  const body = (
    <Box margin={6}>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        gridColumnGap={theme.spacing(3)}
        data-testid="search-control"
      >
        <SearchComponent label={textSearchAllAssets} variant="outlined" />
        <DropDown
          default={timePeriodsSelectionDefault}
          dropDownList={timePeriodsSelections}
        />
        <DropDown
          default={assetsSelectionDefault}
          dropDownList={assetsSelections}
        />
      </Box>
      <Box className={classes.tableWrapper}>
        <TradeTable
          data={currencies}
          setWatch={setWatchCallback}
          onSort={onSort}
        />
      </Box>
    </Box>
  );

  const templateProps: BasicTemplateProps = {
    sideNav: <SideNavBar />,
    header: (
      <Header title="Trade" avatarPicUrl={Avatar} avatarPicAlt={userFullname} />
    ),
    body: body,
    footer: <Footer />,
  };
  return <BasicTemplate {...templateProps} />;
};

export default TradePage;
