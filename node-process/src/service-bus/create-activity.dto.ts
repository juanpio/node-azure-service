import {
  IsString,
  IsOptional,
  ValidateIf,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateActivityDto {
  @Expose()
  @IsString()
  memberId: string;

  @Expose()
  @IsString()
  partnerId: string;

  @Expose()
  @IsString()
  activityType: string;

  @Expose()
  @IsString()
  activityDescription: string;

  @Expose()
  @IsString()
  activityCode: string;

  @Expose()
  @ValidateIf((obj) => typeof obj.property === 'string')
  @IsString({ message: 'Property must be a string if provided as string' })
  @ValidateIf((obj) => typeof obj.property === 'number')
  @IsNumber({}, { message: 'Property must be a number if provided as number' })
  memberActivity: string | number;

  @Expose()
  @IsDateString()
  activityDate: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  receivedDate?: string;

  @Expose()
  @IsOptional()
  @IsString()
  refClaimId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  attestKind: string;

  @Expose()
  @IsString()
  signature: string;
}
