import React, { useCallback } from 'react';
import NewFeedbackForm from 'components/NewFeedbackForm';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewFeedbackFormContainer: React.FC = () => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();
    const onSubmit = useCallback(async (data) => {
        const { title, category, detail: description } = data;

        try {
            const { data: res } = await axios.post(`/api/feedback`, {
                title,
                category,
                description
            });

            const { id } = res;
            router.push(`/feedback/${id}`);
        } catch (e) {
            console.error(e);
        }
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
