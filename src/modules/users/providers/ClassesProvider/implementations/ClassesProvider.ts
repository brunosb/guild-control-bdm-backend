import IClassesProvider from '../models/IClassesProvider';

class ClassesProvider implements IClassesProvider {
  public async getAllClasses(): Promise<string[]> {
    return [
      'Archer',
      'Berserker',
      'Dark Knight',
      'Guardian',
      'Hashashin',
      'Kunoichi',
      'Lahn',
      'Maewha',
      'Musa',
      'Mystic',
      'Ninja',
      'Ranger',
      'Shai',
      'Sorceress',
      'Striker',
      'Tamer',
      'Valkyrie',
      'Warrior',
      'Witch',
      'Wizard',
    ];
  }

  public async existClass(classe: string): Promise<boolean> {
    const exist = (await this.getAllClasses()).find(
      classInAllClasses => classInAllClasses === classe,
    );
    return !!exist;
  }
}

export default ClassesProvider;
