"use client";

import { UserDto } from "@/types/dtos";
import { Avatar } from "@nextui-org/react";
import React, { useState } from "react";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  X as CancelIcon,
} from "react-feather";
import { IconButton } from "../Button";
import TextInput from "../TextInput";
import { updateUserProfile } from "@/utils/auth-helpers/server";
import { showToast } from "../HotToast";
import { ToastVariants } from "@/types";
import AccountCard from "./Card";

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
    <AccountCard
      header={
        <div className="flex justify-between items-center w-full">
          <p>Bio</p>
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
        </div>
      }
    >
      <div className="grid grid-cols-[auto,1fr] items-center gap-4 px-2">
        <Avatar
          showFallback
          src={user?.avatar_url ?? ""}
          alt="avatar"
          size="lg"
          radius="sm"
          className="w-auto"
          isBordered
        />
        <div className="w-full">
          {isEditing ? (
            <div className="flex flex-col w-auto lg:w-3/5">
              <TextInput
                type="text"
                label="Name"
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
            </div>
          ) : (
            <>
              <h3 className="text-sm">
                <span className="text-darkzink">Name: </span>
                <span className="font-normal text-zink">{user?.full_name}</span>
              </h3>
              <p className="text-sm text-darkzink">
                <span className="text-darkzink">Email: </span>
                <span className="font-normal text-zink">{user?.email}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </AccountCard>
  );
};

export default BioCard;
