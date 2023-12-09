import { useNavigate } from "react-router-dom";

const Header = ({ headerText }) => {
    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate('/')
    }
    return <>
        <div className="header">
            <button onClick={goToHomePage} className="reset-button">
                Reset
            </button>
            <span className="header-text">{headerText}
            </span>
        </div>
    </>
}
export default Header;