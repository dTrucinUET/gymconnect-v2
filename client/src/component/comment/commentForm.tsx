// import React, { useState } from 'react';
// import { Modal, Stack, TextInput, Button, Textarea, FileInput } from '@mantine/core';

// interface CreateCommentProps {
//   openCommentForm: boolean;
//   setOpenCommentForm: (openCommentForm: boolean) => void;
//   formCommentData: any;
//   setFormCommentData: (formCommentData: any) => void;
//   handleSubmitComment: (formData: any) => void;
// }

// const CreateCommentModal = (props: CreateCommentProps) => {
//   const { openCommentForm, setOpenCommentForm, formCommentData, setFormCommentData, handleSubmitComment } = props;

//   const handleChange = (e: any) => {
//     const { name, value } = e.target || {};
    
//     if (name === "images") {
//       setFormCommentData({
//         ...formCommentData,
//         images: e,
//       });
//     } else {
//       setFormCommentData({
//         ...formCommentData,
//         [name]: value,
//       });
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenCommentForm(false);
//     resetFormData();
//   };

//   const resetFormData = () => {
//     setFormCommentData({
//       username: '',
//       fullname: '',
//       comment: '',
//       images: [],
//       rating: 0,
//     });
//   };

//   const handleSubmitCommentForm = async (e: any) => {
//     e.preventDefault();
//     console.log(formCommentData);
//     handleSubmitComment(formCommentData);
//     resetFormData();
//   };

//   return (
//     <Modal
//       opened={openCommentForm}
//       onClose={handleCloseModal}
//       title="Create New Comment"
//       size="lg"
//     >
//       <form onSubmit={handleSubmitCommentForm}>
//         <Stack gap="md">
//           <TextInput
//             label="Username"
//             name="username"
//             value={formCommentData.username}
//             onChange={handleChange}
//             required
//           />

//           <TextInput
//             label="Full Name"
//             name="fullname"
//             value={formCommentData.fullname}
//             onChange={handleChange}
//             required
//           />

//           <Textarea
//             label="Comment"
//             name="comment"
//             value={formCommentData.comment}
//             onChange={handleChange}
//             placeholder="Write your comment here..."
//             required
//           />

//           <FileInput
//             label="Upload Images"
//             name="images"
//             multiple
//             onChange={(files) => 
//               setFormCommentData((prev: any) => ({
//                 ...prev,
//                 images: files || [],
//               }))
//             }
//             accept="image/*"
//             placeholder="Upload one or more images"
//           />

//           <Button type="submit" fullWidth>
//             Submit Comment
//           </Button>
//         </Stack>
//       </form>
//     </Modal>
//   );
// };

// export default CreateCommentModal;
