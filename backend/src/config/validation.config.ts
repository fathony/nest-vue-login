import { HttpException, HttpStatus, ValidationPipeOptions } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { BaseResponse } from "@src/common/api/base-response";

function mapChildren(errors: ValidationError[]) {
  let res: any = {};

  errors.forEach((e, index) => {
    if (e.children && e.children.length > 0) {
      res[e.property] = mapChildren(e.children);
    } else {
      res[e.property] = Object.values(e.constraints)[0];
    }
  });

  return res;

}

const validationConfig: ValidationPipeOptions = {
  transform          : true,
  whitelist          : true,
  stopAtFirstError   : true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory   : (errors: ValidationError[]) => {
    let res: any = {};

    errors.forEach((e, index) => {
      if (e.children && e.children.length > 0) {
        res[e.property] = {
          ...mapChildren(e.children)
        };
      } else {
        res[e.property] = Object.values(e.constraints)[0];
      }
    });

    return new HttpException(
      new BaseResponse({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        name      : "Validation",
        message   : "Validation Failed",
        data      : res
      }),
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
};

export default validationConfig;
