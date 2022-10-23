import React, { HTMLAttributes, InputHTMLAttributes, useCallback, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import ArrowDownIcon from 'public/icons/icon-arrow-down.svg';
import { SelectOptionType } from 'types/select';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    options: SelectOptionType[];
    onOptionChange?: (option: SelectOptionType) => void;
    valueClassName?: string;
}

const Select: React.FC<IProps> = ({
                                      label, options, onOptionChange, valueClassName,
                                      className, ...props
                                  }) => {
    const [value, setValue] = useState<SelectOptionType | undefined>(options[0]);
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenToggle = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleValueChange = useCallback((option: SelectOptionType) => {
        setValue(option);
        if (onOptionChange) {
            onOptionChange(option);
        }
        setOpen(false);
    }, []);

    return (
        <div className={cn(styles.select, className, {
            [styles.open]: open,
        })}
        >
            <div className={styles.overlay}
                 onClick={handleOpenToggle}
            ></div>
            <div className={cn(styles.value, valueClassName)}
                 onClick={handleOpenToggle}
            >
                {label ? (
                    <>
                        {label} : <strong>{value?.label}</strong>
                    </>
                ) : (
                    <>
                        {value?.label}
                    </>
                )}&nbsp;
                <ArrowDownIcon className={styles.arrowIcon} />
            </div>
            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {options.map((option, index) => (
                        <li className={cn(styles.item, {
                            [styles.selected]: option.value === value?.value,
                        })}
                            key={index}
                            onClick={_ => handleValueChange(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
            <input type={'hidden'}
                   value={value?.value}
                   {...props}
            />
        </div>
    );
};

export default Select;
