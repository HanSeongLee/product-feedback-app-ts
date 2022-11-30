import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import styles from 'components/Menu/style.module.scss';
import { CATEGORY_DEFAULT_VALUE, categoryList } from 'lib/constants';
import cn from 'classnames';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const useCategory = () => {
    return useStore(
        (store) => ({
            setMenuOpen: store.setMenuOpen,
        }),
        shallow
    );
};

const CategorySelectContainer: React.FC<IProps> = ({ ...props }) => {
    const router = useRouter();
    const [category, setCategory] = useState(CATEGORY_DEFAULT_VALUE);
    const { setMenuOpen } = useCategory();

    const handleCategoryClick = useCallback((name: string) => {
        const lowercaseName = name.toLowerCase();
        const query = {
            ...router.query,
            category: lowercaseName,
        };

        if (lowercaseName === CATEGORY_DEFAULT_VALUE) {
            // @ts-ignore
            delete query.category;
        }

        router.push(
            {
                pathname: '/',
                query,
            },
            undefined,
            { shallow: true }
        );

        setMenuOpen(false);
    }, [router.query]);

    useEffect(() => {
        const queryCategory = String(router.query?.category);
        if (!queryCategory) {
            setCategory(CATEGORY_DEFAULT_VALUE);
            return ;
        }

        const category = categoryList.find(category => category.toLowerCase() === queryCategory);
        if (!category) {
            setCategory(CATEGORY_DEFAULT_VALUE);
            return ;
        }

        setCategory(category.toLowerCase());
    }, [router.query.category]);

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
