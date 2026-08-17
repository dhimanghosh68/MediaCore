import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  get: (id: string) => userRepository.findById(id),

  list: () => userRepository.list(),

  update: (id: string, data: any) =>
    userRepository.update(id, data),
};
