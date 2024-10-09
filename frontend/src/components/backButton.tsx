import FirstPageIcon from "@mui/icons-material/FirstPage";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const BackButton = () => {
  const Btn = styled.div`
    padding: 5px;
    background-color: orange;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 100px;
    font-size: 15px;
    :active {
      /* color: white; */
    }

  `;
  return (
    <Btn>
      <Link to="/" style={{ color: "white" }}>
        <FirstPageIcon style={{fontSize: '30px'}}/>
      </Link>
    </Btn>
  );
};
