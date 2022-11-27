import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import TextArea from 'components/TextArea';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    maxLength?: number;
}

const ReplyForm: React.FC<IProps> = ({
                                         register, errors, maxLength, className,
                                         ...props
                                     }) => {
    return (
        <form className={cn(styles.replayForm, className)}
              {...props}
        >
            <TextArea id={'comment'}
                      className={styles.textarea}
                      placeholder={'Type your comment here'}
                      error={errors?.comment?.message as string}
                      maxLength={maxLength}
                      {...register('comment', {
                          required: `Can't be empty`,
                      })}
            />
            <div className={styles.footer}>
                <button className={styles.postReplyButton}
                        type={'submit'}
                >
                    Post Reply
                </button>
            </div>
        </form>
    );
};

ReplyForm.defaultProps = {
    maxLength: 250,
};

export default ReplyForm;
