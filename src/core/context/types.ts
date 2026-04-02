interface BaseRequest {
  headers: Record<string, string | string[] | undefined>;
}

interface BaseResponse {
  setHeader: (key: string, value: string) => void;
}

type NextFunction = () => void;

type Middleware<
  Req extends BaseRequest = BaseRequest,
  Res extends BaseResponse = BaseResponse,
> = (req: Req, res: Res, next: NextFunction) => void;

export type { BaseRequest, BaseResponse, Middleware };
