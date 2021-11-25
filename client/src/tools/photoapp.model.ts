import { FunctionTypeNode } from "typescript";

export interface TopLevel {
    photos: Photo[];
    selected: number;
}

// export interface Photos {
//     photos: string; 
// }
// model that was used to set variables that were passed around
export interface Photo {
    _id:       string;
    title:    string;
    caption:  string;
    source:   string;
    comments: Comment[];
}

export interface Comment {
    comment: string;
    author:  string;
}

export interface JumpProps {
    photos: Photo[];
    enabled: boolean;
    selected: number;
    setPhotoCount:Function;

}

export interface CommentProps {
    photos: Photo[];
    enabled: boolean;
    selected: number;
    setPhotos:Function;
    setLoading:Function;
    fetchData:Function;

}

export interface LoadingProps {
    spinnerColor:string;
    bgColor:string
    enabled:boolean; 
}