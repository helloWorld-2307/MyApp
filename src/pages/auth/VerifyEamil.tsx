import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../features/auth/authThunks";
import type { RootState, AppDispatch } from "../../app/store";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { selectLoading } from "../../features/auth/authSelectors";
import Button from "@mui/material/Button";
import Loader from "../../components/common/Loader";

const VerifyEmail = () => {
  const location = useLocation();
  const isTextPage = location.pathname.includes("/verify-email/text");
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { verificationToken, userId } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleVerify = async () => {
    if (!verificationToken || !userId) return;

    const response = await dispatch(
      verifyEmail({
        token: verificationToken,
        userId,
      }),
    );

    if (verifyEmail.fulfilled.match(response)) {
      navigate("/verify-email/text");
    }
  };

  return (
    <div>
      {!isTextPage && (
        <>
          <p>Now you have to verify your gmail account</p>
          <Button
            onClick={handleVerify}
            disabled={loading==="verify"}
            sx={{
              bgcolor: "#2E7D32",
              color: "#fff",
            }}
          >
            {loading ? <Loader size={20} /> : "Click to continue"}
          </Button>
        </>
      )}

      {!loading && <Outlet />}
    </div>
  );
};

export default VerifyEmail;
