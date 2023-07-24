import React from "react";
import Box from "@material-ui/core/Box";
import IconComponent from "../../atoms/Icon/IconComponent";
import Website from "../../../assets/icons/Vector.png";
import WhitePaper from "../../../assets/icons/WhitePaper.svg";
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import { aboutCrypto } from "../../../utils/constants";

interface AboutCryptoProps {
  currency: string;
  content: string;
}

const useStyles = makeStyles((theme) => ({
  aboutCurrency: {
    paddingBottom: theme.spacing(6),
  },
  title: {
    paddingBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  links: {
    color: theme.palette.primary.main,
  },
}));

const AboutCrypto: React.FC<AboutCryptoProps> = ({ currency, content }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box>
      <Box className={classes.aboutCurrency}>
        <Typography
          data-testid="currency"
          variant="body1"
          className={classes.title}
        >
          {aboutCrypto[0]} {currency}
        </Typography>

        <Typography variant="body2">{content}</Typography>
      </Box>

      <Box>
        <Typography variant="body1" className={classes.title}>
          {aboutCrypto[1]}
        </Typography>

        <Box>
          <Box>
            <IconComponent icon={Website} /> &nbsp;
            <Typography
              data-testid="website"
              variant="body2"
              className={classes.links}
              style={{ display: "inline" }}
            >
              {aboutCrypto[2]}
            </Typography>
          </Box>
          <Box>
            <IconComponent icon={WhitePaper} /> &nbsp;
            <Typography
              variant="body2"
              className={classes.links}
              style={{ display: "inline" }}
            >
              {aboutCrypto[3]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutCrypto;
