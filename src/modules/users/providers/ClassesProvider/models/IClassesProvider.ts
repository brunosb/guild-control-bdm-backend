export default interface IClassesProvider {
  getAllClasses(): Promise<string[]>;
  existClass(classe: string): Promise<boolean>;
}
