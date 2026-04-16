export const usePermission = (user: any) => {
  const hasPermission = (permission: string) => {
    return user?.roles?.some((r: any) =>
      r.role?.privileges?.some(
        (p: any) => p.permission.key === permission
      )
    );
  };

  return { hasPermission };
};