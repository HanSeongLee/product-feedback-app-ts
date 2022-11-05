import React, { HTMLAttributes, useCallback } from 'react';
import styles from 'components/Menu/style.module.scss';
import { categoryList } from 'lib/constants';
import cn from 'classnames';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const useCategory = () => {
    return useStore(
        (store) => ({
            category: store.category,
            setCategory: store.setCategory,
        }),
        shallow
    );
};

const CategorySelectContainer: React.FC<IProps> = ({ ...props }) => {
    const { category, setCategory } = useCategory();

    const handleCategoryClick = useCallback((name: string) => {
        setCategory(name.toLowerCase());
    }, []);

    return (
        <div {...props}>
            {categoryList.map((name, index) => (
                <button className={cn({
                    [styles.active]: name.toLowerCase() === category,
                })}
                        type={'button'}
                        key={index}
                        onClick={_ => handleCategoryClick(name)}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default CategorySelectContainer;
