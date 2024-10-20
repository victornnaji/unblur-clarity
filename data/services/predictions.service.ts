"use server";

import { CustomError } from "@/errors/CustomError";
import { getAuthUser, getAuthUserOrNull } from "./auth.service";
import { PredictionDto } from "@/types/dtos";
import {
  createPredictionRepository,
  getAllPredictionsByUserIdRepository,
  getCompletedPredictionsByUserIdRepository,
  getInProgressPredictionsByUserIdRepository,
  getPredictionByIdRepository,
  updatePredictionByAdminRepository
} from "@/data/repositories/predictions.repository";

export const getCompletedPredictionsByUserId = async (userId: string) => {
  try {
    const { data, error } = await getCompletedPredictionsByUserIdRepository(
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
  try {
    const { data, error } = await getInProgressPredictionsByUserIdRepository(
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
  try {
    const { data, error } = await getAllPredictionsByUserIdRepository(userId);

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
  try {
    const user = await getAuthUser();
    const { id, error } = await createPredictionRepository(prediction);

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
  const user = await getAuthUserOrNull();
  if (!user) return [];
  const predictions = await getAllPredictionsByUserId(user.id);
  return predictions as PredictionDto[];
};

export const getPredictionById = async (predictionId: string) => {
  try {
    const { data, error } = await getPredictionByIdRepository(predictionId);
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
  prediction: Partial<PredictionDto>
) => {
  try {
    if (!prediction.id) {
      throw new CustomError("Prediction ID is required for update", 400);
    }
    const { data, error } = await updatePredictionByAdminRepository(prediction);
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
