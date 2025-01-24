import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";

export class StringValidator
  implements PipeTransform<string | undefined, string>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public transform(value: any, metadata: ArgumentMetadata): string {
    if (
      typeof value !== "string" ||
      (typeof value === "string" && value.length === 0)
    ) {
      throw new BadRequestException("Input string must not be empty");
    }

    return value;
  }
}
