import { Breadcrumbs,Link, Typography } from "@mui/material";
import {  Link as RouterLink,matchPath, useLocation } from "react-router-dom";
import { routeConfig } from "../../app/routeConfig";
import { ROUTES } from "../../routes/routeConstants";
 const AppBreadcrumbs=()=>{
    const location=useLocation();
   const currentRoute= routeConfig.find((route)=>matchPath(route.path,location.pathname));
const isBookDetails=matchPath( ROUTES.BOOK_DETAILS,location.pathname)
    return(
       <Breadcrumbs
  separator="›"
sx={{
    width: "max-content",
    maxWidth: "100%",
    "& .MuiBreadcrumbs-ol": {
      display: "flex",
      flexWrap: "nowrap !important",
      alignItems: "center",
      whiteSpace: "nowrap",
    },
    "& .MuiBreadcrumbs-li": {
      whiteSpace: "nowrap",
    },
  }}
>
  <Link
    component={RouterLink}
    to={ROUTES.DASHBOARD}
    underline="none"
    color="text.secondary"
    sx={{
      "&:hover": {
        color: "primary.main",
      },
    }}
  >
    Dashboard
  </Link>

  {isBookDetails &&

      <Link
        component={RouterLink}
        to={ROUTES.BOOKS}
        underline="none"
        color="text.secondary"
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        Books
      </Link>

 }
 

  <Typography
      color="text.primary"
      fontWeight={600}
      sx={{ whiteSpace: "nowrap" }}
    >
      {isBookDetails ? "Book Details" : currentRoute?.breadcrumb}
    </Typography>
  
</Breadcrumbs>
    )
 }
 export default AppBreadcrumbs