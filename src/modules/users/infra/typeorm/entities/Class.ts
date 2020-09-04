import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  name_ascension: string;

  @Column()
  name_awakening: string;

  @Column()
  avatar_ascension: string;

  @Column()
  avatar_awakening: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_ascension_url' })
  getAvatarAscensionUrl(): string | null {
    if (!this.avatar_ascension) {
      return null;
    }

    return this.getUrl(this.avatar_ascension);
  }

  @Expose({ name: 'avatar_awakening_url' })
  getAvatarAwakeningUrl(): string | null {
    if (!this.avatar_awakening) {
      return null;
    }

    return this.getUrl(this.avatar_awakening);
  }

  getUrl(avatar: string): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${avatar}`;
      default:
        return null;
    }
  }
}

export default Class;
