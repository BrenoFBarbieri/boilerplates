type UserRole = 'admin' | 'user' | 'guest';

export interface RequestContextSchema {
  readonly traceId: string;
  readonly userId: string;
  readonly tenantId: string;
  readonly userRole: UserRole;
}
