import { UserRole } from "@prisma/client";
 
export const permissions
: Record<
  string,
  Record<string, UserRole[]>
> =
 {
  lesson: {
    create: [UserRole.ADMIN],
    update: [UserRole.ADMIN, UserRole.TEACHER],
    delete: [UserRole.ADMIN],
    view: [
      UserRole.ADMIN,
      UserRole.TEACHER,
    ],
  },
 
  subject: {
    create: [UserRole.ADMIN],
    update: [UserRole.ADMIN],
    delete: [UserRole.ADMIN],
    view: [
      UserRole.ADMIN,
      UserRole.TEACHER,
    ],
  },
 
  unit: {
    create: [
      UserRole.ADMIN,
      UserRole.TEACHER,
    ],
 
    update: [
      UserRole.ADMIN,
      UserRole.TEACHER,
    ],
 
    delete: [UserRole.ADMIN],
 
    view: [
      UserRole.ADMIN,
      UserRole.TEACHER,
    ],
  },
};
 
export function hasPermission(
  role: UserRole,
  resource: keyof typeof permissions,
  action: keyof (typeof permissions)[typeof resource]
) {
  return permissions[resource][action]?.includes(
    role
  );
}
 