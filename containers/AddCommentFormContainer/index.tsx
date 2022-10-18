import React, { useCallback } from 'react';
import AddCommentForm from 'components/AddCommentForm';
import { useForm } from 'react-hook-form';

const AddCommentFormContainer: React.FC = () => {
    const { register, watch, handleSubmit } = useForm();
    const onSubmit = useCallback((data) => {
        alert(JSON.stringify(data));
    }, []);

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
