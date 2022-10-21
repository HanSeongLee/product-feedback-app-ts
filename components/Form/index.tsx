import React, { FormHTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    icon: string;
    title: string;
    buttons: ReactNode;
}

const Form: React.FC<IProps> = ({
                                    icon, title, buttons, children,
                                    className, ...props
                                }) => {
    return (
        <form className={cn(styles.form, className)}
              {...props}
        >
            <img className={styles.icon}
                 src={icon}
                 alt={''}
            />
            {title && (
                <div className={styles.title}>
                    {title}
                </div>
            )}

            <div className={styles.fields}>
                {children}
            </div>

            <div className={styles.buttonContainer}>
                {buttons}
            </div>
        </form>
    );
};

export default Form;
