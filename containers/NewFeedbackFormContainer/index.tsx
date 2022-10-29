import React, { useCallback } from 'react';
import NewFeedbackForm from 'components/NewFeedbackForm';
import { useForm } from 'react-hook-form';

const NewFeedbackFormContainer: React.FC = () => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = useCallback((data) => {
        // TODO: Should implement this.
        alert(JSON.stringify(data));
    }, []);

    const onReset = useCallback(() => {
        reset();
    }, []);

    return (
        <NewFeedbackForm onSubmit={handleSubmit(onSubmit)}
                         register={register}
                         control={control}
                         errors={errors}
                         onReset={onReset}
        />
    );
};

export default NewFeedbackFormContainer;
