import React, { TextareaHTMLAttributes } from 'react';
import styles from './style.module.scss';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(({ children, ...props }, ref) => {
    return (
        <textarea className={styles.textarea}
                  {...props}
                  ref={ref}
        >
            {children}
        </textarea>
    );
});

export default TextArea;
