"use server";

import { CustomError } from "@/errors/CustomError";
import { getAuthUser, getAuthUserOrNull } from "./auth.service";
import { PredictionDto } from "@/types/dtos";
import { createPredictionsRepository } from "@/data/repositories/predictions.repository";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/admin";

export const getCompletedPredictionsByUserId = async (userId: string) => {
  const supabase = createClient();
  const predictionsRepository = await createPredictionsRepository();
  try {
    const { data, error } =
      await predictionsRepository.getCompletedPredictionsByUserId(
        supabase,
        userId
      );

    if (error) {
      console.error(error);
      throw new CustomError("Failed to fetch completed predictions", 500, {
        cause: error.message || error.details,
        context: {
          userId
        }
      });
    }

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInProgressPredictionsByUserId = async (userId: string) => {
  const supabase = createClient();
  const predictionsRepository = await createPredictionsRepository();
  try {
    const { data, error } =
      await predictionsRepository.getInProgressPredictionsByUserId(
        supabase,
        userId
      );

    if (error) {
      console.error(error);
      throw new CustomError("Failed to fetch in-progress predictions", 500, {
        cause: error.message || error.details,
        context: {
          userId
        }
      });
    }

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPredictionsByUserId = async (userId: string) => {
  const supabase = createClient();
  const predictionsRepository = await createPredictionsRepository();
  try {
    const { data, error } =
      await predictionsRepository.getAllPredictionsByUserId(supabase, userId);

    if (error) {
      console.error(error);
      throw new CustomError("Failed to fetch all predictions", 500, {
        cause: error.message || error.details,
        context: {
          userId
        }
      });
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPrediction = async (prediction: PredictionDto) => {
  const supabase = createClient();
  const predictionsRepository = await createPredictionsRepository();
  try {
    const user = await getAuthUser();
    const { id, error } = await predictionsRepository.createPrediction(
      supabase,
      prediction
    );

    if (error) {
      console.error(error);
      throw new CustomError("Failed to create prediction", 500, {
        cause: error.message || error.details,
        context: {
          userId: user.id
        }
      });
    }

    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCompletedPredictions = async () => {
  try {
    const user = await getAuthUserOrNull();
    if (!user) return [];
    const predictions = await getCompletedPredictionsByUserId(user.id);
    return predictions as PredictionDto[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInProgressPredictions = async () => {
  const user = await getAuthUserOrNull();
  if (!user) return [];
  const predictions = await getInProgressPredictionsByUserId(user.id);
  return predictions as PredictionDto[];
};

export const getAllPredictions = async () => {
  const supabase = createClient();
  const predictionsRepository = await createPredictionsRepository();

  try {
    const user = await getAuthUserOrNull();
    if (!user) return [];

    const { data, error } =
      await predictionsRepository.getAllPredictionsByUserId(supabase, user.id);

    if (error) {
      console.error(error);
      throw new CustomError("Failed to fetch all predictions", 500, {
        cause: error.message || error.details,
        context: {
          userId: user.id
        }
      });
    }

    return data as PredictionDto[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPredictionById = async (predictionId: string) => {
  const supabase = createClient();
  const predictionsRepository = await createPredictionsRepository();
  try {
    const { data, error } = await predictionsRepository.getPredictionById(
      supabase,
      predictionId
    );
    if (error) {
      console.error(error);
      throw new CustomError("Failed to fetch prediction", 500, {
        cause: error.message || error.details,
        context: {
          predictionId
        }
      });
    }

    if (!data)
      throw new CustomError("Prediction not found", 404, {
        context: {
          predictionId
        }
      });

    return data as PredictionDto;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePredictionByAdmin = async (
  prediction: Partial<PredictionDto>,
  userId: string
) => {
  const supabaseAdmin = createServiceRoleClient();
  const predictionsRepository = await createPredictionsRepository();
  try {
    if (!prediction.id) {
      throw new CustomError("Prediction ID is required for update", 400);
    }
    const { data, error } = await predictionsRepository.updatePrediction(
      supabaseAdmin,
      prediction,
      userId
    );
    if (error) {
      console.error(error);
      throw new CustomError("Failed to update prediction", 500, {
        cause: error.message || error.details
      });
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePrediction = async (
  predictionId: string
) => {
  const supabase = createClient();
  const predictionsRepository = await createPredictionsRepository();
  try {
    const user = await getAuthUser();
    const { error } = await predictionsRepository.deletePrediction(
      supabase,
      predictionId,
      user.id
    );
    if (error) {
      console.error(error);
      throw new CustomError("Failed to delete prediction", 500, {
        cause: error.message || error.details
      });
    }
    console.log("prediction deleted successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
