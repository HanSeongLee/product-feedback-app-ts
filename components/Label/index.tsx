import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    description?: string;
    htmlFor?: string | undefined;
}

const Label: React.FC<IProps> = ({
                                     description, htmlFor, children, className,
                                     ...props
                                 }) => {
    return (
        <div className={cn(styles.labelWrapper, className)}
             {...props}
        >
            <label className={styles.label}
                   htmlFor={htmlFor}
            >
                {children}
            </label>
            {description && (
                <p className={styles.description}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default Label;
