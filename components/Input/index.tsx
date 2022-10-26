import React, { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, IProps>(({ error, ...props }, ref) => {
    return (
        <div className={cn(styles.inputWrapper, {
            [styles.error]: error,
        })}>
            <input className={styles.input}
                   {...props}
                   ref={ref}
            />
            <div className={styles.errorBox}>
                {error}
            </div>
        </div>
    );
});

export default Input;
