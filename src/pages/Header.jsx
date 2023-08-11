import React from "react";
import IdContext from "../utils/IdContext";
import { useContext } from "react";
function Header() {
    const tgId = useContext(IdContext);
    return (
        <>
            Greeting {tgId} !
        </>
    );
}

export default Header;