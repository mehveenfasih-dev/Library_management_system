import { Backdrop, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { selectIsLoading } from "../../store/slices/appSlice"

const Loader = () => {
  const loading = useSelector(selectIsLoading)

  return (
    <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 10, color: "#fff" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loader
