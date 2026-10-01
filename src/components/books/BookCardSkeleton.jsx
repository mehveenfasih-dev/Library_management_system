import {
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

const BookCardSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={260}
      />

      <CardContent>
        <Skeleton
          variant="text"
          height={32}
          width="85%"
        />

        <Skeleton
          variant="text"
          height={24}
          width="60%"
        />

        <Skeleton
          variant="rounded"
          width={80}
          height={24}
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export default BookCardSkeleton;