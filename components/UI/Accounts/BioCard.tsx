"use client";

import { UserDto } from "@/types/dtos";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  X as CancelIcon,
} from "react-feather";
import { IconButton } from "../Button";
import TextInput from "../TextInput";
import { updateUserProfile } from "@/utils/auth-helpers/server";
import { useRouter } from "next/navigation";
import { showToast } from "../HotToast";
import { ToastVariants } from "@/types";

const BioCard = ({ user }: { user: UserDto | null }) => {
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isEmailCustomer = user?.provider === "email";

  const [profile, setProfile] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
  });

  const { fullName, email } = profile;

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setProfile({
      fullName: user?.full_name || "",
      email: user?.email || "",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("Saving...");
    if (!user) {
      setMessage("User not found");
      setIsSaving(false);
      return;
    }
    const updateData: Partial<{ full_name: string; email: string }> = {};
    try {
      if (fullName !== user?.full_name && fullName.trim() !== "") {
        updateData.full_name = fullName.trim();
      }
      if (email !== user?.email && email.trim() !== "") {
        updateData.email = email.trim();
      }

      if (!Object.keys(updateData).length) {
        setIsSaving(false);
        return;
      }
      const { status, title, description } = await updateUserProfile(
        updateData
      );
      showToast(status as ToastVariants, title, description, "profile-update");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSaving(false);
      setIsEditing(false);
      setMessage("");
      setProfile({
        fullName: user?.full_name || "",
        email: user?.email || "",
      });
    }
  };

  const textInputClassNames = {
    label: "text-sm mb-0",
    input:
      "text-sm border-2 py-1 w-full mb-2 text-darkzink disabled:opacity-50",
  };

  return (
    <Card
      radius="sm"
      className="w-full bg-gray border-2 flex flex-col p-y-4 px-2"
      classNames={{
        header: "text-md flex justify-between items-center p-2",
        body: "flex flex-row gap-4 items-center",
      }}
    >
      <CardHeader>
        <p>Bio Information</p>
        {isEmailCustomer &&
          (isEditing ? (
            <div className="flex gap-2">
              <IconButton
                Icon={SaveIcon}
                onClick={handleSave}
                className="bg-transparent text-zink"
                disabled={isSaving}
              />
              <IconButton
                Icon={CancelIcon}
                onClick={handleEdit}
                className="bg-transparent text-zink"
                disabled={isSaving}
              />
            </div>
          ) : (
            <IconButton
              Icon={EditIcon}
              onClick={handleEdit}
              className="bg-transparent text-zink"
            />
          ))}
      </CardHeader>
      <CardBody>
        <Avatar
          showFallback
          src={user?.avatar_url ?? ""}
          alt="avatar"
          size="lg"
        />
        <div className="flex flex-col w-[60%]">
          {isEditing ? (
            <>
              <TextInput
                type="text"
                label="Full Name"
                name="full_name"
                value={fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
                placeholder="Full Name"
                classNames={textInputClassNames}
                disabled={isSaving}
              />
              <TextInput
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="Email"
                classNames={textInputClassNames}
                disabled={isSaving}
              />
              <span className="text-xs text-darkzink">{message}</span>
            </>
          ) : (
            <>
              <h3 className="text-base font-bold">{user?.full_name}</h3>
              <p className="text-base text-darkzink">{user?.email}</p>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default BioCard;
