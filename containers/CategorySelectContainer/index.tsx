import React, { HTMLAttributes, useCallback, useState } from 'react';
import styles from 'components/Menu/style.module.scss';
import { categoryList } from 'lib/constants';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const CategorySelectContainer: React.FC<IProps> = ({ ...props }) => {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const handleCategoryClick = useCallback((index: number) => {
        setSelectedCategory(index);
    }, []);

    return (
        <div {...props}>
            {categoryList.map((name, index) => (
                <button className={cn({
                    [styles.active]: index === selectedCategory,
                })}
                        type={'button'}
                        key={index}
                        onClick={_ => handleCategoryClick(index)}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default CategorySelectContainer;
