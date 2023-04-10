import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  // IsNotEmpty,
  IsOptional,
  IsString,
  // ValidateIf,
} from 'class-validator';
import { TaskStatus } from '../task-status.enum';

function dtoHasProperty(property: string): <T>(dto: T) => boolean {
  return (dto) => Object.keys(dto).includes(property);
}

// export class GetTasksFilterDto {
//   @ValidateIf(dtoHasProperty('status'))
//   @IsEnum(TaskStatus)
//   status?: TaskStatus;

//   @ValidateIf(dtoHasProperty('search'))
//   @IsNotEmpty()
//   search?: string;
// }

export class GetTasksFilterDto {
  @ApiProperty({ enum: ['OPEN', 'IN_PROGRESS', 'DONE'] })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
