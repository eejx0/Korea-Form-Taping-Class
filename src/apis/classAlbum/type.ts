export type AlbumItem = {
    title: string;
    count: string;  // 앨범 게시물 고유 id
    thumbnail: string;
};

export type GetAlbumListResponse = {
    items: AlbumItem[];
    maxPage: number;
    total: number;
};

export type AlbumImage = {
    image: string;
};

export type GetAlbumDetailResponse = AlbumImage[];
