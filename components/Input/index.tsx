import React, { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';

const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ ...props }, ref) => {
    return (
        <input className={styles.input}
               {...props}
               ref={ref}
        />
    );
});

export default Input;
