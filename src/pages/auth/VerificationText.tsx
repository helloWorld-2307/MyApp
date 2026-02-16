import { useNavigate } from "react-router-dom";
import SvgIcon, {type SvgIconProps } from '@mui/material/SvgIcon';
import LockPersonIcon from '@mui/icons-material/LockPerson';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export function VerificationText() {

    const navigate = useNavigate();
    return (
    
        <div>
          <h3>🎉 Your email has been verified successfully.</h3>
          <p>
            Thank you for confirming your email address. Your account is now
            active and ready to use.
          </p>
          <p>You can now:</p>
          <p onClick={()=>navigate('/login')} style={{ display:"flex", alignItems:"center", justifyContent:'center'}}><LockPersonIcon color="success" fontSize="small"/>&nbsp;&nbsp;Login to your &nbsp;<span style={{cursor:'pointer', textDecoration:'underline', color:'blue'}}>account</span>&nbsp; </p>
          <p style={{display:"flex", alignItems:"center", justifyContent:'center'}} onClick={()=>navigate("/")}> <HomeIcon color="success" fontSize="small"/>&nbsp;&nbsp;Go to the &nbsp;<span style={{cursor:'pointer', textDecoration:'underline', color:'blue'}}>Home</span>&nbsp; page</p>
        </div>
    )
}