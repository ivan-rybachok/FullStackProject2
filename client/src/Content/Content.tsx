import React from 'react';
import { TopLevel, Photo, Comment} from "../tools/photoapp.model";
import "./Content.scss";
// contente compoent that is used to get got out data.
const Content = ({photos, selected}: TopLevel) => {
    // variable that is being used to take out individual data based on the index that is being passed through selected
    const selectedphoto:Photo = photos[selected];
    // console.log(selectedphoto);
    return (
        <div>
            <div>
                <div className="selected">
                    {/* takes out an image source based on the index the page is currently on from the script */}
                    <img src={"/images/photos/" + selectedphoto.source} className="selected__photo"/>
                </div>
                <div className="photos">
                    {/* same with title of the page */}
                    <div className="photo__title">{selectedphoto.title}</div>
                    {/* same with the caption for each page */}
                    <div className="photo__caption">{selectedphoto.caption}</div>
                </div>
                {/* same with comments, had to use a map since comments was an array and had author and comment inside of it */}
                <div className="photo__comment">{selectedphoto.comments.map((comments:Comment, n:number) => {
                    return <div className="photo__comment__style" key={n}>Submitted by: {comments.author}<br/>Comment: {comments.comment}</div>
                })}</div>
            </div>
        </div>
    );
}

export default Content;