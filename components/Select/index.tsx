import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import ArrowDownIcon from 'public/icons/icon-arrow-down.svg';
import { SelectOptionType } from 'types/select';

// @ts-ignore
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string;
    options: SelectOptionType[];
    onChange?: (value: string) => void;
    valueClassName?: string;
}

const Select: React.FC<IProps> = ({
                                      label, value, options, onChange,
                                      valueClassName, className, ...props
                                  }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenToggle = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleValueChange = useCallback((value: string) => {
        if (onChange) {
            onChange(value);
        }
        setOpen(false);
    }, [onChange]);

    return (
        <div className={cn(styles.select, className, {
            [styles.open]: open,
        })}
             {...props}
        >
            <div className={styles.overlay}
                 onClick={handleOpenToggle}
            ></div>
            <div className={styles.valueWrapper}>
                {label && (<span className={styles.label}>{label} :&nbsp;</span>)}
                <div className={cn(styles.value, valueClassName)}
                     onClick={handleOpenToggle}
                >
                    {label ? (
                        <strong>
                            {options.find(({ value: _value }) => _value === value)?.label}
                        </strong>
                    ) : (
                        <>
                            {options.find(({ value: _value }) => _value === value)?.label}
                        </>
                    )}&nbsp;
                    <ArrowDownIcon className={styles.arrowIcon}
                                   title={'Arrow Down'}
                    />
                </div>
            </div>
            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {options.map((option, index) => (
                        <li className={cn(styles.item, {
                            [styles.selected]: option.value === value,
                        })}
                            key={index}
                            onClick={_ => handleValueChange(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Select;
