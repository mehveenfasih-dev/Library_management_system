import { useRef, useState } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
} from "@mui/material"
import PropTypes from "prop-types"

import FormInput from "../common/FormInput"
import BookCover from "./BookCover"
import { bookShape } from "./bookPropTypes"
import useForm from "../../hooks/useForm"
import { BOOK_CATEGORIES } from "../../constants/app"
import { readFileAsDataUrl } from "../../utils/readFile"
import { useLocale } from "../../providers/LocaleProvider"

const MAX_IMAGE_BYTES = 1024 * 1024

const rules = {
  title: { required: "Title is required" },
  author: { required: "Author is required" },
  category: { required: "Choose a category" },
  copies: {
    required: "Copies is required",
    validate: (value) =>
      (Number.isInteger(Number(value)) && Number(value) >= 0) || "Enter a whole number, 0 or more",
  },
}

// Mount this dialog only while it is open so the form starts fresh each time.
const BookFormDialog = ({ book, saving, onSubmit, onClose }) => {
  const { t } = useLocale()
  const fileRef = useRef(null)
  const [preview, setPreview] = useState(book?.image ?? "")
  const [imageError, setImageError] = useState("")

  const { register, handleSubmit, errors } = useForm({
    title: book?.title ?? "",
    author: book?.author ?? "",
    category: book?.category ?? "",
    copies: book?.copies ?? 1,
    description: book?.description ?? "",
  })

  const handleFileChange = async () => {
    const file = fileRef.current?.files?.[0]

    if (!file) return

    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("Image must be smaller than 1 MB.")
      fileRef.current.value = ""
      return
    }

    setImageError("")
    setPreview(await readFileAsDataUrl(file))
  }

  const submit = (values) =>
    onSubmit({ ...values, copies: Number(values.copies), available: Number(values.copies) > 0, image: preview })

  const categories = book && !BOOK_CATEGORIES.includes(book.category)
    ? [book.category, ...BOOK_CATEGORIES]
    : BOOK_CATEGORIES

  return (
    <Dialog open onClose={saving ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(submit)} noValidate>
        <DialogTitle>{t(book ? "Edit book" : "Add book")}</DialogTitle>

        <DialogContent>
          <FormInput label="Title" name="title" register={register} error={errors.title} rules={rules.title} />
          <FormInput label="Author" name="author" register={register} error={errors.author} rules={rules.author} />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, columnGap: 2 }}>
            <FormInput select label="Category" name="category" register={register} error={errors.category} rules={rules.category}>
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {t(item)}
                </MenuItem>
              ))}
            </FormInput>

            <FormInput label="Copies" name="copies" type="number" register={register} error={errors.copies} rules={rules.copies} />
          </Box>

          <FormInput label="Description" name="description" register={register} error={errors.description} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <BookCover src={preview} alt="Cover preview" sx={{ width: 60, height: 84, borderRadius: 1 }} />

            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {t("Cover image (optional, max 1 MB)")}
              </Typography>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
              {imageError && (
                <Typography variant="caption" color="error" component="p">
                  {t(imageError)}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={saving}>
            {t("Cancel")}
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? t("Saving...") : t("Save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

BookFormDialog.propTypes = {
  book: bookShape,
  saving: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default BookFormDialog
