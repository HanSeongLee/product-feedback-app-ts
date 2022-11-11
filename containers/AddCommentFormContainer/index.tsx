import React, { useCallback } from 'react';
import AddCommentForm from 'components/AddCommentForm';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';

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
    const { data: session } = useSession();

    const onSubmit = useCallback(async (data) => {
        const { comment } = data;
        if (!comment) {
            alert(`The comment can not be empty!`);
            return ;
        }

        if (!session) {
            signIn();
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
    }, [id, session]);

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
