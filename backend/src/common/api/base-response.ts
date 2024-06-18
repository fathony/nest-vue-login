import { HttpStatus } from "@nestjs/common";

export class BaseResponse<T> {
  statusCode: HttpStatus;
  name: string;
  message: string;
  data?: T;

  constructor(props: { statusCode: HttpStatus, name: string, message: string, data?: T }) {
    this.statusCode = props.statusCode;
    this.name = props.name;
    this.message = props.message;
    this.data = props.data;

    return this;
  }
}