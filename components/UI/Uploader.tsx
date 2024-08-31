"use client";

import { useAppStore } from "@/hooks/use-store";
import { PhotoType } from "@/types";
import { shortenFileName } from "@/utils/helpers";
import clsx from "clsx";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Upload, Trash } from "react-feather";
import Balancer from "react-wrap-balancer";


interface UploaderProps {
  handlePhoto: (photo: PhotoType) => void;
}
const Uploader = ({ handlePhoto }: UploaderProps) => {
  const [imageMetadata, setImageMetadata] = useState({
    preview: "",
    fileName: ""
  });

  const { appStatus, setAppStatus } = useAppStore((state) => state);

  useEffect(() => {
    if (appStatus.status === "reset") {
      setImageMetadata({
        preview: "",
        fileName: ""
      });
    }
  }, [appStatus.status]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        return;
      }
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        setAppStatus({
          ...appStatus,
          status: "idle"
        });
        setImageMetadata({
          preview: URL.createObjectURL(file),
          fileName: file.name
        });
        handlePhoto({
          name: file.name,
          originalImage: reader.result as string,
          restoredImage: ""
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const removeImage = () => {
    setImageMetadata({
      preview: "",
      fileName: ""
    });
    handlePhoto({
      name: "",
      originalImage: "",
      restoredImage: ""
    });
  };

  useEffect(() => {
    return () => {
      imageMetadata.preview && URL.revokeObjectURL(imageMetadata.preview);
    };
  }, [imageMetadata.preview]);

  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/jpg": []
      },
      maxFiles: 1,
      maxSize: 2 * 1024 * 1024
    });

  const { preview, fileName } = imageMetadata;

  if (preview) {
    return (
      <Zone className="relative">
        <div className="flex flex-col items-center space-y-2">
          <Image
            className="rounded-md shadow-md"
            src={preview}
            width={120}
            height={120}
            alt="Preview photo"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <div className="flex text-zink">
            <div className="mr-3">{shortenFileName(fileName)}</div>
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
              "aria-label": "upload"
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

const Zone = ({
  children,
  className
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
  isDragActive
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
