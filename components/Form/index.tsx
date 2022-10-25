import React, { FormHTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    icon: string;
    title: string;
    submitButtonText: string;
    buttons?: ReactNode;
    onReset: () => void;
}

const Form: React.FC<IProps> = ({
                                    icon, title, submitButtonText, buttons,
                                    onReset, children, className, ...props
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
                <button className={styles.submitButton}
                        type={'submit'}
                >
                    {submitButtonText}
                </button>
                <button className={styles.resetButton}
                        type={'button'}
                        onClick={onReset}
                >
                    Cancel
                </button>
                {buttons}
            </div>
        </form>
    );
};

export default Form;
