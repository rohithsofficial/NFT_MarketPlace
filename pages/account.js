import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

// INTERNAL IMPORT
import withAuthProtection from "../utils/withAuth";
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";

const Account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set your preferred display name, create your profile URL, and manage other personal settings.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={fileUrl ? URL.createObjectURL(fileUrl) : images.user1} // If a file is selected, show it
            alt="account upload"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        <div className={Style.account_box_form}>
          <Form profileImage={fileUrl} /> {/* Pass the fileUrl to the Form component */}
        </div>
      </div>
    </div>
  );
};

export default withAuthProtection(Account);
