export default interface ICreateUserDTO {
  name: string;
  whatsapp: string;
  permission: 'Master' | 'Officer' | 'Player';
  cp: number;
  classe: string;
  sub_class: 'Awakening' | 'Ascension';
  active: boolean;
  password: string;
}
