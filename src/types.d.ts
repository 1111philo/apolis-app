/** App-wide types */

// AUTH

type UserRole = "admin" | "manager";

interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  sub: string; // Amplify auth ID, not used
}

// END AUTH

// DB -- Keep updated
// TODO: where is the source of truth?

interface User extends AuthUser {
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface Guest {
  guest_id: number;
  first_name: string | null;
  last_name: string | null;
  dob: string | null;
  case_manager: string | null;
  guest_notifications: GuestNotification[];
  guest_services: GuestService[];
}

type GuestNotificationStatus = "Archived" | "Active";

interface GuestNotification {
  notification_id: number;
  guest_id: number;
  message: string;
  status: GuestNotificationStatus;
  created_at: string;
  updated_at: string;
}

type GuestServiceStatus = "Queued" | "Slotted" | "Completed";

interface GuestService {
  guest_service_id: number;
  service_id: number;
  service_name?: string;
  status: GuestServiceStatus;
  slot_occupied: number;
  queued_at: string;
  slotted_at: string;
  completed_at: string;
}

interface Visit {
  visit_id: number;
  guest_id: number;
  service_ids: number[];
  created_at: string;
  updated_at: string;
}

interface ServiceType {
  service_id: number;
  name: string;
  quota: number | null;
  queueable: boolean;
  created_at: string;
  updated_at: string;
}

// END DB

// RESPONSE

interface SuccessResponse {
  success: boolean;
}

interface PaginationInfo {
  total: number;
  offset: number;
  limit: number;
}

interface GuestDataAPIResponse extends Guest {
  total: number;
}

interface GuestNotificationsAPIResponse extends PaginationInfo {
  rows: GuestNotification[];
}

interface GuestsAPIResponse extends PaginationInfo {
  rows: Guest[];
}

interface AddGuestAPIResponse {
  guest_id: number;
}

interface AddUserAPIResponse {
  user_id: number;
}

interface GetUserAPIResponse extends User {
  error?: string;
}

interface GetUsersAPIResponse {
  total: number;
  offset: number;
  limit: number;
  rows: User[];
}

interface GetVisitsAPIResponse extends PaginationInfo {
  rows: Visit[];
}

interface AddGuestNotificationAPIResponse {
  notification_id: number;
  notification: GuestNotification;
}

interface GuestResponse {
  queued_at: string;
  created_at: string;
  last_name: string;
  case_manager: string;
  guest_service_id: number;
  completed_at: string;
  guest_id: number;
  updated_at: string;
  dob: string;
  slot_id: number;
  service_id: number;
  first_name: string;
  status: string;
  slotted_at: string;
  has_notification?: boolean;
}

// END RESPONSE

// MISC

interface AppContext {
  serviceTypes: ServiceType[];
  authUser: AuthUser | null;
  authUserIsAdmin: boolean;
  refreshServices: () => Promise<void>;
}

interface ReactSelectOption {
  value: string;
  label: string;
}

interface GuestSelectOption extends ReactSelectOption {
  guest: Partial<Guest>;
}

/** Feedback shown to the user on submit event or similar. */
interface UserMessage {
  text: string;
  isError: boolean;
}

// END MISC
