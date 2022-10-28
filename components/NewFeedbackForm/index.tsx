import React, { FormHTMLAttributes } from 'react';
import Form from 'components/Form';
import Label from 'components/Label';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Select from 'components/Select';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    register: UseFormRegister<any>;
    control: Control;
    errors: FieldErrors<any>;
    onReset: () => void;
}

const NewFeedbackForm: React.FC<IProps> = ({
                                               register, control, errors, onReset,
                                               ...props
                                           }) => {
    return (
        <Form icon={'/icons/icon-new-feedback.svg'}
              title={'Create New Feedback'}
              submitButtonText={'Add Feedback'}
              onReset={onReset}
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
                <Label description={'Include any specific comments on what should be improved, added, etc.'}
                       htmlFor={'detail'}
                >
                    Feedback Detail
                </Label>
                <TextArea id={'detail'}
                          error={errors?.title?.message as string}
                          {...register('detail', {
                              required: `Can't be empty`,
                          })}
                />
            </div>
        </Form>
    );
};

export default NewFeedbackForm;
