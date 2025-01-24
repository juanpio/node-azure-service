import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class DateStringToDatePipe implements PipeTransform {
  transform(dateString: string): Date {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new BadRequestException(`Invalid date format: ${dateString}`);
    }

    return date;
  }
}
