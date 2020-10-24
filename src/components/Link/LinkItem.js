import React from "react";
import {Link,withRouter} from 'react-router-dom'
import {getDomain} from '../../utils'
import firebaseContext from '../../firebase/context'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
function LinkItem({link,index,showCount,history}) {
  const {firebase,user} = React.useContext(firebaseContext)
  function handleVote(){
    if(!user){
      history.push('/login')
    }else{
      const voteRef = firebase.db.collection("links").doc(link.id)
      voteRef.get().then(doc => {
        if(doc.exists){
            const previousVotes = doc.data().votes
          const vote = {votedBy: {id:user.uid , name:user.displayName}}
          const updatedVotes =  [...previousVotes,vote]
          const voteCount = updatedVotes.length
          voteRef.update({votes: updatedVotes,voteCount})
        }
      })
    }
  }
  
  function handleDeleteLink(){
    
      const linkRef = firebase.db.collection("links").doc(link.id)
    linkRef.delete().then(()=>{
      console.log(`el link ${link.id} ha sido borrado`)

    }).catch(err=>{
      console.log('error al borrar el documento',err)
    })
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id



  return(
    <div className="flex items-start mt2">
        <div className="flex items-center ">
            
          {showCount && <span className="gray">{index}.</span>}
          <div className="delete-button" onClick={handleVote}>votar</div>
        </div>
      <div className="ml1">

          <div>
              
            <a href={link.url} className="black no-underline">{link.description}</a> <span className="link">({getDomain(link.url)})</span>

            
          
          </div>
        <div className="f6 1h-copy gray">
            {link.voteCount} votos de {link.postedBy.name} {distanceInWordsToNow(link.created)}
            {" | "}
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0 ? `${link.comments.length} comentarios` : 
              "comentar"}
            </Link>
          {postedByAuthUser && (
            <>

              {" | "}

              <span className="delete-button"
              onClick={handleDeleteLink}
              >
                delete
              </span>

            </>
          )}
        </div>
      
      </div>
    </div>
  )
}

export default withRouter(LinkItem);
