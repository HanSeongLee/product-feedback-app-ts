import React, { useCallback } from 'react';
import AddCommentForm from 'components/AddCommentForm';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';
import axios from 'axios';

const useFeedbackDetailList = () => {
    return useStore(
        (store) => ({
            loadFeedback: store.loadFeedback,
        }),
        shallow
    );
};

const AddCommentFormContainer: React.FC = () => {
    const { register, watch, handleSubmit, reset } = useForm();
    const { loadFeedback } = useFeedbackDetailList();
    const router = useRouter();
    const { query: { id } } = router;

    const onSubmit = useCallback(async (data) => {
        const { comment } = data;
        if (!comment) {
            alert(`The comment can not be empty!`);
            return ;
        }

        try {
            await axios.post(`/api/feedback/${id}/comments`, {
                comment,
            });
            reset({
                comment: '',
            });

            await loadFeedback(id as string);
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    return (
        <div>
            <AddCommentForm register={register}
                            watch={watch}
                            onSubmit={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default AddCommentFormContainer;
