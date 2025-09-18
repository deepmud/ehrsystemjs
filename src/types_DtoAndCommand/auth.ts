import { UserDto } from "./user";

// Mirrors LoginDTO from backend
export interface LoginDto {
    token: string;
    expiresAt: string;
    //user: UserDto;
  }
  
  // Frontend command to send login request
  export interface LoginCommand {
    email: string;
    password: string;
  }
  