"use server";

import { CustomError } from "@/errors/CustomError";
import { creditsRepository } from "@/data/repositories/credits.repository";
import { getAuthUserOrNull } from "@/data/services/auth.service";
import { cache } from "react";
import { UpdateCreditsPayload } from "@/types/services";

export const getUserTotalCreditsByUserId = async (userId: string) => {
  try {
    const { data, error } = await creditsRepository.getUserCreditsByUserId(
      userId
    );

    if (error) {
      throw new CustomError("Error fetching user credits", 500, {
        cause: error.message || error.details,
        context: {
          userId
        }
      });
    }
    const totalCredits = (data?.credits || 0) + (data?.one_time_credits || 0);
    return totalCredits;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserTotalCredits = async () => {
  try {
    const user = await getAuthUserOrNull();
    if (!user) {
      return 0;
    }
    return getUserTotalCreditsByUserId(user.id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserCreditsByUserId = async (userId: string) => {
  const { data, error } = await creditsRepository.getUserCreditsByUserId(
    userId
  );

  if (error) {
    throw new CustomError("Error fetching user credits", 500, {
      cause: error.message || error.details,
      context: {
        userId
      }
    });
  }

  if (!data) {
    throw new CustomError("Error getting user credits", 404, {
      cause: "User credits not found",
      context: {
        userId
      }
    });
  }

  return data;
};

export const getUserCredits = cache(async () => {
  try {
    const user = await getAuthUserOrNull();
    if (!user) {
      return {
        credits: 0,
        oneTimeCredits: 0
      };
    }

    const data = await getUserCreditsByUserId(user.id);

    return {
      credits: data?.credits || 0,
      oneTimeCredits: data?.one_time_credits || 0
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getUserCreditsByAdmin = async (userId: string) => {
  try {
    const { data, error } = await creditsRepository.getUserCreditsByAdmin(
      userId
    );
    if (error) {
      throw new CustomError("Error fetching user credits", 500, {
        cause: error.message || error.details,
        context: {
          userId
        }
      });
    }

    if (!data) {
      throw new CustomError("User credits not found", 404, {
        cause: "User credits not found",
        context: {
          userId
        }
      });
    }
    return {
      credits: data.credits || 0,
      oneTimeCredits: data.one_time_credits || 0
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserCreditsByAdmin = async (
  userId: string,
  { credits, oneTimeCredits }: UpdateCreditsPayload
) => {
  try {
    const { error } = await creditsRepository.updateUserCreditsByAdmin(userId, {
      credits,
      oneTimeCredits
    });

    if (error) {
      throw new CustomError("Error updating user credits", 500, {
        cause: error.message || error.details,
        context: {
          userId
        }
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const withdrawCredits = async (
  userId: string,
  creditsToWithdraw: number
) => {
  try {
    const data = await getUserCreditsByUserId(userId);

    const { credits, one_time_credits } = data;

    const currentCredits = credits || 0;
    const currentOneTimeCredits = one_time_credits || 0;

    const totalAvailableCredits = currentCredits + currentOneTimeCredits;

    // Check if user has enough total credits
    if (totalAvailableCredits < creditsToWithdraw) {
      return { data: null, error: "Insufficient credits" };
    }

    // Calculate how many credits to withdraw from each column
    const creditsToWithdrawFromCredits = Math.min(
      currentCredits,
      creditsToWithdraw
    );
    const creditsToWithdrawFromOneTime =
      creditsToWithdraw - creditsToWithdrawFromCredits;

    // Update the credits
    const newCredits = currentCredits - creditsToWithdrawFromCredits;
    const newOneTimeCredits =
      currentOneTimeCredits - creditsToWithdrawFromOneTime;

    await updateUserCreditsByAdmin(userId, {
      credits: newCredits,
      oneTimeCredits: newOneTimeCredits
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeAllUserSubscriptionCreditsByAdmin = async (
  userId: string
) => {
  try {
    const { error } =
      await creditsRepository.removeAllUserSubscriptionCreditsByAdmin(userId);

    if (error) {
      throw new CustomError("Error removing user credits", 500, {
        cause: error.message || error.details,
        context: {
          userId
        }
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
