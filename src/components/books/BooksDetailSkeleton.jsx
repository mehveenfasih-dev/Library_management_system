import {
  Box,
  Paper,
  Skeleton,
} from "@mui/material";

const BookDetailsSkeleton = () => {
  return (
    <Paper
      sx={{
        p: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
      
        <Skeleton
          variant="rectangular"
          width={220}
          height={320}
          sx={{ borderRadius: 1 }}
        />

       
        <Box
          sx={{
            flex: 1,
            minWidth: 280,
          }}
        >
          <Skeleton
            variant="text"
            width="70%"
            height={55}
          />

          <Skeleton
            variant="text"
            width="40%"
            height={30}
            sx={{ mt: 1 }}
          />

          <Skeleton
            variant="text"
            width="35%"
            height={30}
          />

          <Skeleton
            variant="text"
            width="100%"
            height={25}
            sx={{ mt: 2 }}
          />

          <Skeleton
            variant="text"
            width="95%"
            height={25}
          />

          <Skeleton
            variant="text"
            width="80%"
            height={25}
          />

          <Skeleton
            variant="rounded"
            width={130}
            height={40}
            sx={{ mt: 3 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default BookDetailsSkeleton;