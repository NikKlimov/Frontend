import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";

const NavMenu = () => {

    const {is_authenticated, is_moderator, auth, user_name} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        auth()
    }, [])

    return (
        <div>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/products-list" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                    <span>Товары</span>
                </Link>

                {is_moderator &&
                    <Link to="/products-table" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Таблица товаров</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/orders" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Заявки</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>{user_name}</span>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default NavMenu;