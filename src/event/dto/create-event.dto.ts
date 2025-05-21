export class CreateEventDto {
  name: string;
  photo: string;
  start_date: Date;
  start_time: Date;
  finish_date: Date;
  finish_time: Date;
  info: string;
  event_type_id: number;
  human_category_id: number;
  venue_id: number;
  lang_id: number;
  release_date: Date;
}
