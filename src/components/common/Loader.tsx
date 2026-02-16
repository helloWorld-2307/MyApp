import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
  size?: number;
}

export default function Loader({ size = 20 }: LoaderProps) {
  return <CircularProgress size={size} color="inherit" />;
}
