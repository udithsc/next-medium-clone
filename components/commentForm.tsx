import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CommentFormProps {
  postId: string;
  setSubmitted: (status: boolean) => void;
}

function CommentForm({ postId, setSubmitted }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormProps>();

  const onSubmit: SubmitHandler<CommentFormProps> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        setSubmitted(false);
      });
  };

  return (
    <form
      className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />
      <input type="hidden" {...register('_id')} name="_id" value={postId} />
      <label className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1"
          type="text"
          placeholder="John Smith"
          {...register('name', { required: true })}
        />
        {errors.name && (
          <span className="text-red-500"> Name is required </span>
        )}
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Email</span>
        <input
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1"
          type="email"
          placeholder="John@gmail.com"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <span className="text-red-500"> Email is required </span>
        )}
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Comment</span>
        <textarea
          className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring-1"
          rows={8}
          placeholder="Your Comment"
          {...register('comment', { required: true })}
        />

        {errors.comment && (
          <span className="text-red-500"> Comment is required </span>
        )}
      </label>
      <input
        type="submit"
        className=" shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
      />
    </form>
  );
}

export default CommentForm;
