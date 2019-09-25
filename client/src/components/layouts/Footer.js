// import React, { Fragment } from "react";

// export default function Footer() {
//   const styles = {
//     footer: {
//       height: "200px",
//       fontSize: "0.875rem"
//     },
//     title: {
//       textAlign: "center",
//       color: "#17a2b8",
//       paddingTop: "100px"
//     }
//   };

//   return (
//     <div style={styles.footer} className="bg-dark">
//       <h1 style={styles.title}>Designed By Itzhak Tzoref</h1>
//     </div>
//   );
// }

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="h6" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/itzhak-tzoref-46177a172/"
      >
        Itzhak Tzoref
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "black",
    color: "#17a2b8",
    position: "sticky",
    bottom: 0,
    width: "100%"
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
