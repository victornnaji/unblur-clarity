"use server";

import { getAuthUser, getAuthUserOrNull } from "@/data/services/auth.service";
import { links } from "@/config";
import { isValidEmail, getURL, getStatusRedirect } from "@/utils/helpers";
import { UserNotFoundError } from "@/errors/UserNotFoundError";
import { UpdateUserDto } from "@/types/dtos";
import { UserUpdate } from "@/types/services";
import { cache } from "react";
import { CustomError } from "@/errors/CustomError";
import { createUsersRepository } from "@/data/repositories/users.repository";
import { createClient } from "@/utils/supabase/server";

export const getUser = cache(async () => {
  const supabase = createClient();
  const usersRepository = await createUsersRepository();
  try {
    const user = await getAuthUserOrNull();

    if (!user) {
      return null;
    }
    const { data, error } = await usersRepository.getUserById(
      supabase,
      user.id
    );

    if (error) {
      throw new CustomError(error.message, 500, {
        cause: error.details
      });
    }

    if (!data) {
      throw new UserNotFoundError();
    }

    return {
      ...data,
      provider: user.app_metadata.provider ?? ""
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateUserProfile = async (updateData: UserUpdate) => {
  const supabase = createClient();
  const usersRepository = await createUsersRepository();
  try {
    await getAuthUser();

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

    const { error } = await usersRepository.updateUser(
      supabase,
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
