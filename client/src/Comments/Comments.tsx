import React from 'react';
import {sendJSONData} from "../tools/Toolkit";
import {CommentProps, Photo} from "../tools/photoapp.model";
import "./Comments.scss";
// scirpt that is being used to where the data is being send
const SUBMIT_SCRIPT = "http://localhost:8080/put";

const Comments = ({enabled,selected,photos, setLoading, fetchData}: CommentProps) => {
    
    // state variables to pass data around between comments and author
    const [comment, setComments] = React.useState<string>("");
    const [author, setAuthor] = React.useState<string>("");

    const selectedphoto:Photo = photos[selected];

    const getComment = (e:any) => {
        setComments(e.target.value);
    }
    
    const getAuthor = (e:any) => {
        setAuthor(e.target.value);
        // console.log(author.toString());
    }
    const OkButton = () => {
      
        setLoading(true);
        let sendJSON = {
            // needed to bring selected variable over in order to target the id of the photos so the user could  send the response back to the right image that he commented under
            // "photoId": selectedphoto._id,
            // // gets the author name
            // "author": author,
            // // gets the comments
            // "comment": comment
            "_id": selectedphoto._id,
            "comments": [
                {
                    "comment": comment,
                    "author": author
                }
            ]
              
        };
        // variable that takes in the data
        let sendString = JSON.stringify(sendJSON);
        // sends the data gotes to all of the component depending is something wrong or if everything was successful, if the succes goes inside of the function and and reloads the page with the submitted data to be used again
        sendJSONData(SUBMIT_SCRIPT, sendString, onSuccess, onErrorSending);
    }
    
    const onErrorSending = () => {
        console.log("Sorry error happend here!");
        setLoading(false);
    }

    const onSuccess = () => {
        console.log("Yay, this works:)");
        // window.location.reload();
        // clears the author and comments field when the data is send
        setAuthor("");
        setComments("");
        // runs the fatchdata to start the app again
        fetchData();
    }

    return (
        <div>
            {
            // same boolean that was used to hide jumps photos
            (enabled)
            ?
                <div className="comments__">
                    <div className="comments">
                        <div>Author:</div>
                        {/* on change takes author value and passes it to the function  above  */}
                        <input className="comment__textname" id="author" type="text" maxLength={30} value={author} onChange={getAuthor}></input>
                        {/* on change takes commet value and passes it to the function  above */}
                        <div>Comment(200 Characters):</div>
                        <textarea className="comment__textarea" id="comment"  maxLength={200} cols={25} rows={10} value={comment} onChange={getComment}></textarea>
                    </div>
                        {/* found the trim() method that removes whitespace from both ends of a string so the user wont be able to submit an empty space, mostly for error checking*/}
                        {/* goes indside the OkButton function if the if everything was right, disables if one of the either comment or author isn't filled in as well as being disabled in the first place without having any input */}
                        <button className="ok__button" id="btnOk" disabled={author.trim() == "" || comment.trim() == "" ? true : false} onClick={OkButton}>Ok</button>
                    </div>
            : <div></div>
            }
        </div>
    );
}

export default Comments;