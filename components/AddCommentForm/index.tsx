import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types/form';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    maxLength?: number;
}

const AddCommentForm: React.FC<IProps> = ({ register, watch, maxLength, className, ...props }) => {
    const comment = watch('comment', '');

    return (
        <form className={cn(styles.addCommentForm, className)}
              {...props}
        >
            <textarea className={styles.textarea}
                      placeholder={'Type your comment here'}
                      maxLength={maxLength}
                      {...register('comment')}
            />
            <div className={styles.footer}>
                <div className={styles.textLength}>
                    {(maxLength || 0) - comment.length} Characters left
                </div>
                <button className={styles.postCommentButton}
                        type={'submit'}
                >
                    Post Comment
                </button>
            </div>
        </form>
    );
};

AddCommentForm.defaultProps = {
    maxLength: 250,
};

export default AddCommentForm;
