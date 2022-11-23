import React, { CSSProperties, HTMLAttributes, useCallback } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLUListElement> {
    items: {name: string, borderColor: string}[];
    selected?: number;
    onSelectedChange?: (index: number) => void;
}

const Tab: React.FC<IProps> = ({ items, selected, onSelectedChange, className, ...props }) => {
    const onClickItem = useCallback((index: number) => {
        if (!onSelectedChange) {
            return ;
        }

        onSelectedChange(index);
    }, []);

    return (
        <ul className={cn(styles.tab, className)}
            {...props}
        >
            {items?.map(({ name, borderColor }, index) => (
                <li className={cn(styles.item, {
                    [styles.active]: index === selected,
                })}
                    style={{
                        '--border-color': borderColor,
                    } as CSSProperties}
                    onClick={() => onClickItem(index)}
                    key={index}
                >
                    {name}
                </li>
            ))}
        </ul>
    );
};

Tab.defaultProps = {
    selected: 0,
};

export default Tab;
