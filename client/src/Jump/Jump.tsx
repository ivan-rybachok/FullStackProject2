import React from 'react';
import {Photo, JumpProps} from "../tools/photoapp.model";
import "./Jump.scss";


const Jump = ({photos,enabled,setPhotoCount}: JumpProps) => {

    // goes inside the changeContent when the image is clicked and changes it buy passing the index of the image that was clicked to the setPhotoCount in the App where it changes the index and displays the right info
    const changeContent = (e:any) => {

    // console.log(e.target.className);
    // setSelectedPhoto(photos[e.target.className]);
    // used className because it wont allow you to have a value inside the img tag
    setPhotoCount(Number(e.target.className));
    }

    return (
        <div>
            {/* enabled boolean that is being changed base on the click from the app */}
            {
            (enabled)
            ?
                <div className="images">
                    <div className="thumbnails__">
                {/* maps throught the image tag to dispaly images in jump component and adds value to the className so it can be used when the image is clicked*/}
                {photos.map((data:Photo,n:number) => {
                return(
                    <img className={n.toString()} key={n} src={"/images/photos/" + data.source} onClick={changeContent}/>     
                    );
                })}
                    </div>
                </div>
                // if the boolean is false it shows nothing
            : <div></div>
            }
        </div>
    );
}

export default Jump;