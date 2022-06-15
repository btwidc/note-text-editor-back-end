class ApiError extends Error {
  public static NotFound(message: string, errors: any = []) {
    return new ApiError(404, message, errors);
  }

  public status: number;
  public errors;

  public constructor(status: number, message: string, errors: any = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export default ApiError;
