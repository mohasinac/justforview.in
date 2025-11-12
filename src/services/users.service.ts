import { apiService } from "./api.service";
import type { PaginatedResponse } from "@/types";
import type { UserUI } from "@/schemas/ui/user.ui";
import {
  USER_ENDPOINTS,
  ADMIN_USER_ENDPOINTS,
} from "@/constants/endpoints/user.endpoints";
import type { UserRole } from "@/schemas/resources/user.schema";

interface UserFilters {
  role?: UserRole;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface UpdateUserData {
  name?: string;
  phone?: string;
  avatar?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface VerifyEmailData {
  otp: string;
}

interface VerifyMobileData {
  otp: string;
}

interface BanUserData {
  isBanned: boolean;
  banReason?: string;
}

interface ChangeRoleData {
  role: UserRole;
  notes?: string;
}

class UsersService {
  // List users (admin only)
  async list(filters?: UserFilters): Promise<PaginatedResponse<UserUI>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${ADMIN_USER_ENDPOINTS.list}?${queryString}`
      : ADMIN_USER_ENDPOINTS.list;

    return apiService.get<PaginatedResponse<UserUI>>(endpoint);
  }

  // Get user by ID (public profile)
  async getById(id: string): Promise<UserUI> {
    return apiService.get<UserUI>(USER_ENDPOINTS.profile(id));
  }

  // Get current user profile
  async getMe(): Promise<UserUI> {
    return apiService.get<UserUI>(USER_ENDPOINTS.me);
  }

  // Update current user profile
  async updateMe(data: UpdateUserData): Promise<UserUI> {
    return apiService.patch<UserUI>(USER_ENDPOINTS.updateProfile, data);
  }

  // Update preferences
  async updatePreferences(data: any): Promise<UserUI> {
    return apiService.patch<UserUI>(USER_ENDPOINTS.updatePreferences, data);
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      USER_ENDPOINTS.changePassword,
      data
    );
  }

  // Upload avatar
  async uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(USER_ENDPOINTS.updateAvatar, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to upload avatar");
    }

    return response.json();
  }

  // Admin: Update user
  async adminUpdate(id: string, data: UpdateUserData): Promise<UserUI> {
    return apiService.patch<UserUI>(ADMIN_USER_ENDPOINTS.update(id), data);
  }

  // Admin: Ban user
  async ban(id: string, data: BanUserData): Promise<UserUI> {
    return apiService.post<UserUI>(ADMIN_USER_ENDPOINTS.ban(id), data);
  }

  // Admin: Unban user
  async unban(id: string): Promise<UserUI> {
    return apiService.post<UserUI>(ADMIN_USER_ENDPOINTS.unban(id), {});
  }

  // Admin: Change user role
  async changeRole(id: string, data: ChangeRoleData): Promise<UserUI> {
    return apiService.patch<UserUI>(ADMIN_USER_ENDPOINTS.updateRole(id), data);
  }

  // Admin: Get user statistics
  async getStats(): Promise<any> {
    return apiService.get<any>(ADMIN_USER_ENDPOINTS.stats);
  }

  // Admin: Bulk operations
  async bulkBan(userIds: string[]): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(ADMIN_USER_ENDPOINTS.bulkBan, {
      userIds,
    });
  }

  async bulkActivate(userIds: string[]): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      ADMIN_USER_ENDPOINTS.bulkActivate,
      { userIds }
    );
  }

  async bulkDelete(userIds: string[]): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      ADMIN_USER_ENDPOINTS.bulkDelete,
      { userIds }
    );
  }
}

export const usersService = new UsersService();
export type {
  UserFilters,
  UpdateUserData,
  ChangePasswordData,
  VerifyEmailData,
  VerifyMobileData,
  BanUserData,
  ChangeRoleData,
};
