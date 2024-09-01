"use client";

import { useAppStore } from "@/hooks/use-store";
import { shortenFileName } from "@/utils/helpers";
import clsx from "clsx";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Upload, Trash } from "react-feather";
import Balancer from "react-wrap-balancer";

const Uploader = () => {
  const { appStatus, setAppStatus, photo, setPhoto } = useAppStore((state) => ({
    appStatus: state.appStatus,
    setAppStatus: state.setAppStatus,
    photo: state.photo,
    setPhoto: state.setPhoto,
  }));

  useEffect(() => {
    if (appStatus.status === "reset") {
      setPhoto({
        name: "",
        originalImage: "",
        restoredImage: "",
        previewImage: "",
      });
    }
  }, [appStatus.status, setPhoto]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        return;
      }
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        if (photo.previewImage) {
          URL.revokeObjectURL(photo.previewImage);
        }
        setAppStatus({
          ...appStatus,
          status: "idle",
        });
        const newPhoto = {
          name: file.name,
          originalImage: reader.result as string,
          restoredImage: "",
          previewImage: URL.createObjectURL(file),
        };
        setPhoto(newPhoto);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [setAppStatus, appStatus, setPhoto]
  );

  const removeImage = () => {
    setPhoto({
      ...photo,
      name: "",
      previewImage: "",
    });
  };

  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/jpg": [],
      },
      maxFiles: 1,
      maxSize: 2 * 1024 * 1024,
    });

  if (photo.previewImage) {
    return (
      <Zone className="relative">
        <div className="flex flex-col items-center space-y-2">
          <Image
            className="rounded-md shadow-md"
            src={photo.previewImage}
            width={120}
            height={120}
            alt="Preview photo"
          />
          <div className="flex text-zink">
            <div className="mr-3">{shortenFileName(photo.name)}</div>
            <button
              className="absolute top-2.5 left-2.5 cursor-pointer"
              onClick={removeImage}
            >
              <Trash className="hover:stroke-white" />
              <span className="sr-only">Remove Image</span>
            </button>
          </div>
        </div>
      </Zone>
    );
  }

  return (
    <Zone>
      <div {...getRootProps({ className: "dropzone flex flex-col w-full" })}>
        <label
          htmlFor="uploader"
          className="m-auto mb-2 transition-colors text-zink cursor-pointer"
        >
          <span className="flex items-center justify-center mb-2">
            <Upload />
          </span>
          <span>Click to upload your Image</span>
          <input
            {...getInputProps({
              "aria-label": "upload",
            })}
            name="uploader"
            id="uploader"
          />
        </label>
        <div className="flex items-center justify-center flex-col">
          <Message
            fileRejections={fileRejections}
            isDragActive={isDragActive}
          />
        </div>
      </div>
    </Zone>
  );
};

export const Zone = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center p-4 border-4 border-dashed rounded-md h-40 md:h-52",
        className
      )}
    >
      {children}
    </div>
  );
};

const Message = ({
  fileRejections,
  isDragActive,
}: {
  fileRejections: FileRejection[];
  isDragActive: boolean;
}) => {
  if (fileRejections.length !== 0) {
    const errors = fileRejections.flatMap(
      (fileRejection) => fileRejection.errors
    );

    if (errors.some((error) => error.code === "file-too-large")) {
      return (
        <ErrorMessage message="File is too large. Please upload a file smaller than 1MB." />
      );
    }

    if (errors.some((error) => error.code === "file-invalid-type")) {
      return (
        <ErrorMessage message="File is not an image. Please upload a jpeg or png file." />
      );
    }

    if (errors.some((error) => error.code === "too-many-files")) {
      return (
        <ErrorMessage message="Too many files. Please upload only one image." />
      );
    }

    return <ErrorMessage message={errors[0].message} />;
  }

  return (
    <>
      {isDragActive ? (
        <p>
          <Balancer>Drop the photo here...</Balancer>
        </p>
      ) : (
        <p>
          <Balancer>or drag &lsquo;n&lsquo; drop a photo here</Balancer>
        </p>
      )}
    </>
  );
};

export const ErrorMessage = ({ message }: { message: string }) => (
  <>
    <p className="mt-2 text-red-500 text-center">{message}</p>
  </>
);

export default React.memo(Uploader);
