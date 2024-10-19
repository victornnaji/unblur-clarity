"use server";

import { getAuthUserOrNull } from "@/data/services/auth.service";
import { links } from "@/config";
import { isValidEmail, getURL, getStatusRedirect } from "@/utils/helpers";
import { userRepository } from "@/data/repositories/user.repository";
import { authRepository } from "@/data/repositories/auth.repository";
import { UserNotFoundError } from "@/errors/UserNotFoundError";
import { UpdateUserDto, UserDto } from "@/types/dtos";
import { UserUpdate } from "@/types/services";
import { cache } from "react";
import { CustomError } from "@/errors/CustomError";

export const getUser = cache(async (): Promise<UserDto | null> => {
  try {
    const user = await getAuthUserOrNull();

    if (!user) {
      return null;
    }
    const { data, error } = await userRepository.getUserById(user.id);

    if(error) {
      throw new CustomError(error.message, 500, {
        cause: error.details
      })
    }

    if (!data) {
      throw new UserNotFoundError();
    }

    return {
      ...data,
      provider: user.app_metadata.provider ?? ""
    } as UserDto;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateUserProfile = async (updateData: UserUpdate) => {
  try {
    await authRepository.getAuthUser();

    let updatePayload: UpdateUserDto = {};
    let emailRedirectTo: string | undefined;

    if (updateData.email) {
      if (!isValidEmail(updateData.email)) {
        throw new Error("Please enter a valid email address.");
      }
      updatePayload.email = updateData.email;
      emailRedirectTo = getURL(
        getStatusRedirect(
          links.account.path,
          "success",
          "Success!",
          `Your email has been updated.`
        )
      );
    }

    if (updateData.full_name) {
      updatePayload.data = {
        ...updatePayload.data,
        full_name: updateData.full_name,
        name: updateData.full_name
      };
    }

    const { error } = await userRepository.updateUser(
      updatePayload,
      emailRedirectTo
    );

    if (error) {
      return {
        status: "error",
        title: "Your profile could not be updated.",
        description: error.message
      };
    } else {
      if (updateData.email) {
        return {
          status: "success",
          title: "Confirmation emails sent.",
          description:
            "You will need to confirm the update by clicking the links sent to both the old and new email addresses."
        };
      } else {
        return {
          status: "success",
          title: "Success!",
          description: "Your profile has been updated."
        };
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
