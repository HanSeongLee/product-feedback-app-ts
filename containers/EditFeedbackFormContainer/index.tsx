import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import EditFeedbackForm from 'components/EditFeedbackForm';
import { FeedbackType } from 'types/feedback';
import { useRouter } from 'next/router';
import axios from 'axios';

interface IProps {
    feedback: FeedbackType;
}

const EditFeedbackFormContainer: React.FC<IProps> = ({ feedback }) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: feedback.title,
            category: feedback.category,
            status: feedback.status,
            description: feedback.description,
        }
    });
    const onSubmit = useCallback(async (data) => {
        const { id } = feedback;
        const { title, category, status, description } = data;

        try {
            await axios.patch(`/api/feedback/${id}`, {
                title,
                category,
                status,
                description,
            });
            router.replace(`/feedback/${id}`);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const onReset = useCallback(() => {
        reset({
            title: '',
            category: 'ui',
            status: 'suggestion',
            description: '',
        });
    }, []);

    const onDelete = useCallback(async () => {
        const { id } = feedback;

        try {
            await axios.delete(`/api/feedback/${id}`);
            router.replace(`/`);
        } catch (e) {
            console.error(e);
        }
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
