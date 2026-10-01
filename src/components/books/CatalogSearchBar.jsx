import { useRef } from "react"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { Clear, Search } from "@mui/icons-material"
import PropTypes from "prop-types"
import { useLocale } from "../../providers/LocaleProvider"

const CatalogSearchBar = ({ value, onChange }) => {
  const { t } = useLocale()
  const inputRef = useRef(null)

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={t("Search by title, author or keyword")}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <IconButton size="small" onClick={handleClear} aria-label={t("Clear search")}>
                  <Clear fontSize="small" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 60,
          borderRadius: 30,
          backgroundColor: "background.paper",
          fontSize: "1.05rem",
          px: 2,
        },
      }}
    />
  )
}

CatalogSearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CatalogSearchBar
