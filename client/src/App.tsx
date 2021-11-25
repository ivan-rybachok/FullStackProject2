import React from 'react';
import { getJSONData} from "./tools/Toolkit";
import './App.scss';
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import Content from "./Content/Content";
import Jump from "./Jump/Jump";
import Comments from "./Comments/Comments";

import { TopLevel, Photo} from "./tools/photoapp.model";

const RETRIEVE_SCRIPT = "http://localhost:8080/get";

const App = () => {

  const onResponse = (result:TopLevel) => {
    //console.table(result);
    //update reference variable to recevied JSON data
    setPhotos(result.photos);
    // stopping loading overlay
    setLoading(false);
    // console.log(result);
    console.log("Inside the onResponse")
  
  }
  // on click method that uses boolean to show and hide photos from the jump button
  const showJump = () => {
    setShowPictures(!showPictures);

  }
  // on click method that uses boolean to show and hide comments from the comments button
  const showCommentButton = () => {
    setShowComments(!showComments);

  }

  const nextPage = () => {
    // when next button is clicked it goes inside the if statement, if the condition is true and adds index + 1 each time when the next page is clicked
    // if it reaches the end the condition is false and it doesnt go inside of it only allows to go back since the button is disabled down low on the nextpage button 
    console.log(photos.length)
    if (photoCount + 1 > 0 && photoCount + 1 < photos.length) {
      setPhotoCount(photoCount + 1);
    }
    // console.log(photoCount);

  }
    // when previous button is clicked it goes inside the if statement, if the condition is true and adds index - 1 each time when the previous page is clicked
    // if it is at the begging the codition is false so it doesnt go inside of it, it only allows to go next since the button is disabled down low on the previous page button 
  const previousPage = () => {
    if (photoCount > 0 && photoCount + 1 <= photos.length) {
      setPhotoCount(photoCount - 1);
    }
    // console.log(photoCount);
  }

//  goes inside the error if the error occured and shows what the error is
const onError = (message:string) => {
  console.log("*** Error has occured with request " + message);
}

// setup state variables
// boolean for loadingoverlay
const [loading, setLoading] = React.useState<boolean>(true);
// boolean for showing pictures in jump
const [showPictures, setShowPictures] = React.useState<boolean>(false);
// boolean for showing comments in comment
const [showComments, setShowComments] = React.useState<boolean>(false);

const [photos, setPhotos] = React.useState<Photo[]>([]);
// index for the page so it knows what page to display
const [photoCount, setPhotoCount] = React.useState<number>(0);

React.useEffect(() => {
  // component mounted - loading JSON data when root component mounts
  fetchData();
}, []);

// React.useEffect(() => {
//   setPhotoCount(photoCount);

// }, [photos]);

// getJSON funtion that im passing in comments so I can use it there as well when the comments are submitted
const fetchData = () => {
  getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
}


    return (
      <div>
        
      <LoadingOverlay bgColor="#035074" spinnerColor="#FFFFFF" enabled={loading} />
      <div className="my-header">
        <h1>_Photo.Album</h1> 
        <span> v5.0 Full Stack Programming Project I</span>
      </div>
      {/* if statement to hide and show if the is nothing when the count is changed to 0 above */}
      {(photos.length > 0) ? 
        <div className="buttons__control">
            {/* those disabled methods that i was talking about above and on click functions to go to them, could've made it on one line, but wanted to have it showing clear for myself */}
            <button className="previous__button" type="button" disabled={photoCount == 0 ? true : false} onClick={previousPage}>Previous</button>
            <button className="next__button" type="button" disabled={photoCount == photos.length - 1 ? true : false} onClick={nextPage}>Next</button>
            <button className="jump__button" type="button" onClick={showJump}>Jump</button>
            <button className="comment__button" type="button" onClick={showCommentButton}>Comment</button>
            <div className="lbl">
              {/* changing the number count with the index and showing the photos.length since the number will be changed for test cases */}
              <div className="lbl__counter">Photo {photoCount + 1} of {photos.length}</div>
            </div>
            {/* moves over all of the commponents data over and pases them around */}
            <Jump photos={photos} enabled={showPictures} selected={photoCount} setPhotoCount={setPhotoCount} />
            <Comments photos={photos}  enabled={showComments} selected={photoCount} setLoading={setLoading} setPhotos={setPhotos} fetchData={fetchData}/>
            <Content photos={photos} selected={photoCount} />
        </div>
        :<div>No photos were found :(</div>
      }
      {/* {
        another if statement that shows the coponents that
        (photos.length > 0) ? <div>

        <Jump photos={photos} enabled={showPictures} selected={photoCount} setPhotoCount={setPhotoCount} />
        <Comments enabled={showComments} photos={photos} selected={photoCount} setLoading={setLoading} setPhotos={setPhotos} fatchData={fatchData}/>
        <Content photos={photos} selected={photoCount} />
      </div>
      :
      <div></div>
      } */}
      </div>
    );
    

    
}

export default App;
