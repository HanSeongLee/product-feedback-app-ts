import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import EditFeedbackForm from 'components/EditFeedbackForm';
import { FeedbackType } from 'types/feedback';

interface IProps {
    feedback: FeedbackType;
}

const EditFeedbackFormContainer: React.FC<IProps> = ({ feedback }) => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: feedback.title,
            category: feedback.category,
            status: feedback.status,
            description: feedback.description,
        }
    });
    const onSubmit = useCallback((data) => {
        // TODO: Should implement this.
        alert(JSON.stringify(data));
    }, []);

    const onReset = useCallback(() => {
        reset({
            title: '',
            category: 'ui',
            status: 'suggestion',
            description: '',
        });
    }, []);

    const onDelete = useCallback(() => {
        // TODO: Should implement this.
        alert(feedback.id);
    }, []);

    return (
        <EditFeedbackForm onSubmit={handleSubmit(onSubmit)}
                          title={feedback.title}
                          register={register}
                          control={control}
                          errors={errors}
                          onReset={onReset}
                          onDelete={onDelete}
        />
    );
};

export default EditFeedbackFormContainer;
