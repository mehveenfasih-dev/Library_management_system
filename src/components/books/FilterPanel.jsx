import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material"
import { CategoryOutlined, Sort } from "@mui/icons-material"
import PropTypes from "prop-types"
import { BOOK_CATEGORIES, SORT_OPTIONS } from "../../constants/app"
import { useLocale } from "../../providers/LocaleProvider"

const FilterPanel = ({ filters, onChange }) => {
  const { t } = useLocale()

  return (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" }, mb: 3 }}>
    <FormControl size="small" sx={{ width: { xs: "100%", sm: 220 } }}>
      <InputLabel id="catalog-category-label">{t("Category")}</InputLabel>
      <Select
        labelId="catalog-category-label"
        label={t("Category")}
        value={filters.category}
        startAdornment={
          <InputAdornment position="start">
            <CategoryOutlined fontSize="small" />
          </InputAdornment>
        }
        onChange={(event) => onChange({ category: event.target.value })}
      >
          <MenuItem value="">{t("All categories")}</MenuItem>
          {BOOK_CATEGORIES.map((item) => (
            <MenuItem key={item} value={item}>
              {t(item)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>

    <FormControl size="small" sx={{ width: { xs: "100%", sm: 220 } }}>
      <InputLabel id="catalog-sort-label">{t("Sort by")}</InputLabel>
      <Select
        labelId="catalog-sort-label"
        label={t("Sort by")}
        value={filters.sort}
        startAdornment={
          <InputAdornment position="start">
            <Sort fontSize="small" />
          </InputAdornment>
        }
        onChange={(event) => onChange({ sort: event.target.value })}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {t(option.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControlLabel
      control={
        <Switch
          checked={filters.availableOnly}
          onChange={(event) => onChange({ available: event.target.checked })}
        />
      }
      label={t("Available only")}
      sx={{ ml: { sm: 1 }, mr: 0 }}
    />
  </Stack>
  )
}

FilterPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default FilterPanel
