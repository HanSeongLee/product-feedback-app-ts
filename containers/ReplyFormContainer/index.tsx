import React, { useCallback } from 'react';
import ReplyForm from 'components/ReplyForm';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';

interface IProps {
    commentId: number;
    replyingTo: string;
    onSubmitAfter?: () => void;
}

const useFeedbackDetailList = () => {
    return useStore(
        (store) => ({
            loadFeedback: store.loadFeedback,
        }),
        shallow
    );
};

const ReplyFormContainer: React.FC<IProps> = ({ commentId, replyingTo, onSubmitAfter }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loadFeedback } = useFeedbackDetailList();
    const router = useRouter();
    const { query: { id: feedbackId } } = router;
    const { data: session } = useSession();

    const onSubmit = useCallback(async (data) => {
        const { comment } = data;
        if (!comment) {
            alert(`The replay can not be empty!`);
            return ;
        }

        if (!session) {
            signIn();
            return ;
        }

        try {
            // TODO: Should implement here.
            await axios.post(`/api/feedback/${feedbackId}/comments/${commentId}/reply`, {
                comment,
                replyingTo,
            });
            reset({
                comment: '',
            });

            if (onSubmitAfter) {
                onSubmitAfter();
            }

            await loadFeedback(feedbackId as string);
        } catch (e) {
            console.error(e);
        }
    }, [feedbackId, commentId, replyingTo, session]);

    return (
        <ReplyForm register={register}
                   errors={errors}
                   onSubmit={handleSubmit(onSubmit)}
        />
    );
};

export default ReplyFormContainer;
