import { User } from './user';
import { Song } from './songs';

export class Playlist {
    id: number;
    PlaylistName: string;
    createdBy: User;
    songs: Song[];
}
