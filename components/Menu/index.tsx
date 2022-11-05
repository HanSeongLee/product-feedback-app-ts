import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import Container from 'components/Container';
import cn from 'classnames';
import Link from 'next/link';
import CategorySelectContainer from 'containers/CategorySelectContainer';
import RoadmapContainer from 'containers/RoadmapContainer';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onClose: () => void;
}

const Menu: React.FC<IProps> = ({ open, onClose, className, ...props }) => {
    return (
        <div className={cn(styles.menu, {
            [styles.open]: open,
        }, className)}
             {...props}
        >
            <div className={styles.overlay}
                 onClick={onClose}
            ></div>
            <Container className={styles.container}>
                <CategorySelectContainer className={styles.categoryContainer} />

                <div className={styles.roadmapBox}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            Roadmap
                        </div>
                        <Link href={'/roadmap'}>
                            <a className={styles.viewLink}>
                                View
                            </a>
                        </Link>
                    </div>
                    <RoadmapContainer className={styles.roadmapContainer}
                                      itemStyle={{
                                          root: styles.item,
                                          name: styles.name,
                                          count: styles.count,
                                      }}
                    />
                </div>
            </Container>
        </div>
    );
};

export default Menu;
