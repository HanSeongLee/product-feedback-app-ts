import React, { HTMLAttributes, useCallback, useState } from 'react';
import styles from './style.module.scss';
import Container from 'components/Container';
import MenuIcon from 'public/icons/mobile/icon-hamburger.svg';
import CloseIcon from 'public/icons/mobile/icon-close.svg';
import Menu from 'components/Menu';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLHeadElement> {

}

const Header: React.FC<IProps> = ({ className, ...props }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleMenuOpenToggle = useCallback(() => {
        setMenuOpen(!menuOpen);
    }, [!menuOpen]);

    return (
        <header className={cn(styles.header, className)}
                {...props}
        >
            <Container className={styles.container}>
                <div>
                    <h1 className={styles.title}>
                        Frontend Mentor
                    </h1>
                    <div className={styles.pageName}>
                        Feedback Board
                    </div>
                </div>
                <button className={styles.menuButton}
                        type={'button'}
                        onClick={handleMenuOpenToggle}
                >
                    {!menuOpen ? <MenuIcon /> : <CloseIcon />}
                </button>
                <Menu open={menuOpen} />
            </Container>
        </header>
    );
};

export default Header;
