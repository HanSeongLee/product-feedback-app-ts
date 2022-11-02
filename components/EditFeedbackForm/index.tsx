import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import Form from 'components/Form';
import Label from 'components/Label';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Select from 'components/Select';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    title: string;
    register: UseFormRegister<any>;
    control: Control<any>;
    errors: FieldErrors<any>;
    onReset: () => void;
    onDelete: () => void;
}

const EditFeedbackForm: React.FC<IProps> = ({
                                               title, register, control, errors,
                                                onReset, onDelete, ...props
                                           }) => {
    return (
        <Form icon={'/icons/icon-edit-feedback.svg'}
              title={`Editing ‘${title}’`}
              submitButtonText={'Save Changes'}
              onReset={onReset}
              buttons={
                  <>
                      <button className={styles.deleteButton}
                              type={'button'}
                              onClick={onDelete}
                      >
                          Delete
                      </button>
                  </>
              }
              {...props}
        >
            <div>
                <Label description={'Add a short, descriptive headline'}
                       htmlFor={'title'}
                >
                    Feedback Title
                </Label>
                <Input id={'title'}
                       error={errors?.title?.message as string}
                       {...register('title', {
                           required: `Can't be empty`,
                       })}
                />
            </div>
            <div>
                <Label description={'Choose a category for your feedback'}
                       htmlFor={'category'}
                >
                    Category
                </Label>
                <Controller control={control}
                            name={'category'}
                            defaultValue={'ui'}
                            render={({ field }) => (
                                <>
                                    <Select options={[
                                        {
                                            label: 'UI',
                                            value: 'ui',
                                        },
                                        {
                                            label: 'UX',
                                            value: 'ux',
                                        },
                                        {
                                            label: 'Enhancement',
                                            value: 'enhancement',
                                        },
                                        {
                                            label: 'Bug',
                                            value: 'bug',
                                        },
                                        {
                                            label: 'Feature',
                                            value: 'feature',
                                        },
                                    ]}
                                            {...field}
                                    />
                                </>
                            )}
                />
            </div>
            <div>
                <Label description={'Change feature state'}
                       htmlFor={'status'}
                >
                    Update Status
                </Label>
                <Controller control={control}
                            name={'status'}
                            defaultValue={'suggestion'}
                            render={({ field }) => (
                                <>
                                    <Select options={[
                                        {
                                            label: 'Suggestion',
                                            value: 'suggestion',
                                        },
                                        {
                                            label: 'Planned',
                                            value: 'planned',
                                        },
                                        {
                                            label: 'In-Progress',
                                            value: 'in-progress',
                                        },
                                        {
                                            label: 'Live',
                                            value: 'live',
                                        },
                                    ]}
                                            {...field}
                                    />
                                </>
                            )}
                />
            </div>
            <div>
                <Label description={'Include any specific comments on what should be improved, added, etc.'}
                       htmlFor={'description'}
                >
                    Feedback Detail
                </Label>
                <TextArea id={'description'}
                          error={errors?.title?.message as string}
                          {...register('description', {
                              required: `Can't be empty`,
                          })}
                />
            </div>
        </Form>
    );
};

export default EditFeedbackForm;
