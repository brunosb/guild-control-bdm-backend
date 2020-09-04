export default interface ICreateUserDTO {
  name: string;
  whatsapp: string;
  permission: 'Leader' | 'Player';
  class_id: string;
  sub_class: 'Awakening' | 'Ascension';
  active: boolean;
  password: string;
}
