
function confirmDelete(event_name, event_id, redirect_to){
    if(confirm(`Are you sure you want to delete the event ${event_name} (id ${event_id})? This is PERMANENT and cannot be undone.`)) {
        //make delete request
        fetch(`/events/${event_id}`,{
            method: 'DELETE'
        })
        .then(response => {
            //Check for 204 (Success No Content)
            if (response.ok) {
                alert(`Successfully deleted the event ${event_name} (id ${event_id}).`);
                //What to do next is not widely agreed upon: Return to events page?
                window.location.href = redirect_to || window.location.href;
            }
            else {
                alert(`Failed to delete the event ${event_name} (id ${event_id}) - could not find?.`);
            }
        })
        .catch(error => {
            //(404 possible... handle?)
            alert(`ERROR: Failed to delete the event ${event_name} (id ${event_id}).`)
        })
        

    }
}

function toggleInterest(interestButton, event_id){
    let interestButtonIcon = interestButton.children[0];
    switch(interestButtonIcon.textContent) {
    case "star_border": //currently off, toggle on.
        console.log("Toggle On!")
        interestButton.classList.replace("scale-in", "scale-out");
        
        //Send update to server, wait for confirmation before showing on button
        //Simulate waiting with timeout for now...
        setTimeout(function(){
            interestButtonIcon.textContent = "star";
            interestButton.classList.replace("blue", "yellow");
            interestButton.classList.replace("scale-out", "scale-in");
        }, 500);
        
    break;
    case "star": //currently on, toggle off
        console.log("Toggle Off!")
        interestButton.classList.replace("scale-in", "scale-out");

        //Send update to server, wait for confirmation before showing on button
        //Simulate waiting with timeout for now...
        setTimeout(function(){
            interestButtonIcon.textContent = "star_border";
            interestButton.classList.replace("yellow", "blue");
            interestButton.classList.replace("scale-out", "scale-in");
        }, 500);
    break;
    default: //currently in star_half, processing... don't do anything yet.
    }
    //Until server response comes, show a "processing" symbol - which means clicking does nothing until response comes.
    interestButtonIcon.textContent = "star_half";
}

